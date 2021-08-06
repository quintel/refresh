import { BarStack } from '@visx/shape';

import Bar from './animated/Bar';
import { useChartContext } from './ChartContext';
import { tableizeData, useSeriesNames } from './helpers';

import { transition } from '@/styles/theme';

import { TablePoint } from './types';

const getBar = ({ key }: TablePoint) => key;

/**
 * Adds a test ID to bars for each access in tests.
 */
function barTestId(key: string, index: number): string | undefined {
  if (process.env.NODE_ENV !== 'test') {
    return;
  }

  return key.toLowerCase().replace(/\s/, '_') + '-' + index;
}

/**
 * Bars draws values from a ChartConfig as stacked bars. This must be used within a ChartContext,
 * preferably within ChartChrome.
 */
export default function Bars(): React.ReactElement {
  const { colorScale, data, fixateSeries, isSeriesDimmed, isSeriesVisible, xScale, yScale } =
    useChartContext();

  const seriesKeys = useSeriesNames(data, (series) => series.type === 'bar');

  // Render ----------------------------------------------------------------------------------------

  return (
    <BarStack<TablePoint, string>
      data={tableizeData(data)}
      keys={seriesKeys}
      xScale={xScale}
      yScale={yScale}
      color={colorScale}
      x={getBar}
      offset="diverging"
      order="none"
    >
      {(barStacks) => {
        return barStacks.map((barStack) => {
          return barStack.bars.map((bar) => {
            const height = isSeriesVisible(bar.key) ? bar.height : 0;

            const positionProps = {
              x: bar.x,
              y: bar.y,
              height,
              width: bar.width,
            };

            return (
              <Bar
                key={`bar-stack-${barStack.index}-${bar.index}-${bar.key}`}
                initial={positionProps}
                animate={positionProps}
                data-testid={barTestId(bar.key, bar.index)}
                exit={{
                  ...positionProps,
                  height: 0,
                }}
                transition={transition.framerTransition()}
                fill={bar.color}
                onMouseOver={() => fixateSeries(barStack.key)}
                onMouseOut={() => fixateSeries()}
                dimmed={isSeriesDimmed(barStack.key)}
              />
            );
          });
        });
      }}
    </BarStack>
  );
}
