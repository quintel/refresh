import { groupBy, maxBy, minBy } from 'lodash';
import next from 'next';
import { ChartConfig, SeriesConfig } from '../types';

/**
 * Calculates the extent of a "bar" of values. The bar is treated as diverging: negatives do not
 * reduce the maximum, but subtracted from the minimum.
 *
 * It is always assumed that the the chart starts at zero.
 *
 * @example
 *
 * Providing negative values creates a diverting extent.
 *
 *   calculateExtentOfBar([1, 2, 3, -1, -2])
 *   // => [-3, 6]
 *
 * @example
 *
 * Zero is always considered a value.
 *
 *   calculateExtentOfBar([4, 6, 8])
 *   // => [0, 8], not [4, 8]
 *
 */
function calculateExtentOfBar(values: number[]): [number, number] {
  let positive = 0;
  let negative = 0;

  for (const value of values) {
    value < 0 ? (negative += value) : (positive += value);
  }

  return [negative, positive];
}

/**
 * Takes an array of series (a "stack") and computes the minimum and maximum value needed to
 * represent the stack in a chart.
 */
function calculateExtentOfStack(stack: SeriesConfig[]): [number, number] {
  const byX: number[][] = [];

  for (const series of stack) {
    if (series.hidden) continue;

    for (const [index, value] of series.value.entries()) {
      byX[index] ??= [];
      byX[index].push(value);
    }
  }

  return extentFromExtents(Object.values(byX).map((bar) => calculateExtentOfBar(bar)));
}

/**
 * Takes an array of [min, max] pairs and returns the single minimum and maximum valuee.
 */
function extentFromExtents(extents: [number, number][]): [number, number] {
  return [minBy(extents, ([min]) => min)?.[0] || 0, maxBy(extents, ([, max]) => max)?.[1] || 0];
}

/**
 * Calculates the minimum and maximum values from an array of annotations.
 */
function extentOfAnnotations(
  annotations: NonNullable<ChartConfig['annotations']>
): [number, number] {
  let min = 0;
  let max = 0;

  for (const annotation of annotations) {
    if (annotation.hidden) continue;

    min = Math.min(min, annotation.value);
    max = Math.max(max, annotation.value);
  }

  return [min, max];
}

/**
 * Returns the minimum and maximum value of each column of the Data.
 */
export default function calculateExtent(data: ChartConfig): [number, number] {
  const extents = Object.values(
    groupBy(data.series, (series) => (series.stack || `series.${series.name}`).toString())
  ).map((stack) => calculateExtentOfStack(stack));

  if (data.annotations?.length) {
    extents.push(extentOfAnnotations(data.annotations));
  }

  return extentFromExtents(extents);
}
