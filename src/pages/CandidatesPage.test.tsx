import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CandidatesPage } from './CandidatesPage';
import { useCandidates } from '../hooks/useCandidates';
import { mockCandidates } from '../__tests__/fixtures';

// Bypass the 300 ms debounce so search filters fire immediately in tests
jest.mock('../hooks/useDebounce', () => ({
  useDebounce: (value: unknown) => value,
}));

jest.mock('../hooks/useCandidates');
const mockUseCandidates = useCandidates as jest.MockedFunction<typeof useCandidates>;

function renderPage(initialUrl = '/') {
  return render(
    <MemoryRouter initialEntries={[initialUrl]}>
      <CandidatesPage />
    </MemoryRouter>,
  );
}

describe('CandidatesPage', () => {
  it('shows the spinner while loading', () => {
    mockUseCandidates.mockReturnValue({ candidates: [], loading: true, error: null });
    renderPage();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders candidate cards once data is loaded', () => {
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderPage();
    expect(screen.getByText('Иванов Иван')).toBeInTheDocument();
    expect(screen.getByText('Петрова Мария')).toBeInTheDocument();
  });

  it('shows an error alert when fetching fails', () => {
    mockUseCandidates.mockReturnValue({
      candidates: [],
      loading: false,
      error: 'Ошибка загрузки данных',
    });
    renderPage();
    expect(screen.getByRole('alert')).toHaveTextContent('Ошибка загрузки данных');
  });

  it('shows the total candidate count', () => {
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderPage();
    expect(screen.getByText(/всего кандидатов/i)).toBeInTheDocument();
  });

  it('filters candidates by name as the user types', async () => {
    const user = userEvent.setup();
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderPage();

    await user.type(screen.getByPlaceholderText('Поиск по ФИО...'), 'Иванов');

    expect(screen.getByText('Иванов Иван')).toBeInTheDocument();
    expect(screen.queryByText('Петрова Мария')).not.toBeInTheDocument();
  });

  it('is case-insensitive when searching', async () => {
    const user = userEvent.setup();
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderPage();

    await user.type(screen.getByPlaceholderText('Поиск по ФИО...'), 'иванов');

    expect(screen.getByText('Иванов Иван')).toBeInTheDocument();
    expect(screen.queryByText('Петрова Мария')).not.toBeInTheDocument();
  });

  it('filters candidates by verdict', async () => {
    const user = userEvent.setup();
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderPage();

    await user.selectOptions(screen.getByLabelText('Фильтр по вердикту'), 'ПОДХОДИТ');

    expect(screen.getByText('Иванов Иван')).toBeInTheDocument();
    expect(screen.queryByText('Петрова Мария')).not.toBeInTheDocument();
  });

  it('shows "Найдено: N из M" after filtering', async () => {
    const user = userEvent.setup();
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderPage();

    await user.selectOptions(screen.getByLabelText('Фильтр по вердикту'), 'ПОДХОДИТ');

    expect(screen.getByText(/найдено/i)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows an empty state when no candidates match', async () => {
    const user = userEvent.setup();
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderPage();

    await user.type(screen.getByPlaceholderText('Поиск по ФИО...'), 'Нет такого');

    expect(screen.getByText('Кандидаты не найдены')).toBeInTheDocument();
  });
});
