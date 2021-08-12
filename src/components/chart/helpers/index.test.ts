import { chartDimensions, tableizeData, tickCount } from '.';
import { buildChart, buildSeries } from './testHelpers';

describe('chartDimensions', () => {
  describe('with no margins given', () => {
    it('sets the default left margin', () => {
      expect(chartDimensions({ height: 100, width: 200 }).marginLeft).toEqual(30);
    });

    it('sets the default right margin to 0', () => {
      expect(chartDimensions({ height: 100, width: 200 }).marginRight).toEqual(0);
    });

    it('sets the default bottom margin', () => {
      expect(chartDimensions({ height: 100, width: 200 }).marginBottom).toEqual(30);
    });

    it('sets the default top margin to 10', () => {
      expect(chartDimensions({ height: 100, width: 200 }).marginTop).toEqual(10);
    });

    it('calculates a boundedWidth based on the default margins', () => {
      expect(chartDimensions({ height: 100, width: 200 }).boundedWidth).toEqual(170);
    });

    it('calculates a boundedHeight based on the default margins', () => {
      expect(chartDimensions({ height: 100, width: 200 }).boundedHeight).toEqual(60);
    });

    it('returns the original width', () => {
      expect(chartDimensions({ height: 100, width: 200 }).width).toEqual(200);
    });

    it('returns the original height', () => {
      expect(chartDimensions({ height: 100, width: 200 }).height).toEqual(100);
    });
  });

  describe('with a top margin of 20', () => {
    it('sets the top margin to 20', () => {
      expect(chartDimensions({ height: 100, width: 200, marginTop: 20 }).marginTop).toEqual(20);
    });

    it('sets the boundedHeight to account for the top margin', () => {
      expect(chartDimensions({ height: 100, width: 200, marginTop: 20 }).boundedHeight).toEqual(50);
    });
  });

  describe('with a right margin of 20', () => {
    it('sets the right margin to 20', () => {
      expect(chartDimensions({ height: 100, width: 200, marginRight: 20 }).marginRight).toEqual(20);
    });

    it('sets the boundedWidth to account for the top margin', () => {
      expect(chartDimensions({ height: 100, width: 200, marginRight: 20 }).boundedWidth).toEqual(
        150
      );
    });
  });

  describe('when the margins exceed the available space', () => {
    it('returns a boundedHeight of 0', () => {
      expect(
        chartDimensions({ height: 0, marginTop: 10, marginBottom: 10, width: 100 }).boundedHeight
      ).toEqual(0);
    });

    it('returns a boundedWidth of 0', () => {
      expect(
        chartDimensions({ height: 100, marginLeft: 10, marginRight: 10, width: 0 }).boundedWidth
      ).toEqual(0);
    });
  });
});

describe('tableizeData', () => {
  it('returns an empty table when given no data', () => {
    const table = tableizeData(buildChart({ series: [], xAxis: undefined }));
    expect(table.length).toEqual(0);
  });

  it('returns a table when given data without a custom axis', () => {
    const table = tableizeData(
      buildChart({
        series: [
          buildSeries({ name: 'One', value: [1, 10] }),
          buildSeries({ name: 'Two', value: [2, 20] }),
          buildSeries({ name: 'Three', value: [3, 30] }),
        ],
      })
    );

    expect(table).toEqual([
      { x: 0, values: { One: 1, Two: 2, Three: 3 } },
      { x: 1, values: { One: 10, Two: 20, Three: 30 } },
    ]);
  });

  it('returns a table with only the selected keys', () => {
    const table = tableizeData(
      buildChart({
        series: [
          buildSeries({ name: 'One', value: [1, 10] }),
          buildSeries({ name: 'Two', value: [2, 20] }),
          buildSeries({ name: 'Three', value: [3, 30] }),
        ],
      }),
      ['One', 'Three']
    );

    expect(table).toEqual([
      { x: 0, values: { One: 1, Three: 3 } },
      { x: 1, values: { One: 10, Three: 30 } },
    ]);
  });

  it('throws an error when given irregular length data', () => {
    expect(() => {
      tableizeData(
        buildChart({
          series: [
            buildSeries({ name: 'One', value: [1, 10] }),
            buildSeries({ name: 'Two', value: [2] }),
            buildSeries({ name: 'Three', value: [3, 30, 300, 3000] }),
          ],
        })
      );
    }).toThrowError(/got 1, expected 2/);
  });

  it('returns a table when given data with a custom axis', () => {
    const table = tableizeData(
      buildChart({
        series: [
          buildSeries({ name: 'One', value: [1, 10] }),
          buildSeries({ name: 'Two', value: [2, 20] }),
          buildSeries({ name: 'Three', value: [3, 30] }),
        ],
        xAxis: { data: ['Present', 'Future'] },
      })
    );

    expect(table).toEqual([
      { x: 'Present', values: { One: 1, Two: 2, Three: 3 } },
      { x: 'Future', values: { One: 10, Two: 20, Three: 30 } },
    ]);
  });

  it('throws an error when given data with a custom axis which is too long', () => {
    expect(() => {
      tableizeData(
        buildChart({
          series: [
            buildSeries({ name: 'One', value: [1, 10] }),
            buildSeries({ name: 'Two', value: [2, 20] }),
            buildSeries({ name: 'Three', value: [3, 30] }),
          ],
          xAxis: { data: ['Present', 'Future', 'Far future'] },
        })
      );
    }).toThrowError(/got 2, expected 3/);
  });

  it('throws an error when given data with a custom axis which is too short', () => {
    expect(() => {
      tableizeData(
        buildChart({
          series: [
            buildSeries({ name: 'One', value: [1, 10] }),
            buildSeries({ name: 'Two', value: [2, 20] }),
            buildSeries({ name: 'Three', value: [3, 30] }),
          ],
          xAxis: { data: ['Present'] },
        })
      );
    }).toThrowError(/got 2, expected 1/);
  });
});

describe('tickCount', () => {
  describe('when given no pixels per-tick', () => {
    it('returns 2 given a width of 0', () => {
      expect(tickCount(0)).toEqual(2);
    });

    it('returns 7 given a width of 300', () => {
      expect(tickCount(300)).toEqual(7);
    });

    it('returns 10 given a width of 400', () => {
      expect(tickCount(400)).toEqual(10);
    });
  });

  describe('when given 10 pixels per-tick', () => {
    it('returns 2 given a width of 0', () => {
      expect(tickCount(0)).toEqual(2);
    });

    it('returns 2 given a width of 10', () => {
      expect(tickCount(10, 10)).toEqual(2);
    });

    it('returns 10 given a width of 105', () => {
      expect(tickCount(100, 10)).toEqual(10);
    });
  });
});
