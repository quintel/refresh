import { Fragment, useMemo } from 'react';

import { AreaStack } from '@visx/shape';
import { MarkerCircle } from '@visx/marker';

import { useChartContext } from './ChartContext';
import { transition } from '@/styles/theme';

import { tableizeData, useSeriesNames } from './helpers';
import LinePath from './animated/LinePath';
import Path from './animated/Path';

function markerId(key: string): string {
  return `marker-${key.replace(/\s/, '-')}`;
}

/**
 * Adds a test ID to bars for each access in tests.
 */
function seriesTestId(suffix: string, key: string): string | undefined {
  if (process.env.NODE_ENV !== 'test') {
    return;
  }

  return `${suffix}-${key.toLowerCase().replace(/\s/, '_')}`;
}

export default function Area(): React.ReactElement {
  const {
    colorScale,
    data,
    fixateSeries,
    isSeriesDimmed,
    isSeriesFixated,
    isSeriesVisible,
    xScale,
    yScale,
  } = useChartContext();

  const table = useMemo(() => tableizeData(data), [data]);
  const keys = useSeriesNames(data, (series) => series.type === 'area' || series.type === 'line');

  function seriesOpacity(key: string, defaultOpacity: number) {
    return isSeriesVisible(key) ? (isSeriesDimmed(key) ? 0.3 : defaultOpacity) : 0;
  }

  // TODO: I think it would be nicer for tableizeData to include a copy of the series so that we
  // don't need to do this O(n) lookup every time we want to access a particular series.
  const isArea = (findName: string) =>
    data.series.find(({ name }) => name == findName)?.type === 'area';

  return (
    <>
      <AreaStack
        data={table}
        keys={keys}
        x={(d) => (xScale(d.data.key.toString()) || 0) + xScale.bandwidth() / 2}
        y0={(d) => yScale(d[0])}
        y1={(d) => yScale(d[1])}
        offset="diverging"
      >
        {({ stacks, path }) => {
          return (
            <>
              <g className="chart-areas">
                {stacks.map(
                  (stack) =>
                    isArea(stack.key) && (
                      <Path
                        key={`stack-${stack.key}`}
                        d={path(stack) || ''}
                        data-testid={seriesTestId('area', stack.key)}
                        fill={colorScale(stack.key)}
                        onMouseOut={() => fixateSeries()}
                        onMouseOver={() => fixateSeries(stack.key)}
                        opacity={seriesOpacity(stack.key, 0.8)}
                        stroke="transparent"
                      />
                    )
                )}
              </g>
              {/* Lines must be drawn after areas to ensure they always render on top of overlapping
                areas */}
              <g className="chart-arealines">
                {stacks.map((stack) => (
                  <Fragment key={`stack-extent-${stack.key}`}>
                    <MarkerCircle
                      id={markerId(stack.key)}
                      fill={colorScale(stack.key)}
                      refX={isSeriesFixated(stack.key) ? 3 : 2}
                      size={isSeriesFixated(stack.key) ? 2 : 1}
                    />

                    <LinePath<typeof stack[0]>
                      className={`area-extent ${isSeriesDimmed(stack.key) ? 'dimmed' : ''}`}
                      data-testid={seriesTestId('line', stack.key)}
                      data={stack}
                      markerEnd={`url(#${markerId(stack.key)})`}
                      markerMid={`url(#${markerId(stack.key)})`}
                      markerStart={`url(#${markerId(stack.key)})`}
                      onMouseOut={() => fixateSeries()}
                      onMouseOver={() => fixateSeries(stack.key)}
                      opacity={seriesOpacity(stack.key, 1)}
                      stroke={colorScale(stack.key)}
                      strokeWidth={2}
                      transition={transition.framerTransition()}
                      x={(d) => (xScale(d.data.key.toString()) || 0) + xScale.bandwidth() / 2}
                      y={(d) => yScale(Number(d[0] < 0 ? d[0] : d[1])) || 0}
                    />
                  </Fragment>
                ))}
              </g>
            </>
          );
        }}
      </AreaStack>
    </>
  );
}
