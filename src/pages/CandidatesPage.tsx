import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCandidates } from '../hooks/useCandidates';
import { useDebounce } from '../hooks/useDebounce';
import { CandidateCard } from '../components/CandidateCard/CandidateCard';
import { SearchBar, type FilterVerdict, type SortBy } from '../components/SearchBar/SearchBar';
import { Spinner } from '../components/UI/Spinner';

function parseExpToMonths(totalExp: string): number {
  const yearMatch = totalExp.match(/(\d+\.?\d*)\s*г/);
  const monthMatch = totalExp.match(/(\d+)\s*мес/);
  let months = 0;
  if (yearMatch) months += parseFloat(yearMatch[1]) * 12;
  if (monthMatch) months += parseInt(monthMatch[1]);
  return months;
}

export function CandidatesPage() {
  const { candidates, loading, error } = useCandidates();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const verdictFilter = (searchParams.get('verdict') ?? 'ALL') as FilterVerdict;
  const sortBy = (searchParams.get('sort') ?? 'date') as SortBy;

  const debouncedSearch = useDebounce(search, 300);

  const setSearch = (v: string) =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      v ? next.set('search', v) : next.delete('search');
      return next;
    });

  const setVerdict = (v: FilterVerdict) =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      v !== 'ALL' ? next.set('verdict', v) : next.delete('verdict');
      return next;
    });

  const setSort = (v: SortBy) =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      v !== 'date' ? next.set('sort', v) : next.delete('sort');
      return next;
    });

  const filtered = useMemo(() => {
    let result = candidates;

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q));
    }

    if (verdictFilter !== 'ALL') {
      result = result.filter((c) => c.verdict === verdictFilter);
    }

    return [...result].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name, 'ru');
      if (sortBy === 'exp') return parseExpToMonths(b.total_exp) - parseExpToMonths(a.total_exp);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [candidates, debouncedSearch, verdictFilter, sortBy]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section aria-labelledby="page-title" className="mb-6">
        <h1 id="page-title" className="text-2xl font-bold text-gray-900">
          Кандидаты
        </h1>
        <p className="text-sm text-gray-500 mt-1">React — младший программист</p>
      </section>

      <SearchBar
        search={search}
        onSearchChange={setSearch}
        verdictFilter={verdictFilter}
        onVerdictChange={setVerdict}
        sortBy={sortBy}
        onSortChange={setSort}
        count={filtered.length}
        total={candidates.length}
      />

      {loading && <Spinner />}

      {error && (
        <div role="alert" className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-gray-500 font-medium">Кандидаты не найдены</p>
          <p className="text-gray-400 text-sm mt-1">Попробуйте изменить параметры поиска</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}
    </main>
  );
}
