import { Answer } from "./answer.model";

export interface Question {
    questionId: number;
    creationDate: Date;
    questionText: string;
    questionImageBase64: string;
    answers: Answer[];
}