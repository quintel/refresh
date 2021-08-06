import React from 'react';
import { Story, Meta } from '@storybook/react';
import { scaleBand, scaleLinear } from '@visx/scale';

import { Areas, ChartChrome, ParentSizeConditional } from './';

import { color } from '@/styles/theme';

const xScale = scaleBand<string>({ paddingInner: 1, paddingOuter: 0, round: true });
const yScale = scaleLinear<number>({ round: true });

export default {
  title: 'Charts/Areas',
  component: Areas,
} as Meta;

const Template: Story<React.ComponentProps<typeof ChartChrome>> = (props) => (
  <ParentSizeConditional debounceTime={10} parentSizeStyles={{ height: 400 }}>
    {({ height, width }) => (
      <ChartChrome {...props} height={height - 50} width={width}>
        <Areas />
      </ChartChrome>
    )}
  </ParentSizeConditional>
);

export const Default = Template.bind({});
Default.args = {
  height: 300,
  width: 500,
  xScale: xScale,
  yScale: yScale,
  data: {
    series: [
      {
        name: 'First series',
        color: color.primary(),
        value: [10, 20],
        stack: true,
        type: 'area',
      },
      {
        name: 'Second series',
        color: color.success(),
        value: [10, 10],
        stack: true,
        type: 'area',
      },
    ],
    xAxis: { data: ['One', 'Two'] },
  },
};

export const HiddenSeries = Template.bind({});
HiddenSeries.args = {
  height: 300,
  width: 500,
  xScale: xScale,
  yScale: yScale,
  data: {
    series: [
      {
        name: 'First series',
        color: color.primary(),
        value: [10, 20],
        stack: true,
        type: 'area',
      },
      {
        name: 'Second series',
        color: color.success(),
        value: [10, 10],
        stack: true,
        hidden: true,
        type: 'area',
      },
    ],
    xAxis: { data: ['One', 'Two'] },
  },
};

export const StackedLines = Template.bind({});
StackedLines.args = {
  height: 300,
  width: 500,
  xScale: xScale,
  yScale: yScale,
  data: {
    series: [
      {
        name: 'First series',
        color: color.primary(),
        value: [10, 20],
        stack: true,
        type: 'line',
      },
      {
        name: 'Second series',
        color: color.success(),
        value: [10, 10],
        stack: true,
        type: 'line',
      },
    ],
    xAxis: { data: ['One', 'Two'] },
  },
};
