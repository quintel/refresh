import React from 'react';
import { Story, Meta } from '@storybook/react';
import { scaleBand, scaleLinear } from '@visx/scale';

import { Bars, ChartChrome, ParentSizeConditional } from './';

import { color } from '@/styles/theme';

const xScale = scaleBand<string>({ round: true }).padding(0.3);
const yScale = scaleLinear<number>({ round: true });

export default {
  title: 'Charts/Bars',
  component: Bars,
} as Meta;

const Template: Story<React.ComponentProps<typeof ChartChrome>> = (props) => (
  <ParentSizeConditional debounceTime={10} parentSizeStyles={{ height: 400 }}>
    {({ height, width }) => (
      <ChartChrome {...props} height={height - 50} width={width}>
        <Bars />
      </ChartChrome>
    )}
  </ParentSizeConditional>
);

export const Default = Template.bind({});
Default.args = {
  grid: false,
  height: 300,
  width: 500,
  xScale: xScale,
  yScale: yScale,
  data: {
    series: [
      {
        name: 'First series',
        color: color.primary(),
        value: [0, 10],
        stack: true,
      },
      {
        name: 'Second series',
        color: color.success(),
        value: [5, 5],
        stack: true,
      },
    ],
    xAxis: { data: ['One', 'Two'] },
  },
};