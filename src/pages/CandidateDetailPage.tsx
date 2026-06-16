import { useParams, Link } from 'react-router-dom';
import { useCandidates } from '../hooks/useCandidates';
import { VerdictBadge } from '../components/VerdictBadge/VerdictBadge';
import { StatusBadge } from '../components/StatusBadge/StatusBadge';
import { CriteriaList } from '../components/CriteriaList/CriteriaList';
import { Spinner } from '../components/UI/Spinner';

export function CandidateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { candidates, loading, error } = useCandidates();

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Spinner />
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div role="alert" className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700">{error}</p>
        </div>
      </main>
    );
  }

  const candidate = candidates.find((c) => c.id === id);

  if (!candidate) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-xl font-semibold text-gray-700 mb-2">Кандидат не найден</p>
          <p className="text-gray-500 mb-6">
            Страница с id «{id}» не существует.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Вернуться к списку
          </Link>
        </div>
      </main>
    );
  }

  const stackItems = candidate.stack.split(',').map((s) => s.trim()).filter(Boolean);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <nav aria-label="Навигация" className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад к списку
        </Link>
      </nav>

      {/* Header */}
      <section aria-labelledby="candidate-name" className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h1 id="candidate-name" className="text-2xl font-bold text-gray-900">
              {candidate.name}
            </h1>
            <p className="text-gray-500 text-sm mt-1">{candidate.pos_label}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={candidate.status} />
            <VerdictBadge verdict={candidate.verdict} vc={candidate.vc} />
          </div>
        </div>
        {candidate.summary && (
          <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4 border border-gray-100">
            {candidate.summary}
          </p>
        )}
      </section>

      {/* Contacts + Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <section aria-labelledby="contacts-heading" className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 id="contacts-heading" className="text-base font-semibold text-gray-800 mb-4">
            Контакты
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${candidate.email}`} className="text-blue-600 hover:underline">
                {candidate.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${candidate.phone}`} className="text-blue-600 hover:underline">
                {candidate.phone}
              </a>
            </li>
            {candidate.tg && (
              <li className="flex items-center gap-3 text-sm">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                <span className="text-gray-700">{candidate.tg}</span>
              </li>
            )}
            <li className="flex items-center gap-3 text-sm">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-700">{candidate.city}</span>
            </li>
          </ul>
        </section>

        <section aria-labelledby="stack-heading" className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 id="stack-heading" className="text-base font-semibold text-gray-800 mb-4">
            Стек технологий
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {stackItems.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Образование</h3>
            <p className="text-sm text-gray-600">{candidate.edu}</p>
          </div>
        </section>
      </div>

      {/* Experience */}
      {candidate.exp.length > 0 && (
        <section aria-labelledby="exp-heading" className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
          <h2 id="exp-heading" className="text-base font-semibold text-gray-800 mb-4">
            Опыт работы —{' '}
            <span className="font-normal text-gray-600">{candidate.total_exp}</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 font-medium text-gray-500 whitespace-nowrap">Период</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">Место</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">Должность</th>
                  <th className="text-left py-2 font-medium text-gray-500 whitespace-nowrap">Длит.</th>
                </tr>
              </thead>
              <tbody>
                {candidate.exp.map(([period, company, role, duration], i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{period}</td>
                    <td className="py-3 pr-4 text-gray-800 font-medium">{company}</td>
                    <td className="py-3 pr-4 text-gray-600">{role}</td>
                    <td className="py-3 text-gray-500 whitespace-nowrap">{duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Criteria */}
      <section aria-labelledby="criteria-heading" className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
        <h2 id="criteria-heading" className="text-base font-semibold text-gray-800 mb-4">
          Критерии оценки
        </h2>
        <CriteriaList criteria={candidate.criteria} />
      </section>

      {/* Questions + Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {candidate.questions.length > 0 && (
          <section aria-labelledby="questions-heading" className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 id="questions-heading" className="text-base font-semibold text-gray-800 mb-4">
              Вопросы для собеседования
            </h2>
            <ol className="space-y-2.5 list-decimal list-inside">
              {candidate.questions.map((q, i) => (
                <li key={i} className="text-sm text-gray-700">
                  {q}
                </li>
              ))}
            </ol>
          </section>
        )}

        {candidate.summary && (
          <section aria-labelledby="summary-heading" className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 id="summary-heading" className="text-base font-semibold text-gray-800 mb-4">
              Резюме HR
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{candidate.summary}</p>
          </section>
        )}
      </div>
    </main>
  );
}
