import type { ChartConfig } from '../types';
import type { LegendItemProps } from './Legend';

export { default } from './Legend';

/**
 * Takes a chart config, a function that returns a color for a series (typically a ScaleOrdinal),
 * and a function which determines whether a series or annotation is currently visible, and returns
 * properties representing the chart which can be used to render a Legend.
 *
 * TODO: Assumes that all columns have the same series. Not necessarily true!
 */
export function legendItemPropsFromConfig(
  chart: Pick<ChartConfig, 'annotations' | 'series'>
): LegendItemProps[] {
  const items: LegendItemProps[] = [];
  const seenAnnotations = new Set();

  for (const { color, hidden, name } of chart.annotations || []) {
    if (seenAnnotations.has(name)) {
      continue;
    }

    items.push({
      name,
      color: color,
      hidden,
      style: 'line',
    });

    seenAnnotations.add(name);
  }

  for (const { color, hidden, name } of chart.series) {
    items.push({
      name,
      color: color,
      hidden,
      style: 'box',
    });
  }

  return items;
}
