export type QuestionType = 'technical' | 'resume' | 'behavioral' | 'hr';

export interface Question {
  id: string;
  question: string;
  whyAsked: string;
  suggestedApproach: string;
  keyPoints: string[];
}

export interface AnalysisResult {
  summary: string;
  roleMatch: number;
  technical: Question[];
  resume: Question[];
  behavioral: Question[];
  hr: Question[];
}

export interface AnalysisResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}
