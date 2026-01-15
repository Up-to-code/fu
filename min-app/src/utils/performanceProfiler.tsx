// File: src/utils/performanceProfiler.tsx
// Purpose: React Profiler wrapper for component performance tracking

import React, { Profiler, ProfilerOnRenderCallback, ReactNode } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { performanceMonitor } from './performance';
import { defaultPerformanceBudgets } from './performance';

interface PerformanceProfilerProps {
    children: ReactNode;
    id: string;
    enabled?: boolean;
    showOverlay?: boolean;
}

/**
 * Performance Profiler Component
 * Wraps components to track render performance
 */
export function PerformanceProfiler({
    children,
    id,
    enabled = __DEV__,
    showOverlay = false,
}: PerformanceProfilerProps) {
    const onRenderCallback: ProfilerOnRenderCallback = (
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime
    ) => {
        if (!enabled) return;

        performanceMonitor.trackRender(id, actualDuration);

        // Check against performance budget
        const budget = defaultPerformanceBudgets.maxRenderTime || 16;
        if (actualDuration > budget) {
            console.warn(
                `[Performance Profiler] ${id} ${phase} took ${actualDuration.toFixed(2)}ms ` +
                `(exceeds budget of ${budget}ms)`
            );
        }

        if (__DEV__ && showOverlay) {
            // Log detailed metrics
            console.log(`[Profiler] ${id}:`, {
                phase,
                actualDuration: `${actualDuration.toFixed(2)}ms`,
                baseDuration: `${baseDuration.toFixed(2)}ms`,
                startTime: `${startTime.toFixed(2)}ms`,
                commitTime: `${commitTime.toFixed(2)}ms`,
            });
        }
    };

    if (!enabled) {
        return <>{children}</>;
    }

    return (
        <Profiler id={id} onRender={onRenderCallback}>
            {children}
        </Profiler>
    );
}

/**
 * Performance Overlay Component (Development Only)
 */
export function PerformanceOverlay() {
    const [metrics, setMetrics] = React.useState(performanceMonitor.getAllMetrics());
    const [fps, setFPS] = React.useState(60);

    React.useEffect(() => {
        if (!__DEV__) return;

        performanceMonitor.startFPSMonitoring();
        const interval = setInterval(() => {
            setMetrics(performanceMonitor.getAllMetrics());
            setFPS(performanceMonitor.getFPS());
        }, 1000);

        return () => {
            clearInterval(interval);
            performanceMonitor.stopFPSMonitoring();
        };
    }, []);

    if (!__DEV__) {
        return null;
    }

    const slowComponents = metrics
        .filter(m => m.averageRenderTime > 16)
        .sort((a, b) => b.averageRenderTime - a.averageRenderTime)
        .slice(0, 5);

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Text style={styles.title}>Performance Monitor</Text>
                <Text style={styles.metric}>FPS: {fps}</Text>
                <Text style={styles.metric}>Components: {metrics.length}</Text>
                
                {slowComponents.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>Slow Components:</Text>
                        {slowComponents.map(component => (
                            <Text key={component.componentName} style={styles.slowComponent}>
                                {component.componentName}: {component.averageRenderTime.toFixed(2)}ms
                                {' '}({component.renderCount} renders)
                            </Text>
                        ))}
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20,
        right: 10,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 8,
        padding: 12,
        minWidth: 200,
        maxWidth: 300,
    },
    container: {
        gap: 4,
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    metric: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'monospace',
    },
    sectionTitle: {
        color: '#ffa500',
        fontSize: 11,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 4,
    },
    slowComponent: {
        color: '#ff6b6b',
        fontSize: 10,
        fontFamily: 'monospace',
        marginLeft: 8,
    },
});
