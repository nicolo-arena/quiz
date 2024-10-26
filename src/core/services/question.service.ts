import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { CreateQuestionRequest, Question } from '../models/question.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private network: NetworkService) {}

  createQuestion(createQuestionRequest: CreateQuestionRequest): Observable<Question> {
    return this.network.post('/api/question/createquestion', createQuestionRequest) as Observable<Question>;
  }

  deleteQuestion(questionId: number): Observable<boolean> {
    return this.network.post(`/api/question/deletequestion?questionId=${questionId}`, {}) as Observable<boolean>;
  }

}
