import {Question} from './question';

export interface BaseQuiz {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'wizard-quiz';
}

export interface FormQuiz extends BaseQuiz {
  type: 'quiz';
  questions: Question[];
}

export interface WizardQuiz extends BaseQuiz {
  type: 'wizard-quiz';
  steps: number;
}

export type Quiz = FormQuiz | WizardQuiz;
