import { calculateExtent } from '.';
import { buildAnnotation, buildChart, buildSeries } from './testHelpers';

describe('calculateExtent', () => {
  it('calculates the extent given two unstacked series', () => {
    const [min, max] = calculateExtent(
      buildChart({ series: [buildSeries({ value: [10] }), buildSeries({ value: [20] })] })
    );

    expect(min).toEqual(0);
    expect(max).toEqual(20);
  });

  it('calculates the extent given two unstacked series with multiple y values', () => {
    const [min, max] = calculateExtent(
      buildChart({ series: [buildSeries({ value: [10, 10] }), buildSeries({ value: [20, 30] })] })
    );

    expect(min).toEqual(0);
    expect(max).toEqual(30);
  });

  it('calculates the extent given two unstacked series, one negative', () => {
    const [min, max] = calculateExtent(
      buildChart({ series: [buildSeries({ value: [-10] }), buildSeries({ value: [20] })] })
    );

    expect(min).toEqual(-10);
    expect(max).toEqual(20);
  });

  it('calculates the extent given two stacked series', () => {
    const [min, max] = calculateExtent(
      buildChart({
        series: [
          buildSeries({ value: [10], stack: true }),
          buildSeries({ value: [20], stack: true }),
        ],
      })
    );

    expect(min).toEqual(0);
    expect(max).toEqual(30);
  });

  it('calculates the extent given two stacked series with multiple y values', () => {
    const [min, max] = calculateExtent(
      buildChart({
        series: [
          buildSeries({ value: [10, 5], stack: true }),
          buildSeries({ value: [20, 50], stack: true }),
        ],
      })
    );

    expect(min).toEqual(0);
    expect(max).toEqual(55);
  });

  it('calculates the extent given two stacked series one of which is negative', () => {
    const [min, max] = calculateExtent(
      buildChart({
        series: [
          buildSeries({ value: [-10], stack: true }),
          buildSeries({ value: [20], stack: true }),
        ],
      })
    );

    expect(min).toEqual(-10);
    expect(max).toEqual(20);
  });

  it(
    'calculates the extent given two stacked series one of which is negative with ' +
      'multiple y-values',
    () => {
      const [min, max] = calculateExtent(
        buildChart({
          series: [
            buildSeries({ value: [-10, 5], stack: true }),
            buildSeries({ value: [20, -20], stack: true }),
          ],
        })
      );

      expect(min).toEqual(-20);
      expect(max).toEqual(20);
    }
  );

  it('calculates the extent given multiple named-stacked series', () => {
    const [min, max] = calculateExtent(
      buildChart({
        series: [
          buildSeries({ value: [10], stack: 'a' }),
          buildSeries({ value: [20], stack: 'a' }),
          buildSeries({ value: [20], stack: 'b' }),
        ],
      })
    );

    expect(min).toEqual(0);
    expect(max).toEqual(30);
  });

  it('calculates the extent ignoring hidden series', () => {
    const [min, max] = calculateExtent(
      buildChart({
        series: [buildSeries({ value: [10] }), buildSeries({ value: [20], hidden: true })],
      })
    );

    expect(min).toEqual(0);
    expect(max).toEqual(10);
  });

  it('calculates the extent ignoring hidden stacked series', () => {
    const [min, max] = calculateExtent(
      buildChart({
        series: [
          buildSeries({ value: [10], stack: 'a' }),
          buildSeries({ value: [20], stack: 'a', hidden: true }),
          buildSeries({ value: [15], stack: 'b' }),
        ],
      })
    );

    expect(min).toEqual(0);
    expect(max).toEqual(15);
  });

  describe('with annotations', () => {
    it('includes positive annotations', () => {
      const [min, max] = calculateExtent(
        buildChart({
          series: [buildSeries({ value: [10] })],
          annotations: [buildAnnotation({ value: 50 })],
        })
      );

      expect(min).toEqual(0);
      expect(max).toEqual(50);
    });

    it('includes negative annotations', () => {
      const [min, max] = calculateExtent(
        buildChart({
          series: [buildSeries({ value: [10] })],
          annotations: [buildAnnotation({ value: -50 })],
        })
      );

      expect(min).toEqual(-50);
      expect(max).toEqual(10);
    });

    it('ignores hidden annotations', () => {
      const [min, max] = calculateExtent(
        buildChart({
          series: [buildSeries({ value: [10] })],
          annotations: [buildAnnotation({ value: 50, hidden: true })],
        })
      );

      expect(min).toEqual(0);
      expect(max).toEqual(10);
    });
  });
});
