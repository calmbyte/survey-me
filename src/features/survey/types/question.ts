export type Question = {
  id: string;
  text: string;
} & (
  | {type: 'text'; props: {required: boolean; maxLength?: number}}
  | {type: 'radio' | 'checkbox'; options: string[]; props: {required: boolean}}
);
