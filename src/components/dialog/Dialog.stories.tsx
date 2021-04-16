import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Dialog, useDialog } from '.';

export default {
  title: 'Example/Dialog',
  component: Dialog,
} as Meta;

type StoryProps = Omit<
  React.ComponentProps<typeof Dialog>,
  'aria-label' | 'aria-labelledby' | 'as' | 'children' | 'theme'
>;

const Template: Story<StoryProps> = (props: StoryProps) => {
  const { isOpen, onOpen, onClose } = useDialog(props.isOpen);
  let content = <p>This is the content of the dialog.</p>;

  if (!props.isDismissable) {
    content = (
      <>
        <p>
          This dialog can only be dismissed by clicking the button. You may not click outside the
          box, nor is there a default close button.
        </p>
        <p>
          <button onClick={onClose}>Close dialog</button>
        </p>
      </>
    );
  }

  return (
    <>
      <button onClick={onOpen}>Open dialog</button>
      <Dialog {...props} aria-label="Example dialog" isOpen={isOpen} onClose={onClose}>
        {content}
      </Dialog>
    </>
  );
};

export const Default = Template.bind({});
Default.args = { isOpen: true };

export const WithTitle = Template.bind({});
WithTitle.args = { isOpen: true, title: 'My First Dialog' };

export const NotDismissable = Template.bind({});
NotDismissable.args = { isDismissable: false, isOpen: true };
