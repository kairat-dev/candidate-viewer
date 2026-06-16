export type CriterionStatus = 'ok' | 'partial' | 'no';
export type Verdict = 'ПОДХОДИТ' | 'ЧАСТИЧНО' | 'НЕ ПОДХОДИТ';
export type VerdictClass = 'verdict-green' | 'verdict-orange' | 'verdict-red';
export type CandidateStatus = 'new' | 'reviewing' | 'interviewed';

export interface Candidate {
  id: string;
  name: string;
  position: string;
  pos_label: string;
  file?: string;
  email: string;
  phone: string;
  city: string;
  tg: string;
  exp: [string, string, string, string][];
  total_exp: string;
  stack: string;
  edu: string;
  verdict: Verdict;
  vc: VerdictClass;
  criteria: [CriterionStatus, string][];
  summary: string;
  questions: string[];
  status: CandidateStatus;
  createdAt: string;
}
