import React from 'react';
import { Story, Meta } from '@storybook/react';

import Header from '.';

export default {
  title: 'Example/Header',
  component: Header,
} as Meta;

const Template: Story<React.ComponentProps<typeof Header>> = (props) => <Header {...props} />;

export const Default = Template.bind({});
Default.args = { locale: 'en' };

export const SignedIn = Template.bind({});
SignedIn.args = { locale: 'en', user: { isAdmin: false, name: 'Bob Belcher' } };

export const SignedInAdmin = Template.bind({});
SignedInAdmin.args = { locale: 'en', user: { isAdmin: true, name: 'Bob Belcher' } };
