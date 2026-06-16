import { useState, useEffect } from 'react';
import type { Candidate } from '../types/candidate';
import { fetchCandidates } from '../services/api';

interface UseCandidatesResult {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
}

export function useCandidates(): UseCandidatesResult {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCandidates()
      .then((data) => {
        setCandidates(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки данных');
        setLoading(false);
      });
  }, []);

  return { candidates, loading, error };
}
