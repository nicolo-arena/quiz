import { Paniere } from "./paniere.model";

export interface Config {
    configId: number;
    currentPaniere: Paniere;
    questionsPerTest: number;
    minCorrectAnswers: number;
}

export interface EditConfigRequest {
    paniereId?: number;
    questionsPerTest?: number;
    minCorrectAnswers?: number;
}