import CSS from 'csstype';
import { env } from 'process';

type TransitionCreator = {
  (
    properties: keyof CSS.PropertiesHyphen | (keyof CSS.PropertiesHyphen)[],
    options?: { duration?: string | number; timingFunction?: string }
  ): { [key: string]: string | undefined };
};

const defaultDuration = 0.175;
const defaultTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';

const coerceDuration = (duration: string | number) => {
  if (typeof duration === 'string') {
    return duration;
  }

  return `${duration}s`;
};

/**
 * Creates CSS styles for transitioning properties. Returns a short-hand "transition" property when
 * only one property is provided.
 *
 * @param properties
 *   A string naming a single property, or an array containing multiple properties.
 * @param options
 *   Optional duration and timingFunction values which may be used to customise the transition.
 */
const createTransition: TransitionCreator = (properties, options = {}) => {
  const props = typeof properties === 'string' ? properties : properties.join(', ');
  const duration = coerceDuration(options.duration || defaultDuration);
  const timingFunction = options.timingFunction || defaultTimingFunction;

  return typeof properties === 'string' || properties.length === 1
    ? {
        transition: `${props} ${duration} ${timingFunction}`,
      }
    : {
        transitionProperty: props,
        transitionDuration: duration,
        transitionTimingFunction: timingFunction,
      };
};

/**
 * Creates a config object which may be supplied to Framer, animating the properties with the chosen
 * duration.
 */
function framerTransition(duration = defaultDuration): {
  duration: number;
  ease: [number, number, number, number];
} {
  return {
    duration: env.NODE_ENV === 'test' ? 0 : duration,
    ease: [0.4, 0, 0.2, 1],
  };
}

export default {
  /**
   * Creates CSS styles for transitioning properties. Uses the default duration and timing function
   * when none are provided.
   *
   * @param properties
   *   A string naming a single property, or an array containing multiple properties.
   * @param options
   *   Optional duration and timingFunction values which may be used to customise the transition.
   *
   * @see createTransition
   */
  default: createTransition,
  defaultDuration: coerceDuration(defaultDuration),
  defaultTimingFunction,
  framerTransition,
};
