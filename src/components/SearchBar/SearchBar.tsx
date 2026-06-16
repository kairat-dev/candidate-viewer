import type { Verdict } from '../../types/candidate';

export type FilterVerdict = Verdict | 'ALL';
export type SortBy = 'name' | 'exp' | 'date';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  verdictFilter: FilterVerdict;
  onVerdictChange: (value: FilterVerdict) => void;
  sortBy: SortBy;
  onSortChange: (value: SortBy) => void;
  count: number;
  total: number;
}

const verdictOptions: { value: FilterVerdict; label: string }[] = [
  { value: 'ALL', label: 'Все вердикты' },
  { value: 'ПОДХОДИТ', label: 'ПОДХОДИТ' },
  { value: 'ЧАСТИЧНО', label: 'ЧАСТИЧНО' },
  { value: 'НЕ ПОДХОДИТ', label: 'НЕ ПОДХОДИТ' },
];

const sortOptions: { value: SortBy; label: string }[] = [
  { value: 'date', label: 'По дате' },
  { value: 'name', label: 'По имени' },
  { value: 'exp', label: 'По опыту' },
];

export function SearchBar({
  search,
  onSearchChange,
  verdictFilter,
  onVerdictChange,
  sortBy,
  onSortChange,
  count,
  total,
}: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Поиск по ФИО..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Поиск по ФИО"
          />
        </div>

        <select
          value={verdictFilter}
          onChange={(e) => onVerdictChange(e.target.value as FilterVerdict)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          aria-label="Фильтр по вердикту"
        >
          {verdictOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortBy)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          aria-label="Сортировка"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        {count === total ? (
          <>Всего кандидатов: <strong className="text-gray-700">{total}</strong></>
        ) : (
          <>Найдено: <strong className="text-gray-700">{count}</strong> из {total}</>
        )}
      </p>
    </div>
  );
}
