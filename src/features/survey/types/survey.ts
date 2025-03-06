import {Question} from './question';

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
  questions: Question[][];
}

export type Survey = FormSurvey | WizardSurvey;
