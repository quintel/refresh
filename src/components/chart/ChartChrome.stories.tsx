import React from 'react';
import { Story, Meta } from '@storybook/react';
import { scaleBand, scaleLinear } from '@visx/scale';

import { ChartChrome, ParentSizeConditional } from './';

const xScale = scaleBand<string>({ round: true });
const yScale = scaleLinear<number>({ round: true });

export default {
  title: 'Charts/ChartChrome',
  component: ChartChrome,
} as Meta;

const Template: Story<React.ComponentProps<typeof ChartChrome>> = (props) => (
  <ParentSizeConditional debounceTime={10} parentSizeStyles={{ height: 400 }}>
    {({ height, width }) => <ChartChrome {...props} height={height - 50} width={width} />}
  </ParentSizeConditional>
);

export const Default = Template.bind({});
Default.args = {
  children: [],
  height: 300,
  width: 500,
  xScale: xScale,
  yScale: yScale,
  data: {
    series: [
      {
        name: 'First series',
        color: 'blue',
        value: [0, 10],
      },
    ],
    xAxis: { data: ['One', 'Two'] },
  },
};

export const WithNegatives = Template.bind({});
WithNegatives.args = {
  children: [],
  height: 300,
  width: 500,
  xScale: xScale,
  yScale: yScale,
  data: {
    series: [
      {
        name: 'First series',
        color: 'blue',
        value: [-5, 10],
      },
    ],
    xAxis: { data: ['One', 'Two'] },
  },
};
