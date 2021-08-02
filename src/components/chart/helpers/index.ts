import { useMemo } from 'react';

import type { ChartConfig } from '../types';

export { default as useFixatedSeries } from './useFixatedSeries';
export { default as useToggleableSeries } from './useToggleableSeries';

/**
 * Given Data for a chart, returns a memoized array containing keys of all series.
 */
export function useSeriesNames(data: ChartConfig): string[] {
  return useMemo(() => data.series.map((series) => series.name), [data]);
}