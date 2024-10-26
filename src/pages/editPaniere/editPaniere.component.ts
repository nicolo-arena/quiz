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
  questionImageBase64: string | undefined;
  answer1ImageBase64: string | undefined;
  answer2ImageBase64: string | undefined;
  answer3ImageBase64: string | undefined;
  answer4ImageBase64: string | undefined;
  correctAnswer: string = '0';

  isDragOver: boolean = false;

  constructor(private configService: ConfigService, private questionService: QuestionService) {}

  ngOnInit() {
    this.getConfig();
  }

  getConfig() {
    this.configService.getConfig().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(config => {
      this.paniere = config.currentPaniere;
      this.paniere!.questions = this.paniere?.questions.sort((q1,q2) => q1.creationDate > q2.creationDate ? -1 : 1);
    });
  }

  addQuestion() {

    const createAnswer1Request: CreateAnswerRequest = {
      text: this.answer1,
      imageBase64: this.answer1ImageBase64,
      correct: this.correctAnswer === '1'
    }

    const createAnswer2Request: CreateAnswerRequest = {
      text: this.answer2,
      imageBase64: this.answer2ImageBase64,
      correct: this.correctAnswer === '2'
    }

    const createAnswer3Request: CreateAnswerRequest = {
      text: this.answer3,
      imageBase64: this.answer3ImageBase64,
      correct: this.correctAnswer === '3'
    }

    const createAnswer4Request: CreateAnswerRequest = {
      text: this.answer4,
      imageBase64: this.answer4ImageBase64,
      correct: this.correctAnswer === '4'
    }

    const createQuestionRequest: CreateQuestionRequest = {
      questionText: this.questionText,
      questionImageBase64: this.questionImageBase64,
      answers: [createAnswer1Request, createAnswer2Request, createAnswer3Request, createAnswer4Request]
    };

    this.questionService.createQuestion(createQuestionRequest).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(question => {
      this.paniere!.questions.push(question);
      this.paniere!.questions = this.paniere?.questions.sort((q1,q2) => q1.creationDate > q2.creationDate ? -1 : 1)!;
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
    this.questionImageBase64 = undefined;
    this.answer1ImageBase64 = undefined;
    this.answer2ImageBase64 = undefined;
    this.answer3ImageBase64 = undefined;
    this.answer4ImageBase64 = undefined;
  }

  onDragOver(event: DragEvent, num: number): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent, num: number): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent, num: number): void {
    console.log('onDrop');
    event.preventDefault();

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.readFile(file, num);
    }
  }

  onFileSelected(event: Event, num: number) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      let file = input.files[0];
      console.log('Selected file:', file);
    
      this.readFile(file, num);
    }
  }

  readFile(file: File, num: number) {
    const reader = new FileReader();
      
      reader.onload = () => {
        const base64 = reader.result as string;
        let base64String = base64;
        console.log('Base64 string:', base64String);

        switch(num) {
          case 0:
            this.questionImageBase64 = base64String;
            break;
          case 1:
            this.answer1ImageBase64 = base64String;
            break;
          case 2:
            this.answer2ImageBase64 = base64String;
            break;
          case 3:
            this.answer3ImageBase64 = base64String;
            break;
          case 4:
            this.answer4ImageBase64 = base64String;
            break;
        }
      };

      reader.readAsDataURL(file);
  }

}
