import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '.';

export default {
  title: 'Example/Accordion',
  component: Accordion,
} as Meta;

export const Default: Story<React.ComponentProps<typeof Accordion>> = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionButton>Toggle panel</AccordionButton>
        <AccordionPanel>Contents</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Toggle panel</AccordionButton>
        <AccordionPanel>Contents</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export const DefaultIndex: Story<React.ComponentProps<typeof Accordion>> = () => {
  return (
    <Accordion defaultIndex={1}>
      <AccordionItem>
        <AccordionButton>Toggle panel</AccordionButton>
        <AccordionPanel>Contents</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Toggle panel</AccordionButton>
        <AccordionPanel>Contents</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
