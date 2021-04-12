import React from 'react';
import { Story, Meta } from '@storybook/react';

import Sidebar from '.';

export default {
  title: 'Play/Sidebar',
  component: Sidebar,
} as Meta;

const Template: Story<React.ComponentProps<typeof Sidebar>> = (props) => <Sidebar {...props} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      key: 'overview',
      items: [{ key: 'introduction' }],
    },
    {
      key: 'flexibility',
      items: [
        { key: 'overview' },
        { key: 'excess-electricity', items: [{ key: 'storage' }, { key: 'conversion' }] },
        { key: 'net-load' },
      ],
    },
    { key: 'costs', items: [{ key: 'merit-order' }] },
  ],
};

export const WithBars = Template.bind({});
WithBars.args = {
  items: [
    {
      key: 'overview',
      items: [{ key: 'introduction' }],
    },
    {
      key: 'demand',
      items: [
        {
          key: 'households',
          bar: { title: 'Percentage of households in total demand', width: 15, value: '15%' },
        },
        {
          key: 'buildings',
          bar: { title: 'Percentage of buildings in total demand', width: 9, value: '9%' },
        },
        {
          key: 'transport',
          bar: { title: 'Percentage of transport in total demand', width: 17, value: '17%' },
          items: [{ key: 'passengers' }],
        },
        {
          key: 'industry',
          bar: { title: 'Percentage of industry in total demand', width: 53, value: '53%' },
        },
        {
          key: 'other',
          bar: { title: 'Percentage of other in total demand', width: 0, value: '0%' },
        },
      ],
    },
    {
      key: 'supply',
      items: [{ key: 'electricity' }, { key: 'an item with a long name which will wrap ' }],
    },
  ],
  defaultActivePath: ['demand', 'households'],
};
