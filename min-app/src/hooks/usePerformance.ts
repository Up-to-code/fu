// File: src/hooks/usePerformance.ts
// Purpose: React hook for performance monitoring

import { useEffect, useRef, useState } from 'react';
import { performanceMonitor, PerformanceMetrics } from '../utils/performance';

export interface UsePerformanceOptions {
    componentName?: string;
    trackRenders?: boolean;
    trackMemory?: boolean;
    trackFPS?: boolean;
    logMetrics?: boolean;
}

export interface UsePerformanceReturn {
    metrics: PerformanceMetrics | null;
    renderCount: number;
    averageRenderTime: number;
    fps: number;
    memoryUsage: number | undefined;
}

/**
 * Hook to monitor component performance
 */
export function usePerformance(options: UsePerformanceOptions = {}): UsePerformanceReturn {
    const {
        componentName = 'Unknown',
        trackRenders = true,
        trackMemory = false,
        trackFPS = false,
        logMetrics = __DEV__,
    } = options;

    const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
    const [fps, setFPS] = useState(60);
    const [memoryUsage, setMemoryUsage] = useState<number | undefined>(undefined);
    const renderStartTime = useRef<number>(0);
    const mountTime = useRef<number>(Date.now());

    // Track mount time
    useEffect(() => {
        performanceMonitor.trackMount(componentName, mountTime.current);
    }, [componentName]);

    // Track render time
    useEffect(() => {
        if (trackRenders) {
            renderStartTime.current = performance.now();
            
            return () => {
                const renderTime = performance.now() - renderStartTime.current;
                performanceMonitor.trackRender(componentName, renderTime);
                
                const componentMetrics = performanceMonitor.getMetrics(componentName);
                if (componentMetrics) {
                    setMetrics({
                        renderTime: componentMetrics.averageRenderTime,
                        timestamp: Date.now(),
                    });
                }
            };
        }
    }, [componentName, trackRenders]);

    // Track FPS
    useEffect(() => {
        if (trackFPS) {
            performanceMonitor.startFPSMonitoring();
            const interval = setInterval(() => {
                setFPS(performanceMonitor.getFPS());
            }, 1000);

            return () => {
                clearInterval(interval);
                performanceMonitor.stopFPSMonitoring();
            };
        }
    }, [trackFPS]);

    // Track memory usage
    useEffect(() => {
        if (trackMemory) {
            const updateMemory = async () => {
                const memory = await performanceMonitor.getMemoryUsage();
                setMemoryUsage(memory);
            };

            updateMemory();
            const interval = setInterval(updateMemory, 5000); // Update every 5 seconds

            return () => clearInterval(interval);
        }
    }, [trackMemory]);

    // Log metrics in development
    useEffect(() => {
        if (logMetrics && metrics) {
            const componentMetrics = performanceMonitor.getMetrics(componentName);
            if (componentMetrics) {
                console.log(`[Performance] ${componentName}:`, {
                    renderCount: componentMetrics.renderCount,
                    averageRenderTime: componentMetrics.averageRenderTime.toFixed(2) + 'ms',
                    fps: trackFPS ? fps : 'N/A',
                    memory: trackMemory && memoryUsage ? memoryUsage.toFixed(2) + 'MB' : 'N/A',
                });
            }
        }
    }, [componentName, metrics, fps, memoryUsage, logMetrics, trackFPS, trackMemory]);

    const componentMetrics = performanceMonitor.getMetrics(componentName);

    return {
        metrics,
        renderCount: componentMetrics?.renderCount || 0,
        averageRenderTime: componentMetrics?.averageRenderTime || 0,
        fps,
        memoryUsage,
    };
}

/**
 * Hook to measure a specific operation
 */
export function useMeasureOperation(operationName: string) {
    const startTime = useRef<number>(0);

    const start = () => {
        startTime.current = performance.now();
    };

    const end = () => {
        const duration = performance.now() - startTime.current;
        if (__DEV__) {
            console.log(`[Performance] ${operationName} took ${duration.toFixed(2)}ms`);
        }
        return duration;
    };

    return { start, end };
}
