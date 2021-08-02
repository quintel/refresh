import { useMemo } from 'react';

import type { ChartConfig } from '../types';

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
 * Given an available amount of space in pixels and optionally how often ticks should be drawn (in
 * pixels), returns the number of ticks D3 shoudl use to represent a scale.
 */
export function tickCount(available: number, ticksPerPixel = 40): number {
  return Math.max(Math.floor(available / ticksPerPixel), 2);
}

/**
 * Given Data for a chart, returns a memoized array containing keys of all series.
 */
export function useSeriesNames(data: ChartConfig): string[] {
  return useMemo(() => data.series.map((series) => series.name), [data]);
}
