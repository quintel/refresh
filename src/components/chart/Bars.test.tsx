import { screen, render, prettyDOM } from '@testing-library/react';

import { scaleBand, scaleLinear } from '@visx/scale';

import { Bars, ChartChrome } from '.';
import { buildAnnotation, buildChart, buildSeries } from './helpers/testHelpers';

/**
 * Given a rendered bar, returns the y-position of the bar in the chart (the distance from the top
 * of the chart).
 */
function barYPos(bar: HTMLElement): number {
  if (bar.style.transform === 'none') {
    return 0;
  }

  const match = bar.style.transform.match(/translateY\((\d+(\.\d+)?)px\)/);

  if (!match) {
    throw new Error(`Could not parse y position from "${bar.style.transform}"`);
  }

  return Number(match[1]);
}

/**
 * Given a rendered bar, returns its height.
 */
function barHeight(bar: HTMLElement): number {
  return Number.parseFloat(bar.style.height);
}

describe('Bars', () => {
  describe('with two stacked series', () => {
    beforeEach(() => {
      render(
        <ChartChrome
          data={buildChart({
            series: [
              buildSeries({ name: 'series1', stack: true, value: [5, 10] }),
              buildSeries({ name: 'series2', stack: true, value: [10, 5] }),
            ],
            xAxis: { data: ['Present', 'Future'] },
          })}
          height={200}
          width={400}
          xScale={scaleBand()}
          yScale={scaleLinear()}
        >
          <Bars />
        </ChartChrome>
      );
    });

    it('renders each series', () => {
      // Present series.
      expect(screen.getByTestId('series1-0')).toBeInTheDocument();
      expect(screen.getByTestId('series2-0')).toBeInTheDocument();

      // Future series.
      expect(screen.getByTestId('series1-1')).toBeInTheDocument();
      expect(screen.getByTestId('series2-1')).toBeInTheDocument();
    });

    it('positions the bars for the first stack', () => {
      const one = screen.getByTestId('series1-0');
      const two = screen.getByTestId('series2-0');

      expect(barYPos(two)).toBeLessThan(barYPos(one));
      expect(barHeight(two)).toBeCloseTo(barHeight(one) * 2);
    });

    it('positions the bars for the second stack', () => {
      const one = screen.getByTestId('series1-1');
      const two = screen.getByTestId('series2-1');

      expect(barYPos(two)).toBeLessThan(barYPos(one));
      expect(barHeight(two)).toBeCloseTo(barHeight(one) / 2);
    });
  });

  describe('with two stacked series, one negative', () => {
    beforeEach(() => {
      render(
        <ChartChrome
          data={buildChart({
            series: [
              buildSeries({ name: 'series1', stack: true, value: [5, 10] }),
              buildSeries({ name: 'series2', stack: true, value: [10, -5] }),
            ],
            xAxis: { data: ['Present', 'Future'] },
          })}
          height={200}
          width={400}
          xScale={scaleBand()}
          yScale={scaleLinear()}
        >
          <Bars />
        </ChartChrome>
      );
    });

    it('renders each series', () => {
      // Present series.
      expect(screen.getByTestId('series1-0')).toBeInTheDocument();
      expect(screen.getByTestId('series2-0')).toBeInTheDocument();

      // Future series.
      expect(screen.getByTestId('series1-1')).toBeInTheDocument();
      expect(screen.getByTestId('series2-1')).toBeInTheDocument();
    });

    it('positions the bars for the first stack', () => {
      const one = screen.getByTestId('series1-0');
      const two = screen.getByTestId('series2-0');

      expect(barYPos(two)).toBeLessThan(barYPos(one));
      expect(barHeight(two)).toBeCloseTo(barHeight(one) * 2);
    });

    it('positions the bars for the second stack', () => {
      const one = screen.getByTestId('series1-1');
      const two = screen.getByTestId('series2-1');

      // The second bar is negative, and should therefore appear *below* the first bar.
      expect(barYPos(two)).toBeGreaterThan(barYPos(one));
      expect(barHeight(two)).toBeCloseTo(barHeight(one) / 2);
    });
  });
});
