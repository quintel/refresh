import React from 'react';
import { Story, Meta } from '@storybook/react';

import Legend from './';

export default {
  title: 'Example/Legend',
  component: Legend,
} as Meta;

const Template: Story<React.ComponentProps<typeof Legend>> = (props) => <Legend {...props} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    { name: 'One', color: 'blue' },
    { name: 'Two', color: 'red' },
    { name: 'Three', color: 'green' },
  ],
};

export const NonInteractive = Template.bind({});
NonInteractive.args = {
  items: [
    { name: 'One', color: 'blue' },
    { name: 'Two', color: 'red' },
    { name: 'Three', color: 'green' },
  ],
  onItemClick: undefined,
  onItemMouseOut: undefined,
  onItemMouseOver: undefined,
};

export const ItemStyles = Template.bind({});
ItemStyles.args = {
  items: [
    { name: 'style=line', color: 'blue', style: 'line' },
    { name: 'style=box', color: 'red', style: 'box' },
  ],
};

export const HiddenItems = Template.bind({});
HiddenItems.args = {
  items: [
    { name: 'Hidden', color: 'blue', hidden: true },
    { name: 'Not hidden', color: 'red' },
  ],
  onItemClick: undefined,
  onItemMouseOut: undefined,
  onItemMouseOver: undefined,
};
