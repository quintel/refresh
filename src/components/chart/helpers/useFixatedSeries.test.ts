import { renderHook, act } from '@testing-library/react-hooks';
import { useFixatedSeries } from '.';

describe('useFixatedSeries', () => {
  it('allows fixating a series', () => {
    const { result } = renderHook(() => useFixatedSeries(['One', 'Two']));

    expect(result.current.isSeriesDimmed('One')).toBeFalsy();
    expect(result.current.isSeriesDimmed('Two')).toBeFalsy();

    expect(result.current.isSeriesFixated('One')).toBeFalsy();
    expect(result.current.isSeriesFixated('Two')).toBeFalsy();

    act(() => result.current.setFixatedSeries('One'));

    expect(result.current.fixatedSeries).toEqual('One');

    expect(result.current.isSeriesDimmed('One')).toBeFalsy();
    expect(result.current.isSeriesDimmed('Two')).toBeTruthy();

    expect(result.current.isSeriesFixated('One')).toBeTruthy();
    expect(result.current.isSeriesFixated('Two')).toBeFalsy();
  });

  it('allows un-fixating a series', () => {
    const { result } = renderHook(() => useFixatedSeries(['One', 'Two']));

    act(() => result.current.setFixatedSeries('One'));
    act(() => result.current.setFixatedSeries());

    expect(result.current.fixatedSeries).toEqual(undefined);

    expect(result.current.isSeriesDimmed('One')).toBeFalsy();
    expect(result.current.isSeriesDimmed('Two')).toBeFalsy();

    expect(result.current.isSeriesDimmed('One')).toBeFalsy();
    expect(result.current.isSeriesDimmed('Two')).toBeFalsy();
  });
});
