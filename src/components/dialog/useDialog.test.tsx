import { renderHook, act } from '@testing-library/react-hooks';
import { useDialog } from '.';

describe('useDialog', () => {
  it('defaults to closed', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.isOpen).toEqual(false);
  });

  it('may be initialized to be initially open', () => {
    const { result } = renderHook(() => useDialog(true));
    expect(result.current.isOpen).toEqual(true);
  });

  it('allows the dialog to be opened and closed', () => {
    const { result } = renderHook(() => useDialog());

    act(() => result.current.onOpen());
    expect(result.current.isOpen).toEqual(true);

    act(() => result.current.onClose());
    expect(result.current.isOpen).toEqual(false);

    act(() => result.current.onClose());
    expect(result.current.isOpen).toEqual(false);
  });
});
