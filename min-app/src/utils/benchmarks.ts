// File: src/utils/benchmarks.ts
// Purpose: Benchmark utilities for performance testing

import { performanceMonitor } from './performance';
import { defaultPerformanceBudgets } from './performance';

export interface BenchmarkResult {
    name: string;
    duration: number;
    passed: boolean;
    threshold: number;
    timestamp: number;
}

export interface ScreenLoadBenchmark {
    screenName: string;
    loadTime: number;
    timeToInteractive: number;
    memoryUsage?: number;
    passed: boolean;
}

export class BenchmarkRunner {
    private results: BenchmarkResult[] = [];

    /**
     * Benchmark a function execution
     */
    async benchmark(
        name: string,
        fn: () => void | Promise<void>,
        threshold: number = 16
    ): Promise<BenchmarkResult> {
        const start = performance.now();
        await fn();
        const duration = performance.now() - start;

        const passed = duration <= threshold;
        const result: BenchmarkResult = {
            name,
            duration,
            passed,
            threshold,
            timestamp: Date.now(),
        };

        this.results.push(result);

        if (__DEV__) {
            const status = passed ? 'PASS' : 'FAIL';
            console.log(`[Benchmark] ${status} ${name}: ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`);
        }

        return result;
    }

    /**
     * Benchmark screen load time
     */
    async benchmarkScreenLoad(
        screenName: string,
        loadFn: () => Promise<void>,
        threshold: number = 1000
    ): Promise<ScreenLoadBenchmark> {
        const start = performance.now();
        await loadFn();
        const loadTime = performance.now() - start;

        // Measure time to interactive (when component is mounted and ready)
        const ttiStart = performance.now();
        // Wait a bit to simulate user interaction readiness
        await new Promise(resolve => setTimeout(resolve, 100));
        const timeToInteractive = performance.now() - ttiStart;

        const memoryUsage = await performanceMonitor.getMemoryUsage();
        const passed = loadTime <= threshold;

        const result: ScreenLoadBenchmark = {
            screenName,
            loadTime,
            timeToInteractive,
            memoryUsage,
            passed,
        };

        if (__DEV__) {
            const status = passed ? 'PASS' : 'FAIL';
            console.log(`[Benchmark] ${status} Screen Load ${screenName}:`, {
                loadTime: `${loadTime.toFixed(2)}ms`,
                timeToInteractive: `${timeToInteractive.toFixed(2)}ms`,
                memory: memoryUsage ? `${memoryUsage.toFixed(2)}MB` : 'N/A',
                threshold: `${threshold}ms`,
            });
        }

        return result;
    }

    /**
     * Benchmark list scrolling performance
     */
    async benchmarkListScroll(
        listName: string,
        itemCount: number,
        scrollFn: () => void,
        threshold: number = 16
    ): Promise<BenchmarkResult> {
        const start = performance.now();
        scrollFn();
        const duration = performance.now() - start;

        const passed = duration <= threshold;
        const result: BenchmarkResult = {
            name: `${listName} (${itemCount} items)`,
            duration,
            passed,
            threshold,
            timestamp: Date.now(),
        };

        this.results.push(result);

        if (__DEV__) {
            const status = passed ? 'PASS' : 'FAIL';
            console.log(`[Benchmark] ${status} List Scroll ${listName}: ${duration.toFixed(2)}ms`);
        }

        return result;
    }

    /**
     * Benchmark component render
     */
    async benchmarkComponentRender(
        componentName: string,
        renderFn: () => void,
        threshold: number = 16
    ): Promise<BenchmarkResult> {
        const start = performance.now();
        renderFn();
        const duration = performance.now() - start;

        const passed = duration <= threshold;
        const result: BenchmarkResult = {
            name: `Render ${componentName}`,
            duration,
            passed,
            threshold,
            timestamp: Date.now(),
        };

        this.results.push(result);

        if (__DEV__) {
            const status = passed ? 'PASS' : 'FAIL';
            console.log(`[Benchmark] ${status} Component Render ${componentName}: ${duration.toFixed(2)}ms`);
        }

        return result;
    }

    /**
     * Get all benchmark results
     */
    getResults(): BenchmarkResult[] {
        return [...this.results];
    }

    /**
     * Get summary statistics
     */
    getSummary(): {
        total: number;
        passed: number;
        failed: number;
        averageDuration: number;
        slowest: BenchmarkResult | null;
        fastest: BenchmarkResult | null;
    } {
        const passed = this.results.filter(r => r.passed).length;
        const failed = this.results.filter(r => !r.passed).length;
        const averageDuration = this.results.reduce((sum, r) => sum + r.duration, 0) / this.results.length;
        const slowest = this.results.reduce((prev, curr) => 
            curr.duration > prev.duration ? curr : prev, 
            this.results[0] || null
        );
        const fastest = this.results.reduce((prev, curr) => 
            curr.duration < prev.duration ? curr : prev, 
            this.results[0] || null
        );

        return {
            total: this.results.length,
            passed,
            failed,
            averageDuration,
            slowest,
            fastest,
        };
    }

    /**
     * Clear all results
     */
    clear(): void {
        this.results = [];
    }

    /**
     * Check if all benchmarks passed
     */
    allPassed(): boolean {
        return this.results.every(r => r.passed);
    }
}

// Singleton instance
export const benchmarkRunner = new BenchmarkRunner();

/**
 * Performance budgets for different operations
 */
export const performanceBudgets = {
    screenLoad: 1000, // 1 second
    componentRender: 16, // 1 frame at 60fps
    listScroll: 16, // 1 frame at 60fps
    apiCall: 500, // 500ms
    imageLoad: 2000, // 2 seconds
    bundleSize: 2 * 1024 * 1024, // 2MB
};
