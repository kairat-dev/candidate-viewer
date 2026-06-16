import type { CriterionStatus } from '../../types/candidate';

interface Props {
  criteria: [CriterionStatus, string][];
}

const criterionConfig: Record<CriterionStatus, { icon: string; iconClass: string; bgClass: string }> = {
  ok: {
    icon: '✓',
    iconClass: 'text-green-700 font-bold',
    bgClass: 'bg-green-50 border-green-100',
  },
  partial: {
    icon: '⚠',
    iconClass: 'text-amber-600 font-bold',
    bgClass: 'bg-amber-50 border-amber-100',
  },
  no: {
    icon: '✗',
    iconClass: 'text-red-600 font-bold',
    bgClass: 'bg-red-50 border-red-100',
  },
};

export function CriteriaList({ criteria }: Props) {
  return (
    <ul className="space-y-2">
      {criteria.map(([status, text], i) => {
        const { icon, iconClass, bgClass } = criterionConfig[status];
        return (
          <li key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${bgClass}`}>
            <span className={`text-sm flex-shrink-0 w-4 text-center mt-0.5 ${iconClass}`} aria-hidden="true">
              {icon}
            </span>
            <span className="text-sm text-gray-700">{text}</span>
          </li>
        );
      })}
    </ul>
  );
}
