import {Question, QuestionGroup} from './question';

export interface BaseSurvey {
  id: string;
  title: string;
  description: string;
  type: 'form' | 'wizard-form';
}

export interface FormSurvey extends BaseSurvey {
  type: 'form';
  questions: Question[];
}

export interface WizardSurvey extends BaseSurvey {
  type: 'wizard-form';
  steps: number;
  question_groups: QuestionGroup[];
}

export type Survey = FormSurvey | WizardSurvey;
