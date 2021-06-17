import React from 'react';
import { Story, Meta } from '@storybook/react';

import Slider from '.';

export default {
  title: 'Play/Slider',
  component: Slider,
} as Meta;

function outdent(text: string): string {
  const indent = text.match(/^\n?( )/)?.[1];

  if (!indent?.length) {
    return text;
  }

  return text.trim().replace(new RegExp(`^ {${indent.length}}`, 'gm'), '');
}

const Template: Story<React.ComponentProps<typeof Slider>> = (props) => <Slider {...props} />;

export const Default = Template.bind({});
Default.args = {
  defaultValue: 50,
  description: outdent(`
    Hello, world!

    Slider descriptions are Markdown, and will be converted to HTML using
    [remark](https://remark.js.org/).

    Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone
    mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper
    chantey doubloon starboard grog black jack gangway rutters.

    Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike
    colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to
    go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm
    spyglass sheet transom heave to.
  `),
  max: 100,
  min: 0,
  name: 'My first slider',
  step: 1,
};

export const NoDescription = Template.bind({});
NoDescription.args = {
  defaultValue: 50,
  max: 100,
  min: 0,
  name: 'Has no description',
  step: 1,
};
