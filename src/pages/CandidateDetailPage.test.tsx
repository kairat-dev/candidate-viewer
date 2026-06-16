import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CandidateDetailPage } from './CandidateDetailPage';
import { useCandidates } from '../hooks/useCandidates';
import { mockCandidates } from '../__tests__/fixtures';

jest.mock('../hooks/useCandidates');
const mockUseCandidates = useCandidates as jest.MockedFunction<typeof useCandidates>;

function renderDetailPage(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/candidate/${id}`]}>
      <Routes>
        <Route path="/candidate/:id" element={<CandidateDetailPage />} />
        <Route path="/" element={<div>Список</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('CandidateDetailPage', () => {
  it('shows the spinner while loading', () => {
    mockUseCandidates.mockReturnValue({ candidates: [], loading: true, error: null });
    renderDetailPage('candidate-1');
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows an error alert when fetching fails', () => {
    mockUseCandidates.mockReturnValue({
      candidates: [],
      loading: false,
      error: 'Сервер недоступен',
    });
    renderDetailPage('candidate-1');
    expect(screen.getByRole('alert')).toHaveTextContent('Сервер недоступен');
  });

  it('renders the candidate name and position', () => {
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderDetailPage('candidate-1');
    expect(screen.getByRole('heading', { name: 'Иванов Иван' })).toBeInTheDocument();
    expect(screen.getByText('React — младший программист')).toBeInTheDocument();
  });

  it('renders contact details', () => {
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderDetailPage('candidate-1');
    expect(screen.getByText('ivanov@test.com')).toBeInTheDocument();
    expect(screen.getByText('+996 555 000 001')).toBeInTheDocument();
    expect(screen.getByText('@ivanov')).toBeInTheDocument();
    expect(screen.getByText('Бишкек')).toBeInTheDocument();
  });

  it('renders the experience table', () => {
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderDetailPage('candidate-1');
    expect(screen.getByText('Test Co')).toBeInTheDocument();
    expect(screen.getByText('Frontend-разработчик')).toBeInTheDocument();
    expect(screen.getByText('1 г.')).toBeInTheDocument();
  });

  it('does not render the experience section when exp is empty', () => {
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderDetailPage('candidate-2'); // candidate-2 has exp: []
    expect(screen.queryByText('Опыт работы')).not.toBeInTheDocument();
  });

  it('renders the criteria with correct icons', () => {
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderDetailPage('candidate-1');
    expect(screen.getByText('✓')).toBeInTheDocument();
    expect(screen.getByText('⚠')).toBeInTheDocument();
    expect(screen.getByText('React — есть')).toBeInTheDocument();
    expect(screen.getByText('TypeScript — базовый')).toBeInTheDocument();
  });

  it('renders the stack as individual chips', () => {
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderDetailPage('candidate-1');
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Git')).toBeInTheDocument();
  });

  it('renders interview questions', () => {
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderDetailPage('candidate-1');
    expect(screen.getByText('Что такое хук useEffect?')).toBeInTheDocument();
  });

  it('does not render the tg contact when tg is empty', () => {
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderDetailPage('candidate-2'); // candidate-2 has tg: ''
    expect(screen.queryByText('@')).not.toBeInTheDocument();
  });

  it('shows the 404 message for an unknown id', () => {
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderDetailPage('does-not-exist');
    expect(screen.getByText('Кандидат не найден')).toBeInTheDocument();
    expect(screen.getByText(/does-not-exist/)).toBeInTheDocument();
  });

  it('renders the "Назад к списку" back link', () => {
    mockUseCandidates.mockReturnValue({ candidates: mockCandidates, loading: false, error: null });
    renderDetailPage('candidate-1');
    expect(screen.getByRole('link', { name: /назад к списку/i })).toBeInTheDocument();
  });
});
