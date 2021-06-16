import React from 'react';
import { Story, Meta } from '@storybook/react';

import Slider from '.';

export default {
  title: 'Play/Slider',
  component: Slider,
} as Meta;

const Template: Story<React.ComponentProps<typeof Slider>> = (props) => <Slider {...props} />;

export const Default = Template.bind({});
Default.args = {
  defaultValue: 50,
  description: `
    Hello, world!

    Slider descriptions are Markdown, and will be converted to HTML using
    [remark](https://remark.js.org/).
  `,
  max: 100,
  min: 0,
  name: 'My first slider',
  step: 1,
};
