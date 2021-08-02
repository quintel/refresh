import { renderHook, act } from '@testing-library/react-hooks';
import useToggleableSeries from './useToggleableSeries';

import { buildAnnotation, buildChart, buildSeries } from './testHelpers';

describe('useToggleable', () => {
  it('allows toggling series', () => {
    const { result } = renderHook(() =>
      useToggleableSeries(
        buildChart({
          series: [buildSeries({ name: 'One' }), buildSeries({ name: 'Two' })],
        })
      )
    );

    expect(result.current.data.series).toHaveLength(2);

    expect(result.current.data.series[0].hidden).toBeFalsy();
    expect(result.current.data.series[1].hidden).toBeFalsy();

    expect(result.current.isSeriesVisible('One')).toBeTruthy();
    expect(result.current.isSeriesVisible('Two')).toBeTruthy();

    act(() => result.current.toggleSeries('Two'));

    expect(result.current.data.series[0].hidden).toBeFalsy();
    expect(result.current.data.series[1].hidden).toBeTruthy();

    expect(result.current.isSeriesVisible('One')).toBeTruthy();
    expect(result.current.isSeriesVisible('Two')).toBeFalsy();

    act(() => result.current.toggleSeries('Two'));

    expect(result.current.data.series[1].hidden).toBeFalsy();
    expect(result.current.isSeriesVisible('Two')).toBeTruthy();
  });

  it('returns new series objects when toggled off', () => {
    const series = buildSeries({ name: 'One' });

    const { result } = renderHook(() => useToggleableSeries(buildChart({ series: [series] })));

    // Series is the original object.
    expect(result.current.data.series[0]).toBe(series);

    // Series is a new object.
    act(() => result.current.toggleSeries('One'));
    expect(result.current.data.series[0]).not.toBe(series);

    // Series is the original object again.
    act(() => result.current.toggleSeries('One'));
    expect(result.current.data.series[0]).toBe(series);
  });

  it('allows toggling annotations', () => {
    const { result } = renderHook(() =>
      useToggleableSeries(
        buildChart({
          annotations: [buildAnnotation({ name: 'Alpha' }), buildAnnotation({ name: 'Bravo' })],
        })
      )
    );

    expect(result.current.data.annotations).toHaveLength(2);

    expect(result.current.data.annotations[0].hidden).toBeFalsy();
    expect(result.current.data.annotations[1].hidden).toBeFalsy();

    expect(result.current.isSeriesVisible('Alpha')).toBeTruthy();
    expect(result.current.isSeriesVisible('Bravo')).toBeTruthy();

    act(() => result.current.toggleSeries('Bravo'));

    expect(result.current.data.annotations[0].hidden).toBeFalsy();
    expect(result.current.data.annotations[1].hidden).toBeTruthy();

    expect(result.current.isSeriesVisible('Alpha')).toBeTruthy();
    expect(result.current.isSeriesVisible('Bravo')).toBeFalsy();

    act(() => result.current.toggleSeries('Bravo'));

    expect(result.current.data.annotations[1].hidden).toBeFalsy();
    expect(result.current.isSeriesVisible('Bravo')).toBeTruthy();
  });

  it('returns new annotations objects when toggled off', () => {
    const annotation = buildAnnotation({ name: 'One' });

    const { result } = renderHook(() =>
      useToggleableSeries(buildChart({ annotations: [annotation] }))
    );

    // Annotation is the original object.
    expect(result.current.data.annotations[0]).toBe(annotation);

    // Annotation is a new object.
    act(() => result.current.toggleSeries('One'));
    expect(result.current.data.annotations[0]).not.toBe(annotation);

    // Annotation is the original object again.
    act(() => result.current.toggleSeries('One'));
    expect(result.current.data.annotations[0]).toBe(annotation);
  });

  it('returns memoized data when repeatedly given the same config object', () => {
    const config = buildChart();

    const { result, rerender } = renderHook(({ chartConfig }) => useToggleableSeries(chartConfig), {
      initialProps: { chartConfig: config },
    });

    const { data } = result.current;

    /* eslint-disable unicorn/consistent-destructuring */
    rerender({ chartConfig: config });
    expect(result.current.data).toBe(data);

    rerender({ chartConfig: buildChart() });
    expect(result.current.data).not.toBe(data);
    /* eslint-enable unicorn/consistent-destructuring */
  });

  it('respects the initial state of toggled series', () => {
    const { result } = renderHook(() =>
      useToggleableSeries(
        buildChart({
          series: [buildSeries({ name: 'One', hidden: true }), buildSeries({ name: 'Two' })],
        })
      )
    );

    expect(result.current.data.series).toHaveLength(2);

    expect(result.current.data.series[0].hidden).toBeTruthy();
    expect(result.current.data.series[1].hidden).toBeFalsy();

    expect(result.current.isSeriesVisible('One')).toBeFalsy();
    expect(result.current.isSeriesVisible('Two')).toBeTruthy();
  });

  it('respects the initial state of toggled annotations', () => {
    const { result } = renderHook(() =>
      useToggleableSeries(
        buildChart({
          series: [],
          annotations: [
            buildAnnotation({ name: 'Alpha', hidden: true }),
            buildAnnotation({ name: 'Bravo' }),
          ],
        })
      )
    );

    expect(result.current.data.annotations[0].hidden).toBeTruthy();
    expect(result.current.data.annotations[1].hidden).toBeFalsy();

    expect(result.current.isSeriesVisible('Alpha')).toBeFalsy();
    expect(result.current.isSeriesVisible('Bravo')).toBeTruthy();
  });
});
