import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import 'animate.css';
import { Question } from '../../core/models/question.model';
import { PaniereService } from '../../core/services/paniere.service';

import { ConfigService } from '../../core/services/config.service';
import { Config } from '../../core/models/config.model';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Answer } from '../../core/models/answer.model';
import { CompleteTestRequest, Test } from '../../core/models/test.model';
import { TestService } from '../../core/services/test.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class QuestionComponent implements OnInit {

  destroyRef = inject(DestroyRef);

  config: Config | undefined;
  test: Test | undefined;

  questionNr: number = 0;
  selectedAnswerId: number | undefined;

  maxProgress: number = 0;

  constructor (
    private router: Router, 
    private configService: ConfigService,
    private testService: TestService
  ) {}

  get currentQuestion() {
    return this.test?.testQuestions[this.questionNr];
  }

  ngOnInit(): void {
    this.getConfig();
    this.startTest();
  }

  getConfig() {
    this.configService.getConfig().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(config => this.config = config);
  }

  startTest() {
    this.testService.createTest().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(test => {
      this.test = test;
      this.resetQuestion();
      this.randomSortAnswers();
    });
  }

  shuffle = (array: Object[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  };


  randomSortAnswers() {
    if (this.test) {
      this.test.testQuestions[this.questionNr].question.answers = this.shuffle(this.test.testQuestions[this.questionNr].question.answers) as Answer[];
    }
  }

  setTitleAndOptions() {
    if (this.test) {
      this.test.testQuestions[this.questionNr].question.questionText = this.test.testQuestions[this.questionNr].question.questionText.replaceAll("\n", "<br>");
      this.test.testQuestions[this.questionNr].question.answers.forEach((ans, index) => {
        ans.text = ans.text.replaceAll("\n", "<br>");
        this.test!.testQuestions[this.questionNr].question.answers[index] = ans;
      });
    }
  }

  selectAnswer(answer: Answer) {
    if (this.test) {
      if (this.selectedAnswerId === answer.answerId) {
        // deselect answer
        this.selectedAnswerId = undefined;
        this.test.testQuestions[this.questionNr].givenAnswerId = undefined;
      } else {
        this.selectedAnswerId = answer.answerId;
        this.test.testQuestions[this.questionNr].givenAnswerId = answer.answerId;
      }
    }
  }

  nextQuestion() {
    if (this.test) {
      this.test.testQuestions[this.questionNr].givenAnswerId = this.selectedAnswerId;
      if (this.questionNr < this.test.testQuestions.length-1) {
        this.questionNr++;
        this.maxProgress = Math.max(this.questionNr, this.maxProgress);
        this.resetQuestion();
        if (this.selectedAnswerId === undefined && this.questionNr == this.maxProgress) {
          this.randomSortAnswers();
        }
      } else {
        this.completeTest();
      }
    }
  }

  previousQuestion() {
    if (this.questionNr > 0) {
      this.questionNr--;
      this.resetQuestion();
    } else {
      this.router.navigateByUrl(`/home`);
    }
  }

  resetQuestion() {
    this.setTitleAndOptions();
    this.selectedAnswerId = this.test?.testQuestions[this.questionNr].givenAnswerId;
  }

  completeTest() {
    const answers: {testQuestionId: number, givenAnswerId?: number}[] = [];
    this.test?.testQuestions.forEach(tq => {
      answers.push({
        testQuestionId: tq.testQuestionId,
        givenAnswerId: tq.givenAnswerId
      });
    });
    const completeTestRequest: CompleteTestRequest = {
      testId: this.test?.testId ?? 0,
      answers
    }
    this.testService.completeTest(completeTestRequest).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(test => {
      this.test = test;
      this.router.navigateByUrl(`/results`, {state: {
        test: this.test,
        config: this.config
      }});
    });
  }
  
}
