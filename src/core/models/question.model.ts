import { Answer, CreateAnswerRequest } from "./answer.model";

export interface Question {
    questionId: number;
    creationDate: Date;
    questionText?: string;
    questionImageBase64?: string;
    answers: Answer[];
}

export interface CreateQuestionRequest {
    questionText?: string;
    questionImageBase64?: string;
    answers: CreateAnswerRequest[];
}