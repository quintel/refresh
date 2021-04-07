import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Disclosure, DisclosureButton, DisclosurePanel } from '.';

export default {
  title: 'Example/Disclosure',
  component: Disclosure,
} as Meta;

export const Default: Story<React.ComponentProps<typeof Disclosure>> = () => {
  return (
    <Disclosure>
      <DisclosureButton>Toggle panel</DisclosureButton>
      <DisclosurePanel>Contents</DisclosurePanel>
    </Disclosure>
  );
};

export const ControlledOpen: Story<React.ComponentProps<typeof Disclosure>> = () => {
  return (
    <Disclosure open={true}>
      <DisclosureButton>Toggle panel</DisclosureButton>
      <DisclosurePanel>Contents</DisclosurePanel>
    </Disclosure>
  );
};
