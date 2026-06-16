import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

const noop = () => {};

function renderBar(overrides: Partial<Parameters<typeof SearchBar>[0]> = {}) {
  const defaults = {
    search: '',
    onSearchChange: noop,
    verdictFilter: 'ALL' as const,
    onVerdictChange: noop,
    sortBy: 'date' as const,
    onSortChange: noop,
    count: 12,
    total: 12,
    ...overrides,
  };
  return render(<SearchBar {...defaults} />);
}

describe('SearchBar', () => {
  it('renders a search input', () => {
    renderBar();
    expect(screen.getByPlaceholderText('Поиск по ФИО...')).toBeInTheDocument();
  });

  it('renders the verdict filter select', () => {
    renderBar();
    expect(screen.getByLabelText('Фильтр по вердикту')).toBeInTheDocument();
  });

  it('renders the sort select', () => {
    renderBar();
    expect(screen.getByLabelText('Сортировка')).toBeInTheDocument();
  });

  it('shows "Всего кандидатов" when count equals total', () => {
    renderBar({ count: 12, total: 12 });
    expect(screen.getByText(/всего кандидатов/i)).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('shows "Найдено: N из M" when count is less than total', () => {
    renderBar({ count: 3, total: 12 });
    expect(screen.getByText(/найдено/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/из 12/)).toBeInTheDocument();
  });

  it('calls onSearchChange when the user types', async () => {
    const user = userEvent.setup();
    const onSearchChange = jest.fn();
    renderBar({ onSearchChange });

    await user.type(screen.getByPlaceholderText('Поиск по ФИО...'), 'Ив');

    expect(onSearchChange).toHaveBeenCalledWith('И');
    expect(onSearchChange).toHaveBeenCalledWith('Ив');
  });

  it('calls onVerdictChange when a verdict option is selected', async () => {
    const user = userEvent.setup();
    const onVerdictChange = jest.fn();
    renderBar({ onVerdictChange });

    await user.selectOptions(screen.getByLabelText('Фильтр по вердикту'), 'ПОДХОДИТ');

    expect(onVerdictChange).toHaveBeenCalledWith('ПОДХОДИТ');
  });

  it('calls onSortChange when a sort option is selected', async () => {
    const user = userEvent.setup();
    const onSortChange = jest.fn();
    renderBar({ onSortChange });

    await user.selectOptions(screen.getByLabelText('Сортировка'), 'name');

    expect(onSortChange).toHaveBeenCalledWith('name');
  });

  it('reflects the current search value in the input', () => {
    renderBar({ search: 'Иванов' });
    expect(screen.getByDisplayValue('Иванов')).toBeInTheDocument();
  });
});
