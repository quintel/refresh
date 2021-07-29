import { AnnotationConfig, ChartConfig, SeriesConfig } from '../types';

/**
 * Builds an annotation which may be used in tests.
 */
export function buildAnnotation(attrs: Partial<AnnotationConfig> = {}): AnnotationConfig {
  return { color: 'black', name: 'My annotation', type: 'target-line', value: 0, x: 0, ...attrs };
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
  return { color: 'black', name: 'My series', value: [], ...attrs };
}
