import {Question} from './question';

export interface Survey {
  id: string;
  title: string;
  description: string;
  type: 'form' | 'quiz' | 'progress-form';
  questions: Question[];
}
