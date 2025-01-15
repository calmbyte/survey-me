export type BaseQuestion = {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox';
};

export interface CheckboxQuestion extends BaseQuestion {
  type: 'checkbox';
  options: string[];
  props: {required: boolean};
}

export interface RadioQuestion extends BaseQuestion {
  type: 'radio';
  options: string[];
  props: {required: boolean};
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
  props: {required: boolean; maxLength?: number};
}

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
