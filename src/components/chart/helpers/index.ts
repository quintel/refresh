import { useMemo } from 'react';

import type { ChartConfig, SeriesConfig, TablePoint } from '../types';

export { default as calculateExtent } from './calculateExtent';
export { default as useFixatedSeries } from './useFixatedSeries';
export { default as useToggleableSeries } from './useToggleableSeries';

type ChartDimensions = {
  height: number;
  width: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
};

/**
 * Returns an object describing the dimensions of the chart, including the `boundedHeight` and
 * `boundedWidth`, which correspond to the given `height` and `width` with any relevant margins
 * removed.
 *
 * Bounded dimensions describe the drawable area of the chart, minus space reserved for axes.
 */
export function chartDimensions({
  height,
  width,
  marginBottom = 30,
  marginLeft = 30,
  marginRight = 0,
  marginTop = 10,
}: ChartDimensions): Required<ChartDimensions> & { boundedHeight: number; boundedWidth: number } {
  return {
    boundedHeight: Math.max(height - marginTop - marginBottom, 0),
    boundedWidth: Math.max(width - marginLeft - marginRight, 0),
    height,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    width,
  };
}

/**
 * Returns all the x-values for a chart. When the chart specifies specific values for the xAxis, we
 * return those. Otherwise generate keys with incrementing numbers.
 *
 * @privateRemarks
 *
 * TODO: This should support continuous series for linear scales, or tableizeData needs to be
 * adjusted accordingly.
 */
function chartXValues(data: Pick<ChartConfig, 'series' | 'xAxis'>) {
  if (data.xAxis?.data) {
    return data.xAxis.data;
  }

  const values: number[] = [];
  const length = data.series[0]?.value?.length || 0;

  for (let i = 0; i < length; i++) {
    values.push(i);
  }

  return values;
}

/**
 * Returns the data for a chart as a table.
 *
 * A table is an array where each element represents a discrete value on the x-axis. The element is
 * a TablePoint which contains the x-axis value as `key`, and all the series values on an object.
 *
 * @param data   - The chart data
 * @param select - An optional function which can be used to filter which series are included in the
 *                 tableized data.
 *
 * @example
 *   tableizeData(chartConfig)
 *   // => [
 *   //      { key: "Present", seriesOne: 1.0, seriesTwo: 2.0 },
 *   //      { key: "Future",  seriesOne: 3.0, seriesTwo: 3.0 },
 *   //    ]
 */
export function tableizeData(
  data: Pick<ChartConfig, 'series' | 'xAxis'>,
  keys?: string[]
): TablePoint[] {
  const points: TablePoint[] = chartXValues(data).map((x) => ({ x, values: {} }));

  for (const series of data.series) {
    if (keys && !keys.includes(series.name)) {
      continue;
    }

    if (series.value.length !== points.length) {
      throw (
        `Series ${series.name} has a different number of values than expected; ` +
        `got ${series.value.length}, expected ${points.length}`
      );
    }

    for (const [index, value] of series.value.entries()) {
      points[index].values[series.name] = value;
    }
  }

  return points;
}

/**
 * Given an available amount of space in pixels and optionally how often ticks should be drawn (in
 * pixels), returns the number of ticks D3 shoudl use to represent a scale.
 */
export function tickCount(available: number, ticksPerPixel = 40): number {
  return Math.max(Math.floor(available / ticksPerPixel), 2);
}

/**
 * Given Data for a chart, returns a memoized array containing keys of all series.
 */
export function useSeriesNames(
  data: ChartConfig,
  select?: (series: SeriesConfig) => boolean
): string[] {
  return useMemo(() => {
    const names = [];

    for (const series of data.series) {
      if (select && !select(series)) {
        continue;
      }

      names.push(series.name);
    }

    return names;
  }, [data, select]);
}
