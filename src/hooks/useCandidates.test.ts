import { renderHook, waitFor } from '@testing-library/react';
import { useCandidates } from './useCandidates';
import { fetchCandidates } from '../services/api';
import { mockCandidates } from '../__tests__/fixtures';

jest.mock('../services/api');
const mockFetch = fetchCandidates as jest.MockedFunction<typeof fetchCandidates>;

describe('useCandidates', () => {
  it('starts with loading=true and empty candidates', () => {
    mockFetch.mockReturnValue(new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useCandidates());

    expect(result.current.loading).toBe(true);
    expect(result.current.candidates).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('returns candidates and sets loading=false after successful fetch', async () => {
    mockFetch.mockResolvedValueOnce(mockCandidates);
    const { result } = renderHook(() => useCandidates());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.candidates).toEqual(mockCandidates);
    expect(result.current.error).toBeNull();
  });

  it('sets error and loading=false when fetch rejects', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Сеть недоступна'));
    const { result } = renderHook(() => useCandidates());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.candidates).toEqual([]);
    expect(result.current.error).toBe('Сеть недоступна');
  });

  it('uses the error message from a non-Error rejection', async () => {
    mockFetch.mockRejectedValueOnce('unknown error');
    const { result } = renderHook(() => useCandidates());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Ошибка загрузки данных');
  });
});
