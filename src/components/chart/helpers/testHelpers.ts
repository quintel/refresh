import { AnnotationConfig, ChartConfig, SeriesConfig } from '../types';

// Used to generate unique IDs for series and annotations. Not thread-safe, but it only matters that
// numbers are monotonic within a single test.
let id = 0;

/**
 * Builds an annotation which may be used in tests.
 */
export function buildAnnotation(attrs: Partial<AnnotationConfig> = {}): AnnotationConfig {
  return {
    color: 'black',
    name: `Annotation ${id++}`,
    type: 'target-line',
    value: 0,
    x: 0,
    ...attrs,
  };
}

/**
 * Builds configuration for a chart.
 */
export function buildChart(attrs: Partial<ChartConfig> = {}): ChartConfig {
  return { series: [], xAxis: {}, ...attrs };
}

/**
 * Builds a series which may be used in tests.
 */
export function buildSeries(attrs: Partial<SeriesConfig> = {}): SeriesConfig {
  return { color: 'black', name: `Series ${id++}`, value: [], ...attrs };
}
