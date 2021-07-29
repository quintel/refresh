import { renderHook } from '@testing-library/react-hooks';
import { useSeriesNames } from '.';

import { buildChart, buildSeries } from './testHelpers';

describe('useSeriesNames', () => {
  it('extracts the series keys from the data', () => {
    const { result } = renderHook(() =>
      useSeriesNames(
        buildChart({
          series: [buildSeries({ name: 'One' }), buildSeries({ name: 'Two' })],
        })
      )
    );

    expect(result.current).toEqual(['One', 'Two']);
  });

  it('returns series in the order in which they appear in the original data', () => {
    const { result } = renderHook(() =>
      useSeriesNames(
        buildChart({
          series: [buildSeries({ name: 'Bravo' }), buildSeries({ name: 'Alpha' })],
        })
      )
    );

    expect(result.current).toEqual(['Bravo', 'Alpha']);
  });

  it('returns new keys when the data changes', () => {
    const { result, rerender } = renderHook(({ data }) => useSeriesNames(data), {
      initialProps: {
        data: buildChart({
          series: [buildSeries({ name: 'One' }), buildSeries({ name: 'Two' })],
        }),
      },
    });

    expect(result.current).toEqual(['One', 'Two']);

    rerender({
      data: buildChart({
        series: [buildSeries({ name: 'Three' }), buildSeries({ name: 'Four' })],
      }),
    });

    expect(result.current).toEqual(['Three', 'Four']);
  });
});
