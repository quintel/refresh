import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { render } from '@testing-library/react';

import ChartContext from '../ChartContext';
import { AnnotationConfig, ChartConfig, SeriesConfig } from '../types';

type ContextValueType = Exclude<React.ComponentProps<typeof ChartContext.Provider>['value'], false>;

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
 * Creates a fake context value. You may provide any custom properties to be included.
 */
export function buildContextValue(values: Partial<ContextValueType> = {}): ContextValueType {
  return {
    colorScale: scaleOrdinal(),
    data: buildChart(),
    fixateSeries: () => false,
    height: 200,
    isSeriesDimmed: () => false,
    isSeriesFixated: () => false,
    isSeriesVisible: () => true,
    toggleSeries: () => false,
    width: 400,
    xScale: scaleBand(),
    yScale: scaleLinear(),
    ...values,
  };
}

/**
 * Builds a series which may be used in tests.
 */
export function buildSeries(attrs: Partial<SeriesConfig> = {}): SeriesConfig {
  return { color: 'black', name: `Series ${id++}`, type: 'bar', value: [], ...attrs };
}

/**
 * Renders a chart component which depends on ChartContext.
 */
export function TestChartContainer({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: Partial<ContextValueType>;
}): React.ReactElement {
  const contextValue = buildContextValue(value);
  const { height, width } = contextValue;

  return (
    <ChartContext.Provider value={contextValue}>
      <svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        {children}
      </svg>
    </ChartContext.Provider>
  );
}
