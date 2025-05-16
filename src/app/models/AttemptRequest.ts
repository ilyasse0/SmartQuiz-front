export  interface AttemptRequest {
  qcmSetId: number;
  answers: {
    questionId: number;
    selectedOption: number;
  }[];
}
