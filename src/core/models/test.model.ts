import { Paniere } from "./paniere.model";
import { Question } from "./question.model";

export interface Test {
    testId: number;
    creationDate: number;
    testQuestions: TestQuestion[];
    score: number;
    minScore: number;
    paniere: Paniere;
}

export interface TestQuestion {
    testQuestionId: number;
    question: Question;
    givenAnswerId?: number;
}

export interface CompleteTestRequest {
    testId: number;
    answers: {testQuestionId: number, givenAnswerId?: number}[];
}