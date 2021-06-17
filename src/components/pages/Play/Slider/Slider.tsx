import { useRef, useState } from 'react';
import { VisuallyHidden } from '@reach/visually-hidden';

import { Slider as BasicSlider } from '@/components/slider';
import { MinusIcon, PlusIcon } from './icons';
import SliderDescription from './SliderDescription';

import {
  SliderButton,
  SliderContainer,
  SliderName,
  SliderRow,
  SliderWidgetWrapper,
} from './styles';

/**
 * Returns a value such that it complies with the step.
 *
 * @example
 *
 * This example causes a number with too many decimal places to be rounded to a single decimal
 * place.
 *
 * ```ts
 * snapValue(50.100001, 0.1) // => 50.1
 * ```
 *
 * @privateRemarks
 *
 * TODO: This likely belongs as part of an "Input" model, and is here only temporarily.
 */
function snapValue(value: number, step: number) {
  const multiplier = 1 / step;
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Returns if a description is present and should be shown by the Slider.
 */
function hasDescription(str: string | undefined): str is string {
  return typeof str === 'string';
}

type BasicSliderProps = React.ComponentProps<typeof BasicSlider>;

interface SliderProps extends BasicSliderProps {
  defaultValue: NonNullable<BasicSliderProps['defaultValue']>;
  description?: string;
  name: string;
  step: number;
}

/**
 * Slider used to set input values.
 *
 * This builds on the basic slider by using the attributes provided for inputs, and adds labels,
 * buttons, outputs, descriptions, and other useful features.
 */
export default function Slider({
  defaultValue,
  description,
  max,
  min,
  step,
  name,
  ...rest
}: SliderProps): React.ReactElement {
  const [value, setValue] = useState(defaultValue);
  const descriptionToggleButton = useRef<HTMLButtonElement>(null);

  const increaseValue = () => setValue((value) => Math.min(snapValue(value + step, step), max));
  const decreaseValue = () => setValue((value) => Math.max(snapValue(value - step, step), min));
  const openDescription = () => descriptionToggleButton.current?.click();

  return (
    <SliderContainer>
      <SliderRow>
        <SliderName>{name}</SliderName>
        <SliderButton
          disabled={value === defaultValue}
          hoverOnly={true}
          onClick={() => setValue(defaultValue)}
          title="Reset to original value"
        >
          <span aria-hidden="true">R</span> <VisuallyHidden>Reset to original value</VisuallyHidden>
        </SliderButton>
        <SliderButton disabled={value === min} hoverOnly={true} onClick={decreaseValue}>
          <MinusIcon />
          <VisuallyHidden>Decrease value</VisuallyHidden>
        </SliderButton>
        <SliderWidgetWrapper>
          <BasicSlider
            max={max}
            min={min}
            onChange={setValue}
            step={step}
            value={value}
            {...rest}
          />
        </SliderWidgetWrapper>
        <SliderButton disabled={value === max} hoverOnly={true} onClick={increaseValue}>
          <PlusIcon />
          <VisuallyHidden>Increase value</VisuallyHidden>
        </SliderButton>
        <output>{value}</output>
        <SliderButton
          aria-hidden="true"
          data-testid="show-description"
          disabled={!hasDescription(description)}
          onClick={openDescription}
        >
          ?
        </SliderButton>
      </SliderRow>
      {hasDescription(description) && (
        <SliderDescription toggleButtonRef={descriptionToggleButton}>
          {description}
        </SliderDescription>
      )}
    </SliderContainer>
  );
}
