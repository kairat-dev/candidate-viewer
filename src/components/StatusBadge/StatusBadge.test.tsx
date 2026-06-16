import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders "Новый" for status new', () => {
    render(<StatusBadge status="new" />);
    expect(screen.getByText('Новый')).toBeInTheDocument();
  });

  it('renders "На рассмотрении" for status reviewing', () => {
    render(<StatusBadge status="reviewing" />);
    expect(screen.getByText('На рассмотрении')).toBeInTheDocument();
  });

  it('renders "Собеседован" for status interviewed', () => {
    render(<StatusBadge status="interviewed" />);
    expect(screen.getByText('Собеседован')).toBeInTheDocument();
  });

  it('applies the correct colour class for each status', () => {
    const { rerender } = render(<StatusBadge status="new" />);
    expect(screen.getByText('Новый')).toHaveClass('bg-blue-100');

    rerender(<StatusBadge status="reviewing" />);
    expect(screen.getByText('На рассмотрении')).toHaveClass('bg-yellow-100');

    rerender(<StatusBadge status="interviewed" />);
    expect(screen.getByText('Собеседован')).toHaveClass('bg-purple-100');
  });
});
