import { PatternLines } from '@visx/pattern';

import type { ScaleLinear } from 'd3-scale';
import type { DefaultOutput, StringLike } from '@visx/scale';

import { transition } from '@/styles/theme';
import Bar from './animated/Bar';

type NegativeRegionProps = {
  width: number;
  yScale: ScaleLinear<StringLike, DefaultOutput>;
};

/**
 * On charts with a linear x-axis, this allows shading the region below zero with light grey
 * diagonal lines.
 */
export default function NegativeRegion({
  width,
  yScale,
}: NegativeRegionProps): React.ReactElement | null {
  if (typeof yScale.domain()[0] !== 'number') {
    return null; // eslint-disable-line unicorn/no-null
  }

  // At this point we know the scale will output numbers and can safely cast, which avoids having
  // to check for non-numeric values.
  const numberScale = yScale as ScaleLinear<StringLike, number>;

  // The pixel offset from the top of the chart where the lowest value may be found.
  const totalOffset = numberScale(numberScale.domain()[0]) || 0;
  const topOffset = Math.max(0, numberScale(Math.max(numberScale.domain()[0], 0)));

  const animateProps = {
    height: totalOffset - topOffset,
    y: topOffset,
    width,
  };

  return (
    <>
      <PatternLines
        id="negative-rect-pattern"
        height={6}
        width={6}
        stroke="rgb(0 0 0 / 4%)"
        strokeWidth={2}
        orientation={['diagonal']}
      />

      <Bar
        x={0}
        animate={animateProps}
        initial={animateProps}
        transition={transition.framerTransition()}
        fill="url(#negative-rect-pattern)"
      />
    </>
  );
}
