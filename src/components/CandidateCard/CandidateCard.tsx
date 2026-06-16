import { Link } from 'react-router-dom';
import type { Candidate } from '../../types/candidate';
import { VerdictBadge } from '../VerdictBadge/VerdictBadge';
import { StatusBadge } from '../StatusBadge/StatusBadge';

interface Props {
  candidate: Candidate;
}

export function CandidateCard({ candidate }: Props) {
  return (
    <Link
      to={`/candidate/${candidate.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug">
          {candidate.name}
        </h2>
        <VerdictBadge verdict={candidate.verdict} vc={candidate.vc} />
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{candidate.city}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{candidate.total_exp}</span>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{candidate.stack}</p>

      <StatusBadge status={candidate.status} />
    </Link>
  );
}
