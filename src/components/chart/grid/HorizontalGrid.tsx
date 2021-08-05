import { useEffect, useRef } from 'react';

import { GridRows } from '@visx/grid';
import type { GridLines } from '@visx/grid/lib/types';
import { ScaleLinear } from 'd3-scale';

import { AnimatePresence } from 'framer-motion';

import Bar from '../animated/Bar';
import { transition } from '@/styles/theme';

type HorizontalGridProps = {
  height: number;
  scale: ScaleLinear<number, number, never>;
  tickCount: number;
  width: number;
};

type Point = GridLines[0]['from'];

type RequiredPoint = { x: NonNullable<Point['x']>; y: NonNullable<Point['y']> };
type RequiredLine = { from: RequiredPoint; to: RequiredPoint };

/**
 * Used as a filter to an array of lines, returning only those lines which can be drawn on the grid.
 */
function isRenderableLine(point: GridLines[0]): point is RequiredLine {
  return (
    point.from.x != undefined &&
    point.from.y != undefined &&
    point.to.x != undefined &&
    point.to.y != undefined
  );
}

/**
 * Determines the opacity of the grid line.
 */
function lineOpacity(from: RequiredPoint, zeroPoint: number) {
  return from.y === zeroPoint ? 0.25 : 0.08;
}

/**
 * Calculates the position from which line is animated when it enters, or where it is animated to
 * when it exists.
 */
function initialPosition({ y }: RequiredPoint, zeroPoint: number, height: number) {
  return y < zeroPoint ? 0 : height;
}

export default function HorizontalGrid({
  height,
  scale,
  tickCount,
  width,
}: HorizontalGridProps): React.ReactElement {
  const isInitialRender = useRef<boolean>(true);

  useEffect(() => {
    isInitialRender.current = false;
  });

  return (
    <GridRows scale={scale} height={height} width={width} stroke="#eee" numTicks={tickCount}>
      {({ lines }) => {
        const filtered = lines.filter((line): line is RequiredLine => isRenderableLine(line));
        const zeroPoint = scale(0);

        // Having separate indices (and therefore keys) for lines above and below zero means that
        // animating lines in or out of the chart is more "natural". For example, when the scale
        // changes from -6 to +6 to -12 to +12, it does not make intuitive sense that lines which
        // appeared above zero should move to now be below the zero line.
        let negativeIndex = 0;
        let positiveIndex = 0;

        const sorted: RequiredLine[] = [];

        // This inverts the render order for lines which appear below zero. This ensures that the
        // lines nearest the bottom of the chart are removed rather than lines higher up.
        for (const line of filtered) {
          if (line.from.y > zeroPoint) {
            sorted.unshift(line);
          } else {
            sorted.push(line);
          }
        }

        return (
          <AnimatePresence>
            {sorted.map(({ from, to }, i) => {
              const opacity = lineOpacity(from, zeroPoint);
              const width = to.x - from.x;

              const startPos = isInitialRender.current
                ? from.y
                : initialPosition(from, zeroPoint, height);

              let key = 'zero-line';

              key =
                from.y > zeroPoint ? `positive-${positiveIndex++}` : `negative-${negativeIndex++}`;

              // We should use a Line here, rather than a Bar, but drawing a rect seems to avoid
              // aliasing issues (whereby lines appear and disappear) in Chrome.
              return (
                <Bar
                  key={key}
                  initial={{
                    opacity: isInitialRender.current ? opacity : 0,
                    width,
                    x: from.x,
                    y: startPos,
                  }}
                  animate={{
                    opacity,
                    width,
                    x: from.x,
                    y: from.y,
                  }}
                  exit={{
                    opacity: 0,
                    width,
                    x: from.x,
                    y: startPos,
                  }}
                  transition={transition.framerTransition()}
                  height={1}
                  fill="black"
                />
              );
            })}
          </AnimatePresence>
        );
      }}
    </GridRows>
  );
}
