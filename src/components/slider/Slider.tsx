import { useCallback, useState } from 'react';

import {
  Slider as ReachSlider,
  SliderHandle,
  SliderRange as ReachRange,
  SliderTrack,
} from '@reach/slider';

import { StyledInput } from './styles';

type ReachProps = React.ComponentProps<typeof ReachSlider>;

/**
 * Ensures that the value is covered by the min and max. If the value is lower than min, min is
 * returned, if greater than max, max is returned. Otherwise, the original value is returned.
 */
function constrainNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Given a value, and the min and max of a slider, returns what at what percentage along the slider
 * would the value be drawn.
 */
const valueToPercent = (value: number, min: number, max: number) =>
  ((value - min) * 100) / (max - min);

type SliderRangeProps = {
  anchorAt?: number;
  max: number;
  min: number;
  value: number;
  orientation?: 'horizontal' | 'vertical';
};

/**
 * Rather than the Reach UI range, this is a custom version which allows anchoring the range to a
 * specific value, instead of being anchored always at the far-left of the track.
 */
function SliderRange({
  anchorAt,
  max,
  min,
  orientation = 'horizontal',
  value,
  ...rest
}: SliderRangeProps): React.ReactElement {
  const anchorPos = valueToPercent(anchorAt ?? min, min, max);
  const valuePos = valueToPercent(value, min, max);

  const minPos = Math.min(valuePos, anchorPos);
  const maxPos = Math.max(anchorPos, valuePos);

  const style =
    orientation === 'vertical'
      ? {
          bottom: `${minPos}%`,
          height: 'auto',
          top: `${100 - maxPos}%`,
        }
      : {
          left: `${minPos}%`,
          right: `${100 - maxPos}%`,
          width: 'auto',
        };

  return <ReachRange style={style} {...rest} />;
}

interface SliderProps extends React.ComponentProps<typeof ReachSlider> {
  /**
   * By default, the SliderRange is drawn from the far left of the slider to wherever the handle
   * is (the current value). anchorAt instead allows it to be drawn between an arbitrary value and
   * the slider handle.
   *
   * This is useful when the slider represents both positive and negative values, and you want the
   * range to be drawn from 0.
   */
  anchorAt?: number;

  /**
   * drawToMax allows the slider to be drawn to a value larger then the maximum value that may be
   * selected. For example, if the slider max is 50, but drawToMax is set to 100, the slider will
   * represent values from 0 to 100, but only allow selection of values between 0 and 50.
   */
  drawToMax?: number;

  /**
   * drawToMin allows the slider to be drawn to a value lower then the minimum value that may be
   * selected. For example, if the slider min is 0, but drawToMin is set to -50, the slider will
   * represent values from -50 to 100, but only allow selection of values between 0 and 100.
   */
  drawToMin?: number;

  /**
   * The maximum value which may be selected by a user.
   */
  max: NonNullable<ReachProps['max']>;

  /**
   * The minimum value which may be selected by a user.
   */
  min: NonNullable<ReachProps['min']>;
}

/**
 * Provides a slider (range) component. Builds on top of Reach UI's Slider in order to provide
 * `drawTo` and `anchorAt` options.
 */
export default function Slider(props: SliderProps): React.ReactElement {
  const { anchorAt, drawToMax, drawToMin, max, min, onChange, ...rest } = props;

  const minExtent = Math.min(drawToMin ?? min, min);
  const maxExtent = Math.max(drawToMax ?? max, max);

  const [value, setValue] = useState(props.value ?? props.defaultValue ?? min);
  const [isMoving, setIsMoving] = useState(false);

  if (props.value !== undefined && value != props.value) {
    // State updates in controlled mode.
    setValue(props.value);
  }

  const internalOnChange = useCallback<NonNullable<ReachProps['onChange']>>(
    (newValue, ...restChange) => {
      const constrainedValue = constrainNumber(newValue, min, max);

      if (value != constrainedValue) {
        setValue(constrainedValue);
        onChange?.(constrainedValue, ...restChange);
      }
    },
    [min, max, onChange, value]
  );

  const onPointerDown = () => setIsMoving(true);
  const onPointerUp = () => setIsMoving(false);

  return (
    <StyledInput
      isMoving={isMoving}
      max={maxExtent}
      min={minExtent}
      onChange={internalOnChange}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      value={value}
      {...rest}
    >
      <SliderTrack>
        <SliderRange
          anchorAt={constrainNumber(anchorAt ?? minExtent, minExtent, maxExtent)}
          max={maxExtent}
          min={minExtent}
          orientation={props.orientation}
          value={value}
        />
        <SliderHandle aria-valuemin={min} aria-valuemax={max} />
      </SliderTrack>
    </StyledInput>
  );
}
