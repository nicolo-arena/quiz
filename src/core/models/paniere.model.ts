import { Question } from "./question.model";

export interface Paniere {
    paniereId: number;
    creationDate: Date;
    name: string;
    questions: Question[];
}