import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { VisuallyHidden } from '@reach/visually-hidden';

import { Slider as BasicSlider } from '@/components/slider';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@/components/disclosure';
import { space } from '@/styles/theme';

const SliderRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;

  output {
    text-align: right;
    width: 75px;
  }
`;

const SliderWrapper = styled.div`
  flex: 1;
  padding: 0 ${space(10)};
`;

const SliderName = styled.div`
  width: 150px;
`;

const SliderButton = styled.button`
  width: ${space(16)};
`;

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
    <div>
      <SliderRow>
        <SliderName>{name}</SliderName>
        <SliderButton onClick={() => setValue(defaultValue)}>R</SliderButton>
        <SliderButton onClick={decreaseValue}>
          <span aria-hidden="true">-</span> <VisuallyHidden>Decrease value</VisuallyHidden>
        </SliderButton>
        <SliderWrapper>
          <BasicSlider
            max={max}
            min={min}
            onChange={setValue}
            step={step}
            value={value}
            {...rest}
          />
        </SliderWrapper>
        <SliderButton onClick={increaseValue}>
          <span aria-hidden="true">+</span> <VisuallyHidden>Increase value</VisuallyHidden>
        </SliderButton>
        <output>{value}</output>
        <SliderButton aria-hidden="true" onClick={openDescription}>
          ?
        </SliderButton>
      </SliderRow>
      <Disclosure>
        <VisuallyHidden>
          <DisclosureButton ref={descriptionToggleButton} as="button">
            Show description
          </DisclosureButton>
        </VisuallyHidden>
        <DisclosurePanel>{description}</DisclosurePanel>
      </Disclosure>
    </div>
  );
}
