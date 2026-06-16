import type { CandidateStatus } from '../../types/candidate';

interface Props {
  status: CandidateStatus;
}

const statusConfig: Record<CandidateStatus, { label: string; className: string }> = {
  new: { label: 'Новый', className: 'bg-blue-100 text-blue-700' },
  reviewing: { label: 'На рассмотрении', className: 'bg-yellow-100 text-yellow-700' },
  interviewed: { label: 'Собеседован', className: 'bg-purple-100 text-purple-700' },
};

export function StatusBadge({ status }: Props) {
  const { label, className } = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
