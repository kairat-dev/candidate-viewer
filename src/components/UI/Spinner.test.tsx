import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders a loading indicator with role="status"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has the correct aria-label', () => {
    render(<Spinner />);
    expect(screen.getByLabelText('Загрузка')).toBeInTheDocument();
  });
});
