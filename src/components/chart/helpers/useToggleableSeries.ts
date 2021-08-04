import { useCallback, useMemo, useState } from 'react';

import type { ChartConfig } from '../types';

export type IsSeriesVisible = (key: string) => boolean;
export type ToggleSeries = (key: string) => void;

/**
 * Given the data for a chart and a list of the series which are hidden, returns a new data object
 * where any hidden series have a new attribute `hidden`, and their value set to the smallest number
 * allowable.
 *
 * See useToggleableChartConfig for an explation of the use of Number.MIN_VALUE.
 */
function filterChartConfig(data: ChartConfig, hiddenSeries: Set<string>): ChartConfig {
  const { annotations, series, ...rest } = data;

  return {
    ...rest,
    series: series.map((series) => {
      const hidden = hiddenSeries.has(series.name);

      if (hidden || hidden != series.hidden) {
        return {
          ...series,
          hidden,
          value: hidden
            ? series.value.map((value) => (value < 0 ? -Number.MIN_VALUE : Number.MIN_VALUE))
            : series.value,
        };
      }

      return series;
    }),
    annotations: (annotations || []).map((annotation) => {
      const hidden = hiddenSeries.has(annotation.name);

      if (hidden != annotation.hidden) {
        return { ...annotation, hidden };
      }

      return annotation;
    }),
  };
}

/**
 * Given chart data, returns a set containing all the series and annotation names which are hidden
 * in the data.
 */
function initialHiddenNames(data: ChartConfig) {
  const set = new Set<string>();

  for (const { name, hidden } of data.series) {
    hidden && set.add(name);
  }

  if (data.annotations) {
    for (const { name, hidden } of data.annotations) {
      hidden && set.add(name);
    }
  }

  return set;
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
  data: ChartConfig;
  isSeriesVisible: IsSeriesVisible;
  toggleSeries: ToggleSeries;
} {
  const initialHidden = useMemo(() => initialHiddenNames(data), [data]);
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(initialHidden);

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
