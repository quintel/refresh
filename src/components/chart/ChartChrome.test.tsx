import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { scaleBand, scaleLinear } from '@visx/scale';

import { ChartChrome } from '.';
import { buildAnnotation, buildChart, buildSeries } from './helpers/testHelpers';

function findAxisTick(
  container: HTMLElement,
  selector: string,
  content: { toString: () => string }
) {
  const axis = container.querySelector(selector);

  if (axis) {
    return [...axis.querySelectorAll('tspan')].find((el) => el.textContent === content.toString());
  }

  return;
}

describe('ChartChrome', () => {
  describe('with a Band x-axis and Linear y-axis', () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = render(
        <ChartChrome
          data={buildChart({
            series: [
              buildSeries({ name: 'One', value: [5, 10] }),
              buildSeries({ name: 'Two', value: [5, 50] }),
            ],
            xAxis: { data: ['Present', 'Future'] },
          })}
          height={200}
          width={300}
          xScale={scaleBand()}
          yScale={scaleLinear()}
        />
      ).container;
    });

    it('renders the y-axis', () => {
      expect(findAxisTick(container, '.visx-axis-left', 0)).toBeInTheDocument();
      expect(findAxisTick(container, '.visx-axis-left', 50)).toBeInTheDocument();
    });

    it('renders the x-axis', () => {
      expect(findAxisTick(container, '.visx-axis-bottom', 'Present')).toBeInTheDocument();
      expect(findAxisTick(container, '.visx-axis-bottom', 'Future')).toBeInTheDocument();
    });

    it('allows toggling a series', () => {
      userEvent.click(screen.getByRole('button', { name: 'Two' }));

      expect(findAxisTick(container, '.visx-axis-left', 50)).toBeUndefined();
      expect(findAxisTick(container, '.visx-axis-left', 10)).toBeInTheDocument();
    });
  });

  describe('with a target bar annotation', () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = render(
        <ChartChrome
          data={buildChart({
            annotations: [
              buildAnnotation({
                name: 'My annotation',
                value: 50,
              }),
            ],
            series: [buildSeries({ name: 'My series', value: [10] })],
            xAxis: { data: ['Present', 'Future'] },
          })}
          height={200}
          width={300}
          xScale={scaleBand()}
          yScale={scaleLinear()}
        />
      ).container;
    });

    it('renders the y-axis accordingly', () => {
      expect(findAxisTick(container, '.visx-axis-left', 50)).toBeInTheDocument();
    });

    it('allows toggling the target bar', () => {
      userEvent.click(screen.getByRole('button', { name: 'My annotation' }));

      expect(findAxisTick(container, '.visx-axis-left', 50)).toBeUndefined();
      expect(findAxisTick(container, '.visx-axis-left', 10)).toBeInTheDocument();
    });
  });
});
