import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Areas from './Areas';
import { buildChart, buildSeries, TestChartContainer } from './helpers/testHelpers';

describe('Areas', () => {
  describe('when rendering series as areas', () => {
    it('renders the series as areas with lines', () => {
      render(
        <TestChartContainer
          value={{
            data: buildChart({
              series: [
                buildSeries({ name: 'series1', stack: true, type: 'area', value: [5, 10] }),
                buildSeries({ name: 'series2', stack: true, type: 'area', value: [10, 5] }),
              ],
              xAxis: { data: ['Present', 'Future'] },
            }),
          }}
        >
          <Areas />
        </TestChartContainer>
      );

      // Areas
      expect(screen.getByTestId('area-series1')).toBeInTheDocument();
      expect(screen.getByTestId('area-series2')).toBeInTheDocument();

      // Lines
      expect(screen.getByTestId('line-series1')).toBeInTheDocument();
      expect(screen.getByTestId('line-series2')).toBeInTheDocument();
    });

    it('permits fixating a series', () => {
      const fixateSeries = jest.fn();

      render(
        <TestChartContainer
          value={{
            data: buildChart({
              series: [
                buildSeries({ name: 'series1', stack: true, type: 'area', value: [5, 10] }),
                buildSeries({ name: 'series2', stack: true, type: 'area', value: [10, 5] }),
              ],
              xAxis: { data: ['Present', 'Future'] },
            }),
            fixateSeries,
          }}
        >
          <Areas />
        </TestChartContainer>
      );

      const series1 = screen.getByTestId('area-series1');
      const series2 = screen.getByTestId('area-series2');

      userEvent.hover(series1);
      userEvent.unhover(series1);
      userEvent.hover(series2);
      userEvent.hover(series1);

      expect(fixateSeries.mock.calls).toEqual([['series1'], [], ['series2'], ['series1']]);
    });

    it('permits hiding a series', () => {
      //eslint-disable-next-line unicorn/consistent-function-scoping
      const isSeriesVisible = (key: string) => key === 'series1';

      render(
        <TestChartContainer
          value={{
            data: buildChart({
              series: [
                buildSeries({ name: 'series1', stack: true, type: 'area', value: [5, 10] }),
                buildSeries({ name: 'series2', stack: true, type: 'area', value: [10, 5] }),
              ],
              xAxis: { data: ['Present', 'Future'] },
            }),
            isSeriesVisible,
          }}
        >
          <Areas />
        </TestChartContainer>
      );

      // Areas
      expect(screen.getByTestId('area-series1')).toHaveAttribute('opacity', '0.8');
      expect(screen.getByTestId('area-series2')).toHaveAttribute('opacity', '0');

      // Lines
      expect(screen.getByTestId('line-series1')).toHaveAttribute('opacity', '1');
      expect(screen.getByTestId('line-series2')).toHaveAttribute('opacity', '0');
    });
  });

  it('renders series as lines', () => {
    render(
      <TestChartContainer
        value={{
          data: buildChart({
            series: [
              buildSeries({ name: 'series1', stack: true, type: 'line', value: [5, 10] }),
              buildSeries({ name: 'series2', stack: true, type: 'line', value: [10, 5] }),
            ],
            xAxis: { data: ['Present', 'Future'] },
          }),
        }}
      >
        <Areas />
      </TestChartContainer>
    );

    // Areas
    expect(screen.queryByTestId('area-series1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('area-series2')).not.toBeInTheDocument();

    // Lines
    expect(screen.getByTestId('line-series1')).toBeInTheDocument();
    expect(screen.getByTestId('line-series2')).toBeInTheDocument();
  });
});
