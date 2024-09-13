import { Option } from "./option.model";

export interface Question {
    id: number;
    title: string;
    options: Option[];
    chosenOptionId?: number;
}