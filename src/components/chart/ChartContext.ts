import { createContext, useContext } from 'react';
import { ScaleBand, ScaleLinear, ScaleOrdinal } from 'd3-scale';

import { IsSeriesFixated, SetFixatedSeries } from './helpers/useFixatedSeries';
import { IsSeriesVisible } from './helpers/useToggleableSeries';

import type { ChartConfig } from './types';

// ChartContext ------------------------------------------------------------------------------------

type ChartContextProps = {
  colorScale: ScaleOrdinal<string, string>;
  data: ChartConfig;
  fixateSeries: SetFixatedSeries;
  height: number;
  isSeriesDimmed: IsSeriesFixated;
  isSeriesFixated: IsSeriesFixated;
  isSeriesVisible: IsSeriesVisible;
  width: number;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
};

const ChartContext = createContext<ChartContextProps | false>(false);

export default ChartContext;

export function useChartContext(): ChartContextProps {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('useChartContext must be used within a ChartContext.Provider');
  }

  return context;
}
