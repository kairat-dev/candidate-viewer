import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('does not update before the delay has elapsed', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } },
    );

    rerender({ value: 'updated' });
    act(() => jest.advanceTimersByTime(100));

    expect(result.current).toBe('initial');
  });

  it('returns the new value after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } },
    );

    rerender({ value: 'updated' });
    act(() => jest.advanceTimersByTime(300));

    expect(result.current).toBe('updated');
  });

  it('cancels the previous timer when the value changes rapidly', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } },
    );

    rerender({ value: 'b' });
    act(() => jest.advanceTimersByTime(200));

    rerender({ value: 'c' });
    act(() => jest.advanceTimersByTime(200));

    // Only 200 ms passed since last change — should still be 'a'
    expect(result.current).toBe('a');

    act(() => jest.advanceTimersByTime(100));
    // Now 300 ms from the last change — should be 'c'
    expect(result.current).toBe('c');
  });
});
