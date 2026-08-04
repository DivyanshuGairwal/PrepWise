export type QuestionType = 'technical' | 'resume'  | 'hr';

export interface Question {
  id: string;
  question: string;
  whyAsked: string;
}

export interface AnalysisResult {
  summary: string;
  roleMatch: number;
  technical: Question[];
  resume: Question[];
  hr: Question[];
}

export interface AnalysisResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}
