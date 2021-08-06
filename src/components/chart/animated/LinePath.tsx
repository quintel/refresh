import React from 'react';

import { LinePath as VisxLinePath } from '@visx/shape';
import type { LinePathProps } from '@visx/shape/lib/shapes/LinePath';
import type { SeriesPoint } from 'd3-shape';

import { motion } from 'framer-motion';

// Props which are passed into @visx's LinePath component. Any other props are either used
// internally by AnimatedLinePath, or given to the motion.line.
type PropsFromLinePath = 'curve' | 'data' | 'defined' | 'x' | 'y';

type Props<Datum extends SeriesPoint<unknown>> = Pick<LinePathProps<Datum>, PropsFromLinePath> &
  Omit<React.ComponentProps<typeof motion.path>, PropsFromLinePath> & {
    css?: never;
    opacity?: number;
  };

export default function LinePath<Datum extends SeriesPoint<unknown>>({
  className: origClassName,
  data,
  opacity,
  x,
  y,
  ...lineProps
}: Props<Datum>): React.ReactElement {
  const className = `visx-linepath ${origClassName}`.trim();

  return (
    <VisxLinePath<Datum> x={x} y={y}>
      {({ path }) => {
        const animProps = {
          // data is compatiable with Datum[], but TypeScript doesn't think so. I'm not sure why,
          // but expect Datum needs to extend SeriesPoint, or something like that.
          d: (data && path(data)) || '',
          opacity,
        };

        return (
          <motion.path
            className={className}
            initial={animProps}
            animate={animProps}
            exit={animProps}
            strokeWidth={2}
            stroke="black"
            {...lineProps}
          />
        );
      }}
    </VisxLinePath>
  );
}
