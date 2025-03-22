export type BaseQuestion = {
  id: string;
  description: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox';
};

export type Question = BaseQuestion &
  (
    | {
        type: 'text' | 'textarea';
        props: {required: boolean; maxLength?: number};
      }
    | {
        type: 'radio' | 'checkbox';
        options: string[];
        props: {required: boolean};
      }
  );

export interface QuestionGroup {
  title: string;
  description?: string;
  questions: Question[];
}
