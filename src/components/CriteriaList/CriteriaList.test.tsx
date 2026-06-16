import { render, screen } from '@testing-library/react';
import { CriteriaList } from './CriteriaList';
import type { CriterionStatus } from '../../types/candidate';

const criteria: [CriterionStatus, string][] = [
  ['ok', 'React — есть'],
  ['partial', 'TypeScript — базовый'],
  ['no', 'Коммерческий опыт — нет'],
];

describe('CriteriaList', () => {
  it('renders all criteria items', () => {
    render(<CriteriaList criteria={criteria} />);
    expect(screen.getByText('React — есть')).toBeInTheDocument();
    expect(screen.getByText('TypeScript — базовый')).toBeInTheDocument();
    expect(screen.getByText('Коммерческий опыт — нет')).toBeInTheDocument();
  });

  it('shows ✓ icon for ok status', () => {
    render(<CriteriaList criteria={[['ok', 'React — есть']]} />);
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('shows ⚠ icon for partial status', () => {
    render(<CriteriaList criteria={[['partial', 'TypeScript — базовый']]} />);
    expect(screen.getByText('⚠')).toBeInTheDocument();
  });

  it('shows ✗ icon for no status', () => {
    render(<CriteriaList criteria={[['no', 'Опыт — нет']]} />);
    expect(screen.getByText('✗')).toBeInTheDocument();
  });

  it('applies green background for ok status', () => {
    render(<CriteriaList criteria={[['ok', 'React — есть']]} />);
    // The li wrapping the ok criterion has a green background class
    expect(screen.getByText('React — есть').closest('li')).toHaveClass('bg-green-50');
  });

  it('applies amber background for partial status', () => {
    render(<CriteriaList criteria={[['partial', 'TypeScript — базовый']]} />);
    expect(screen.getByText('TypeScript — базовый').closest('li')).toHaveClass('bg-amber-50');
  });

  it('applies red background for no status', () => {
    render(<CriteriaList criteria={[['no', 'Опыт — нет']]} />);
    expect(screen.getByText('Опыт — нет').closest('li')).toHaveClass('bg-red-50');
  });

  it('renders an empty list when criteria is empty', () => {
    render(<CriteriaList criteria={[]} />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
