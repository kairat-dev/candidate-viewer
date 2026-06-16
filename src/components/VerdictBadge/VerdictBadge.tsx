import type { Verdict, VerdictClass } from '../../types/candidate';

interface Props {
  verdict: Verdict;
  vc: VerdictClass;
}

const vcStyles: Record<VerdictClass, string> = {
  'verdict-green': 'bg-green-100 text-green-800 border-green-200',
  'verdict-orange': 'bg-amber-100 text-amber-800 border-amber-200',
  'verdict-red': 'bg-red-100 text-red-800 border-red-200',
};

export function VerdictBadge({ verdict, vc }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${vcStyles[vc]}`}>
      {verdict}
    </span>
  );
}
