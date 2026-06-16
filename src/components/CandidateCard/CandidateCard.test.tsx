import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CandidateCard } from './CandidateCard';
import { mockCandidates } from '../../__tests__/fixtures';

const [candidate] = mockCandidates;

function renderCard() {
  return render(
    <MemoryRouter>
      <CandidateCard candidate={candidate} />
    </MemoryRouter>,
  );
}

describe('CandidateCard', () => {
  it('renders the candidate name', () => {
    renderCard();
    expect(screen.getByText('Иванов Иван')).toBeInTheDocument();
  });

  it('renders the city', () => {
    renderCard();
    expect(screen.getByText('Бишкек')).toBeInTheDocument();
  });

  it('renders the total experience', () => {
    renderCard();
    expect(screen.getByText('~1 г.')).toBeInTheDocument();
  });

  it('renders the stack', () => {
    renderCard();
    expect(screen.getByText('React, TypeScript, Git')).toBeInTheDocument();
  });

  it('renders the verdict badge', () => {
    renderCard();
    expect(screen.getByText('ПОДХОДИТ')).toBeInTheDocument();
  });

  it('renders the status badge', () => {
    renderCard();
    expect(screen.getByText('Новый')).toBeInTheDocument();
  });

  it('links to the correct candidate detail page', () => {
    renderCard();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/candidate/candidate-1');
  });
});
