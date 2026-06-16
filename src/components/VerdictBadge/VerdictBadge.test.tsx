import { render, screen } from '@testing-library/react';
import { VerdictBadge } from './VerdictBadge';

describe('VerdictBadge', () => {
  it('renders the verdict text', () => {
    render(<VerdictBadge verdict="ПОДХОДИТ" vc="verdict-green" />);
    expect(screen.getByText('ПОДХОДИТ')).toBeInTheDocument();
  });

  it('applies green classes for verdict-green', () => {
    render(<VerdictBadge verdict="ПОДХОДИТ" vc="verdict-green" />);
    expect(screen.getByText('ПОДХОДИТ')).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('applies amber classes for verdict-orange', () => {
    render(<VerdictBadge verdict="ЧАСТИЧНО" vc="verdict-orange" />);
    const badge = screen.getByText('ЧАСТИЧНО');
    expect(badge).toHaveClass('bg-amber-100', 'text-amber-800');
  });

  it('applies red classes for verdict-red', () => {
    render(<VerdictBadge verdict="НЕ ПОДХОДИТ" vc="verdict-red" />);
    const badge = screen.getByText('НЕ ПОДХОДИТ');
    expect(badge).toHaveClass('bg-red-100', 'text-red-800');
  });
});
