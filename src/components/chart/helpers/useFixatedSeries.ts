import { useMemo, useState } from 'react';

export default function useFixatedSeries(keys: string[]): {
  fixatedSeries: string | undefined;
  isSeriesDimmed: (key: string) => boolean;
  isSeriesFixated: (key: string) => boolean;
  setFixatedSeries: (key?: string) => void;
} {
  const [fixatedSeries, setFixatedSeries] = useState<string>();

  return useMemo(
    () =>
      ({
        fixatedSeries,
        isSeriesDimmed: (key: string) => fixatedSeries != undefined && fixatedSeries != key,
        isSeriesFixated: (key: string) => fixatedSeries != undefined && fixatedSeries == key,
        setFixatedSeries,
      } as const),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fixatedSeries, setFixatedSeries, keys]
  );
}
