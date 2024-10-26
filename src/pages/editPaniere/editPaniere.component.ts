import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../core/services/config.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Paniere } from '../../core/models/paniere.model';
import { RouterLink } from '@angular/router';
import { CreateQuestionRequest, Question } from '../../core/models/question.model';
import { FormsModule } from '@angular/forms';
import { CreateAnswerRequest } from '../../core/models/answer.model';
import { QuestionService } from '../../core/services/question.service';

@Component({
  selector: 'app-edit-paniere',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './editPaniere.component.html',
  styleUrl: './editPaniere.component.css',
})
export class EditPaniereComponent implements OnInit {

  destroyRef = inject(DestroyRef);

  paniere: Paniere | undefined;

  questionText: string | undefined;
  answer1: string | undefined;
  answer2: string | undefined;
  answer3: string | undefined;
  answer4: string | undefined;
  correctAnswer: string = '0';

  constructor(private configService: ConfigService, private questionService: QuestionService) {}

  ngOnInit() {
    this.getConfig();
  }

  getConfig() {
    this.configService.getConfig().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(config => this.paniere = config.currentPaniere);
  }

  addQuestion() {

    const createAnswer1Request: CreateAnswerRequest = {
      text: this.answer1,
      imageBase64: undefined,
      correct: this.correctAnswer === '1'
    }

    const createAnswer2Request: CreateAnswerRequest = {
      text: this.answer2,
      imageBase64: undefined,
      correct: this.correctAnswer === '2'
    }

    const createAnswer3Request: CreateAnswerRequest = {
      text: this.answer3,
      imageBase64: undefined,
      correct: this.correctAnswer === '3'
    }

    const createAnswer4Request: CreateAnswerRequest = {
      text: this.answer4,
      imageBase64: undefined,
      correct: this.correctAnswer === '4'
    }

    const createQuestionRequest: CreateQuestionRequest = {
      questionText: this.questionText,
      questionImageBase64: undefined,
      answers: [createAnswer1Request, createAnswer2Request, createAnswer3Request, createAnswer4Request]
    };

    this.questionService.createQuestion(createQuestionRequest).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(question => {
      this.getConfig();
      this.resetNewQuestion();
    });
  }

  deleteQuestion(question: Question) {
    this.questionService.deleteQuestion(question.questionId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.getConfig();
    });
  }

  resetNewQuestion() {
    this.correctAnswer = '0';
    this.questionText = undefined;
    this.answer1 = undefined;
    this.answer2 = undefined;
    this.answer3 = undefined;
    this.answer4 = undefined;
  }

}
