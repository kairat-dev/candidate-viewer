import candidatesData from '../../mock/candidates.json';
import type { Candidate } from '../types/candidate';

let cache: Candidate[] | null = null;

export function fetchCandidates(): Promise<Candidate[]> {
  if (cache) return Promise.resolve(cache);
  return new Promise((resolve) => {
    setTimeout(() => {
      cache = candidatesData as Candidate[];

      resolve(cache);
    }, 500);
  });
}
