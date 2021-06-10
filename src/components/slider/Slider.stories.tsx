import { Meta, Story } from '@storybook/react';
import { Slider, SliderOrientation } from '.';

type SliderProps = React.ComponentProps<typeof Slider>;

const Template: Story<SliderProps> = (props: SliderProps) => {
  return <Slider defaultValue={props.defaultValue || props.max / 4} {...props} />;
};

export default {
  title: 'Example/Slider',
  component: Slider,
  args: {
    min: 0,
    max: 100,
    step: 1,
    orientation: SliderOrientation.Horizontal,
  },
  argTypes: {
    onChange: { action: 'change' },
    orientation: {
      options: [SliderOrientation.Horizontal, SliderOrientation.Vertical],
      control: 'radio',
    },
    as: {
      control: false,
    },
  },
  parameters: {
    controls: { sort: 'requiredFirst' },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = { min: 0, max: 100, step: 1 };

export const DrawTo = Template.bind({});
DrawTo.args = { drawToMin: 0, drawToMax: 100, min: 20, max: 80, step: 1 };

export const AnchorAt = Template.bind({});
AnchorAt.args = { min: 0, max: 100, anchorAt: 50 };

export const Vertical = Template.bind({});
Vertical.args = { min: 0, max: 100, orientation: SliderOrientation.Vertical };
