// File: src/utils/performance.ts
// Purpose: Performance utilities for tracking and monitoring app performance

import { Platform } from 'react-native';

export interface PerformanceMetrics {
    renderTime: number;
    memoryUsage?: number;
    fps?: number;
    timestamp: number;
}

export interface ComponentMetrics {
    componentName: string;
    mountTime: number;
    renderCount: number;
    averageRenderTime: number;
    totalRenderTime: number;
}

class PerformanceMonitor {
    private metrics: Map<string, ComponentMetrics> = new Map();
    private frameCount = 0;
    private lastFrameTime = Date.now();
    private fps = 60;
    private fpsUpdateInterval: number | null = null;

    /**
     * Track component render time
     */
    trackRender(componentName: string, renderTime: number): void {
        const existing = this.metrics.get(componentName);
        
        if (existing) {
            existing.renderCount++;
            existing.totalRenderTime += renderTime;
            existing.averageRenderTime = existing.totalRenderTime / existing.renderCount;
        } else {
            this.metrics.set(componentName, {
                componentName,
                mountTime: Date.now(),
                renderCount: 1,
                averageRenderTime: renderTime,
                totalRenderTime: renderTime,
            });
        }
    }

    /**
     * Track component mount time
     */
    trackMount(componentName: string, mountTime: number): void {
        const existing = this.metrics.get(componentName);
        if (existing) {
            existing.mountTime = mountTime;
        } else {
            this.metrics.set(componentName, {
                componentName,
                mountTime,
                renderCount: 0,
                averageRenderTime: 0,
                totalRenderTime: 0,
            });
        }
    }

    /**
     * Get component metrics
     */
    getMetrics(componentName: string): ComponentMetrics | undefined {
        return this.metrics.get(componentName);
    }

    /**
     * Get all metrics
     */
    getAllMetrics(): ComponentMetrics[] {
        return Array.from(this.metrics.values());
    }

    /**
     * Get current FPS
     */
    getFPS(): number {
        return this.fps;
    }

    /**
     * Start FPS monitoring
     */
    startFPSMonitoring(): void {
        if (this.fpsUpdateInterval) return;

        this.fpsUpdateInterval = setInterval(() => {
            const now = Date.now();
            const delta = now - this.lastFrameTime;
            
            if (delta > 0) {
                this.fps = Math.round(1000 / delta);
            }
            
            this.lastFrameTime = now;
            this.frameCount++;
        }, 1000 / 60); // Target 60 FPS
    }

    /**
     * Stop FPS monitoring
     */
    stopFPSMonitoring(): void {
        if (this.fpsUpdateInterval) {
            clearInterval(this.fpsUpdateInterval);
            this.fpsUpdateInterval = null;
        }
    }

    /**
     * Get memory usage (if available)
     */
    async getMemoryUsage(): Promise<number | undefined> {
        if (Platform.OS === 'web' && 'performance' in window && 'memory' in (performance as any)) {
            const memory = (performance as any).memory;
            return memory.usedJSHeapSize / 1048576; // Convert to MB
        }
        // For native platforms, memory monitoring would require native modules
        return undefined;
    }

    /**
     * Clear all metrics
     */
    clearMetrics(): void {
        this.metrics.clear();
    }

    /**
     * Get performance report
     */
    getReport(): {
        components: ComponentMetrics[];
        fps: number;
        memoryUsage?: number;
    } {
        return {
            components: this.getAllMetrics(),
            fps: this.getFPS(),
        };
    }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Measure render time of a function
 */
export function measureRenderTime<T>(fn: () => T, componentName?: string): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    const renderTime = end - start;

    if (componentName) {
        performanceMonitor.trackRender(componentName, renderTime);
    }

    if (__DEV__ && renderTime > 16) {
        // Warn if render takes longer than one frame (16ms at 60fps)
        console.warn(`[Performance] ${componentName || 'Component'} render took ${renderTime.toFixed(2)}ms`);
    }

    return result;
}

/**
 * Measure async operation time
 */
export async function measureAsyncTime<T>(
    fn: () => Promise<T>,
    operationName: string
): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    const duration = end - start;

    if (__DEV__) {
        console.log(`[Performance] ${operationName} took ${duration.toFixed(2)}ms`);
    }

    return result;
}

/**
 * Create a performance budget checker
 */
export function createPerformanceBudget(budgets: {
    maxRenderTime?: number;
    maxBundleSize?: number;
    minFPS?: number;
    maxMemoryUsage?: number;
}) {
    return {
        checkRenderTime: (renderTime: number): boolean => {
            if (budgets.maxRenderTime && renderTime > budgets.maxRenderTime) {
                if (__DEV__) {
                    console.warn(`[Performance Budget] Render time ${renderTime}ms exceeds budget of ${budgets.maxRenderTime}ms`);
                }
                return false;
            }
            return true;
        },
        checkFPS: (fps: number): boolean => {
            if (budgets.minFPS && fps < budgets.minFPS) {
                if (__DEV__) {
                    console.warn(`[Performance Budget] FPS ${fps} is below budget of ${budgets.minFPS}`);
                }
                return false;
            }
            return true;
        },
    };
}

// Default performance budgets
export const defaultPerformanceBudgets = {
    maxRenderTime: 16, // 1 frame at 60fps
    minFPS: 55,
    maxMemoryUsage: 100, // MB
};
