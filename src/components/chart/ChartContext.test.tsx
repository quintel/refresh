import { render, screen } from '@testing-library/react';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';

import ChartContext, { useChartContext } from './ChartContext';
import { buildChart } from './helpers/testHelpers';

type ValueType = React.ComponentProps<typeof ChartContext.Provider>['value'];

/**
 * Creates a fake context value. You may provide any custom properties to be included.
 */
function createContextValue(values: Partial<ValueType>): ValueType {
  return {
    colorScale: scaleOrdinal(),
    data: buildChart(),
    fixateSeries: () => false,
    height: 10,
    isSeriesDimmed: () => false,
    isSeriesFixated: () => false,
    isSeriesVisible: () => false,
    width: 10,
    xScale: scaleBand(),
    yScale: scaleLinear(),
    ...values,
  };
}

/**
 * A simple component which renders some values from the chart context.
 */
function UsesChartContext() {
  const { height, width } = useChartContext();

  return (
    <output>
      {height}x{width}
    </output>
  );
}

describe('useChartContext', () => {
  it('provides values from the chart context', () => {
    render(
      <ChartContext.Provider value={createContextValue({ height: 10, width: 20 })}>
        <UsesChartContext />
      </ChartContext.Provider>
    );

    expect(screen.getByText('10x20')).toBeInTheDocument();
  });
});
