export interface Answer {
    answerId: number;
    text?: string;
    imageBase64?: string;
    correct: boolean;
}

export interface CreateAnswerRequest {
    text?: string;
    imageBase64?: string;
    correct: boolean;
}