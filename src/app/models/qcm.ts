export interface QcmSetDtoToAttempt  {
  qcmSetId: number;
  title: string;
  topic: string;
  questions: Question[];
}

export interface Question {
  questionId: number;
  content: string;
  options: Option[];
}

export interface Option {
  optionId: number;
  optionLabel: string;
  text: string;
}
