import { useCallback, useMemo, useState } from 'react';

import type { ChartConfig } from '../types';

export type IsSeriesVisible = (key: string) => boolean;
export type ToggleSeries = (key: string) => void;

/**
 * A derivative of the ChartConfig where each series and annotation also has a boolean `hidden`
 * attribute.
 */
type ToggledChartConfig = ChartConfig & {
  annotations: (NonNullable<ChartConfig['annotations']>[0] & { hidden?: boolean })[];
  series: (ChartConfig['series'][0] & { hidden?: boolean })[];
};

/**
 * Given the data for a chart and a list of the series which are hidden, returns a new data object
 * where any hidden series have a new attribute `hidden`, and their value set to the smallest number
 * allowable.
 *
 * See useToggleableChartConfig for an explation of the use of Number.MIN_VALUE.
 */
function filterChartConfig(data: ChartConfig, hiddenSeries: Set<string>): ToggledChartConfig {
  const { annotations, series, ...rest } = data;

  return {
    ...rest,
    series: series.map((series) =>
      hiddenSeries.has(series.name)
        ? {
            ...series,
            hidden: true,
            value: series.value.map((value) => (value < 0 ? -Number.MIN_VALUE : Number.MIN_VALUE)),
          }
        : series
    ),
    annotations: (annotations || []).map((annotation) =>
      hiddenSeries.has(annotation.name)
        ? {
            ...annotation,
            hidden: true,
          }
        : annotation
    ),
  };
}

/**
 * Receives data for a chart, and allows series to be toggled on and off.
 *
 * Returns new data where each hidden series has a `hidden` attribute set to true. The value of a
 * hidden series is set to `Number.MIN_VALUE` rather than zero, as this ensures the stack order
 * remains consistent. Setting to zero causes the hidden series to be stacked before those that are
 * non-zero. This causes incorrect animations when toggling series on an off.
 *
 * Both series and annotations can be toggled, though this requires that they have unique keys.
 */
export default function useToggleableSeries(data: ChartConfig): {
  data: ToggledChartConfig;
  isSeriesVisible: IsSeriesVisible;
  toggleSeries: ToggleSeries;
} {
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());

  const toggled = useMemo(() => filterChartConfig(data, hiddenSeries), [data, hiddenSeries]);

  const isSeriesVisible: IsSeriesVisible = useCallback(
    (key: string) => !hiddenSeries.has(key),
    [hiddenSeries]
  );

  const toggleSeries: ToggleSeries = useCallback(
    (key: string) => {
      setHiddenSeries(
        new Set(
          isSeriesVisible(key) ? [...hiddenSeries, key] : [...hiddenSeries].filter((s) => s !== key)
        )
      );
    },
    [isSeriesVisible, hiddenSeries]
  );

  return {
    isSeriesVisible,
    data: toggled,
    toggleSeries,
  };
}
