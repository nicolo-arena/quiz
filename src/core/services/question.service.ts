import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  saveQuestions(questions: Question[]) {
    localStorage.setItem('questions', JSON.stringify(questions));
  }

  getQuestions(): Question[] {
    return JSON.parse(localStorage.getItem('questions') ?? '[]') as Question[];
  }

  getQuestion(questionId: number): Question {
    return this.getQuestions().find(quest => quest.id === questionId) ?? {} as Question;
  }

  saveQuestion(question: Question) {
    const questions = this.getQuestions();
    const questionIndex = questions.findIndex(quest => quest.id === question.id);
    questions[questionIndex] = question;
    this.saveQuestions(questions);
  }

}
