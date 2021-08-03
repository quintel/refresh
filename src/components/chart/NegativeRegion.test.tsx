import { render } from '@testing-library/react';
import { scaleLinear } from '@visx/scale';
import React from 'react';

import { NegativeRegion } from '.';

function createScale(lower: number, upper: number) {
  return scaleLinear<number>().range([200, 0]).domain([lower, upper]);
}

function renderRegion(scale: React.ComponentProps<typeof NegativeRegion>['yScale']) {
  return render(
    <svg>
      <NegativeRegion yScale={scale} width={400} />
    </svg>
  ).container.querySelector('rect');
}

describe('NegativeRegion with a chart of 400x200', () => {
  it('renders a zero-height region when the scale values are 0 to 10', () => {
    const region = renderRegion(createScale(0, 10));

    expect(region).toBeInTheDocument();

    if (region) {
      expect(region).toHaveStyle({
        height: '0px',
        width: '400px',
      });

      expect(region.style.transform).toContain('translateY(200px)');
    }
  });

  it('renders a zero-height region when the scale values are 10 to 20', () => {
    const region = renderRegion(createScale(10, 20));

    expect(region).toBeInTheDocument();

    if (region) {
      expect(region).toHaveStyle({
        height: '0px',
        width: '400px',
      });

      expect(region.style.transform).toContain('translateY(200px)');
    }
  });

  it('renders a 50% height region when the scale values are -10 to 10', () => {
    const region = renderRegion(createScale(-10, 10));

    expect(region).toBeInTheDocument();

    if (region) {
      expect(region).toHaveStyle({
        height: '100px',
        width: '400px',
      });

      expect(region.style.transform).toContain('translateY(100px)');
    }
  });

  it('renders a 100% height region when the scale values are -10 to 0', () => {
    const region = renderRegion(createScale(-10, 0));

    expect(region).toBeInTheDocument();

    if (region) {
      expect(region).toHaveStyle({
        height: '200px',
        transform: 'none',
        width: '400px',
      });
    }
  });

  it('renders a 100% height region when the scale values are -20 to -10', () => {
    const region = renderRegion(createScale(-20, -10));

    expect(region).toBeInTheDocument();

    if (region) {
      expect(region).toHaveStyle({
        height: '200px',
        transform: 'none',
        width: '400px',
      });
    }
  });
});
