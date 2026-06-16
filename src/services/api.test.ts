import { fetchCandidates } from './api';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('fetchCandidates', () => {
  it('resolves with an array of candidates after 500 ms', async () => {
    const promise = fetchCandidates();
    jest.advanceTimersByTime(500);
    const result = await promise;

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('verdict');
  });

  it('returns the cached result immediately on a second call', async () => {
    // First call (cache already warm from the test above within the same module instance)
    const promise = fetchCandidates();
    // cache is hit — resolves as Promise.resolve(cache) without advancing timers
    const result = await promise;
    expect(Array.isArray(result)).toBe(true);
  });
});
