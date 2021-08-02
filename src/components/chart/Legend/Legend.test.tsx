import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Legend, { legendItemPropsFromConfig } from '.';
import type { LegendItemProps } from './Legend';
import { buildAnnotation, buildChart, buildSeries } from '../helpers/testHelpers';

const stubItems = [
  { name: 'One', color: 'blue' },
  { name: 'Two', color: 'green' },
];

describe('Legends', () => {
  it('renders each legend item as a span', () => {
    render(<Legend items={stubItems} />);

    expect(screen.queryByRole('button', { name: 'One' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Two' })).not.toBeInTheDocument();
  });

  it('assigns the colors to each item', () => {
    render(<Legend items={stubItems} />);

    expect(screen.getByText('One').style.getPropertyValue('--series-color')).toEqual('blue');
    expect(screen.getByText('Two').style.getPropertyValue('--series-color')).toEqual('green');
  });
});

describe('Legend with events', () => {
  it('renders legend items as button', () => {
    render(
      <Legend
        items={stubItems}
        onItemClick={() => false}
        onItemMouseOut={() => false}
        onItemMouseOver={() => false}
      />
    );

    expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Two' })).toBeInTheDocument();
  });

  it('assigns the colors to each item', () => {
    render(
      <Legend
        items={stubItems}
        onItemClick={() => false}
        onItemMouseOut={() => false}
        onItemMouseOver={() => false}
      />
    );

    expect(screen.getByText('One').style.getPropertyValue('--series-color')).toEqual('blue');
    expect(screen.getByText('Two').style.getPropertyValue('--series-color')).toEqual('green');
  });

  it('fires onClick events for items', () => {
    const onItemClick = jest.fn();

    render(
      <Legend
        items={stubItems}
        onItemClick={onItemClick}
        onItemMouseOut={() => false}
        onItemMouseOver={() => false}
      />
    );

    userEvent.click(screen.getByRole('button', { name: 'One' }));

    expect(onItemClick.mock.calls.length).toBe(1);
    expect(onItemClick.mock.calls[0][0]).toEqual('One');
  });

  it('fires onMouseOver events for items', () => {
    const onItemMouseOver = jest.fn();

    render(
      <Legend
        items={stubItems}
        onItemClick={() => false}
        onItemMouseOut={() => false}
        onItemMouseOver={onItemMouseOver}
      />
    );

    userEvent.hover(screen.getByRole('button', { name: 'One' }));

    userEvent.tab(); // focuses "One"
    userEvent.tab(); // focuses "Two"

    expect(onItemMouseOver.mock.calls.length).toBe(3);
    expect(onItemMouseOver.mock.calls[0][0]).toEqual('One');
    expect(onItemMouseOver.mock.calls[1][0]).toEqual('One');
    expect(onItemMouseOver.mock.calls[2][0]).toEqual('Two');
  });

  it('fires onMouseOut events for items', () => {
    const onItemMouseOut = jest.fn();

    render(
      <Legend
        items={stubItems}
        onItemClick={() => false}
        onItemMouseOut={onItemMouseOut}
        onItemMouseOver={() => false}
      />
    );

    userEvent.hover(screen.getByRole('button', { name: 'One' }));
    expect(onItemMouseOut.mock.calls.length).toBe(0);

    userEvent.unhover(screen.getByRole('button', { name: 'One' }));
    expect(onItemMouseOut.mock.calls.length).toBe(1);
    expect(onItemMouseOut.mock.calls[0][0]).toEqual('One');

    userEvent.tab(); // focuses "One"
    userEvent.tab(); // focuses "Two", blurs "One"

    expect(onItemMouseOut.mock.calls.length).toBe(2);
    expect(onItemMouseOut.mock.calls[1][0]).toEqual('One');

    userEvent.tab(); // blurs "Two"

    expect(onItemMouseOut.mock.calls.length).toBe(3);
    expect(onItemMouseOut.mock.calls[2][0]).toEqual('Two');
  });
});

describe('legendItemPropsFromConfig', () => {
  describe('with a visible series', () => {
    let props: LegendItemProps[] = [];

    beforeAll(() => {
      props = legendItemPropsFromConfig(
        buildChart({
          series: [buildSeries({ name: 'Hello', color: 'red' })],
        })
      );
    });

    it('returns a single legend item', () => {
      expect(props.length).toEqual(1);
    });

    it('sets the legend item attributes', () => {
      const prop = props[0];

      expect(prop.name).toEqual('Hello');
      expect(prop.color).toEqual('red');
      expect(prop.hidden).toBeFalsy();
      expect(prop.style).toEqual('box');
    });
  });

  describe('with hidden visible series', () => {
    let props: LegendItemProps[] = [];

    beforeAll(() => {
      props = legendItemPropsFromConfig(
        buildChart({
          series: [buildSeries({ name: 'Hello', color: 'red', hidden: true })],
        })
      );
    });

    it('returns a single legend item', () => {
      expect(props.length).toEqual(1);
    });

    it('sets the legend item attributes', () => {
      const prop = props[0];

      expect(prop.name).toEqual('Hello');
      expect(prop.color).toEqual('red');
      expect(prop.hidden).toBeTruthy();
      expect(prop.style).toEqual('box');
    });
  });

  describe('with a visible series', () => {
    let props: LegendItemProps[] = [];

    beforeAll(() => {
      props = legendItemPropsFromConfig(
        buildChart({
          series: [],
          annotations: [buildAnnotation({ name: 'Goodbye', color: 'blue' })],
        })
      );
    });

    it('returns a single legend item', () => {
      expect(props.length).toEqual(1);
    });

    it('sets the legend item attributes', () => {
      const prop = props[0];

      expect(prop.name).toEqual('Goodbye');
      expect(prop.color).toEqual('blue');
      expect(prop.hidden).toBeFalsy();
      expect(prop.style).toEqual('line');
    });
  });

  describe('with hidden visible series', () => {
    let props: LegendItemProps[] = [];

    beforeAll(() => {
      props = legendItemPropsFromConfig(
        buildChart({
          series: [],
          annotations: [buildAnnotation({ name: 'Goodbye', color: 'blue', hidden: true })],
        })
      );
    });

    it('returns a single legend item', () => {
      expect(props.length).toEqual(1);
    });

    it('sets the legend item attributes', () => {
      const prop = props[0];

      expect(prop.name).toEqual('Goodbye');
      expect(prop.color).toEqual('blue');
      expect(prop.hidden).toBeTruthy();
      expect(prop.style).toEqual('line');
    });
  });
});
