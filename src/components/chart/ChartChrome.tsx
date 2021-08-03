import { useMemo } from 'react';

import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { ScaleBand, ScaleLinear } from 'd3-scale';

import ChartContext from './ChartContext';
import Legend, { legendItemPropsFromConfig } from './Legend';

import {
  calculateExtent,
  chartDimensions,
  useFixatedSeries,
  useSeriesNames,
  useToggleableSeries,
  tickCount,
} from './helpers';

import type { ChartConfig } from './types';

// Tick properties ---------------------------------------------------------------------------------

const tickLabelProps = { fontSize: 13, fontFamily: 'inherit' } as const;
const xTickLabelProps = () => ({ ...tickLabelProps, textAnchor: 'middle' } as const);
const yTickLabelProps = () => ({ ...tickLabelProps, textAnchor: 'end', dy: 5, x: -12 } as const);

function gridSettings(setting: false | true | 'x' | 'y') {
  const grid = { x: false, y: false };

  if (setting === true) {
    grid.x = true;
    grid.y = true;
  } else if (setting !== false) {
    grid[setting] = true;
  }

  return grid;
}

// ChartChrome -------------------------------------------------------------------------------------

type ChartChromeProps = {
  children?: React.ReactNode;
  data: ChartConfig;
  height: number;
  grid?: false | true | 'x' | 'y';
  width: number;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
};

export default function ChartChrome({
  children,
  grid = 'y',
  data,
  height,
  width,
  xScale: xScaleOrig,
  yScale: yScaleOrig,
}: ChartChromeProps): React.ReactElement | null {
  if (height === 0 || width === 0) {
    throw new Error(
      `Cannot render a chart where the width or height is zero (${width}x${height}). Did you ` +
        `forget to wrap the chart in a ConditionalParentSize?`
    );
  }

  const dimensions = useMemo(() => chartDimensions({ height, width }), [height, width]);

  const ticks = tickCount(dimensions.boundedHeight);

  const seriesKeys = useSeriesNames(data);
  const { isSeriesDimmed, isSeriesFixated, setFixatedSeries } = useFixatedSeries(seriesKeys);

  const { data: filteredData, isSeriesVisible, toggleSeries } = useToggleableSeries(data);

  const [colMin, colMax] = calculateExtent(filteredData);

  const displayGrid = gridSettings(grid);

  // Scales ----------------------------------------------------------------------------------------

  const xScale = useMemo(() => {
    const copy = xScaleOrig.copy();

    // TODO setting the domain explicitly will not work with non-band scales; we'll have to detect
    // these and calculate the domain.
    copy.domain(data.xAxis.data || []);
    copy.range([0, dimensions.boundedWidth]);

    return copy;
  }, [data, dimensions.boundedWidth, xScaleOrig]);

  const yScale = useMemo(() => {
    const copy = yScaleOrig.copy();

    copy.domain([colMin, colMax]);
    copy.range([dimensions.boundedHeight, 0]);
    copy.nice(ticks);

    return copy;
  }, [colMin, colMax, dimensions.boundedHeight, ticks, yScaleOrig]);

  const colorScale = useMemo(
    () =>
      scaleOrdinal<string, string>({
        domain: seriesKeys,
        range: filteredData.series.map(({ color }) => color),
      }),
    [filteredData.series, seriesKeys]
  );

  // Render ----------------------------------------------------------------------------------------

  const contextValue = useMemo<React.ContextType<typeof ChartContext>>(
    () => ({
      colorScale,
      data: filteredData,
      fixateSeries: setFixatedSeries,
      height: dimensions.boundedHeight,
      isSeriesDimmed,
      isSeriesFixated,
      isSeriesVisible,
      toggleSeries,
      width: dimensions.boundedWidth,
      xScale,
      yScale,
    }),
    [
      colorScale,
      dimensions.boundedHeight,
      dimensions.boundedWidth,
      filteredData,
      isSeriesDimmed,
      isSeriesFixated,
      isSeriesVisible,
      setFixatedSeries,
      toggleSeries,
      xScale,
      yScale,
    ]
  );

  return (
    <ChartContext.Provider value={contextValue}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Group top={dimensions.marginTop} left={dimensions.marginLeft}>
          {children}

          <AxisBottom
            top={dimensions.boundedHeight}
            scale={xScale}
            stroke="#eee"
            hideTicks={true}
            tickLabelProps={xTickLabelProps}
            hideAxisLine={displayGrid.y}
          />

          <AxisLeft
            scale={yScale}
            numTicks={ticks}
            stroke="#eee"
            tickLabelProps={yTickLabelProps}
            hideTicks={true}
            hideAxisLine={true}
          />
        </Group>
      </svg>

      <Legend
        items={legendItemPropsFromConfig(data)}
        onItemClick={toggleSeries}
        onItemMouseOver={(key) => setFixatedSeries(key)}
        onItemMouseOut={() => setFixatedSeries()}
      />

      {/* Tooltip? */}
    </ChartContext.Provider>
  );
}
