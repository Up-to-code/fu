// File: src/__tests__/performance/benchmarks.test.ts
// Purpose: Performance benchmark tests

import { benchmarkRunner, performanceBudgets } from '../../utils/benchmarks';
import { performanceMonitor } from '../../utils/performance';

describe('Performance Benchmarks', () => {
    beforeEach(() => {
        benchmarkRunner.clear();
        performanceMonitor.clearMetrics();
    });

    describe('Component Render Performance', () => {
        it('should render components within budget', async () => {
            const result = await benchmarkRunner.benchmarkComponentRender(
                'TestComponent',
                () => {
                    // Simulate component render
                    const start = performance.now();
                    while (performance.now() - start < 5) {
                        // Simulate 5ms render
                    }
                },
                performanceBudgets.componentRender
            );

            expect(result.passed).toBe(true);
            expect(result.duration).toBeLessThan(performanceBudgets.componentRender);
        });

        it('should detect slow component renders', async () => {
            const result = await benchmarkRunner.benchmarkComponentRender(
                'SlowComponent',
                () => {
                    // Simulate slow render
                    const start = performance.now();
                    while (performance.now() - start < 20) {
                        // Simulate 20ms render (exceeds budget)
                    }
                },
                performanceBudgets.componentRender
            );

            expect(result.passed).toBe(false);
            expect(result.duration).toBeGreaterThan(performanceBudgets.componentRender);
        });
    });

    describe('Screen Load Performance', () => {
        it('should load screens within budget', async () => {
            const result = await benchmarkRunner.benchmarkScreenLoad(
                'TestScreen',
                async () => {
                    // Simulate screen load
                    await new Promise(resolve => setTimeout(resolve, 100));
                },
                performanceBudgets.screenLoad
            );

            expect(result.passed).toBe(true);
            expect(result.loadTime).toBeLessThan(performanceBudgets.screenLoad);
        });
    });

    describe('List Scroll Performance', () => {
        it('should scroll lists smoothly', async () => {
            const result = await benchmarkRunner.benchmarkListScroll(
                'ProductList',
                100,
                () => {
                    // Simulate scroll operation
                    const start = performance.now();
                    while (performance.now() - start < 10) {
                        // Simulate 10ms scroll
                    }
                },
                performanceBudgets.listScroll
            );

            expect(result.passed).toBe(true);
            expect(result.duration).toBeLessThan(performanceBudgets.listScroll);
        });
    });

    describe('Performance Budgets', () => {
        it('should have reasonable performance budgets', () => {
            expect(performanceBudgets.screenLoad).toBeLessThanOrEqual(2000);
            expect(performanceBudgets.componentRender).toBeLessThanOrEqual(16);
            expect(performanceBudgets.listScroll).toBeLessThanOrEqual(16);
            expect(performanceBudgets.apiCall).toBeLessThanOrEqual(1000);
        });
    });

    describe('Benchmark Summary', () => {
        it('should track all benchmark results', async () => {
            await benchmarkRunner.benchmark('Test1', () => {}, 10);
            await benchmarkRunner.benchmark('Test2', () => {}, 10);
            await benchmarkRunner.benchmark('Test3', () => {}, 10);

            const results = benchmarkRunner.getResults();
            expect(results.length).toBe(3);

            const summary = benchmarkRunner.getSummary();
            expect(summary.total).toBe(3);
        });

        it('should identify slowest and fastest benchmarks', async () => {
            await benchmarkRunner.benchmark('Fast', () => {
                const start = performance.now();
                while (performance.now() - start < 1) {}
            }, 10);

            await benchmarkRunner.benchmark('Slow', () => {
                const start = performance.now();
                while (performance.now() - start < 5) {}
            }, 10);

            const summary = benchmarkRunner.getSummary();
            expect(summary.slowest).toBeTruthy();
            expect(summary.fastest).toBeTruthy();
            if (summary.slowest && summary.fastest) {
                expect(summary.slowest.duration).toBeGreaterThan(summary.fastest.duration);
            }
        });
    });
});
