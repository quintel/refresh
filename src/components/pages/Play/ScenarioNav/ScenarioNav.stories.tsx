import { Story, Meta } from '@storybook/react';

import ScenarioNav from '.';

export default {
  title: 'Play/ScenarioNav',
  component: ScenarioNav,
} as Meta;

const Template: Story<React.ComponentProps<typeof ScenarioNav>> = (args) => (
  <ScenarioNav {...args} />
);

export const WithoutSavedScenario = Template.bind({});
WithoutSavedScenario.args = {
  areaName: 'Netherlands',
  endYear: 2050,
};

export const WithSavedScenario = Template.bind({});
WithSavedScenario.args = {
  areaName: 'Netherlands',
  endYear: 2050,
  savedScenario: {
    id: 1,
    title: 'My first scenario',
  },
};

export const AsAdmin = Template.bind({});
AsAdmin.args = {
  areaName: 'Netherlands',
  endYear: 2050,
  isAdmin: true,
};
