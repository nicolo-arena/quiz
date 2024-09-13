import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import 'animate.css';
import { Question } from '../../core/models/question.model';
import { ScoreService } from '../../core/services/score.service';
import { QuestionService } from '../../core/services/question.service';

@Component({
  selector: 'app-prize',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit {

  questions: Question[] = [];
  rightAnswers: number = 0;
  totalAnswers: number = 0;

  constructor(private questionService: QuestionService, private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.getQuestions();
    this.countRightAnswers();
    this.saveScore();
  }

  getQuestions() {
    this.questions = this.questionService.getQuestions();
  }

  countRightAnswers() {
    this.rightAnswers = this.questions.filter(quest => quest.chosenOptionId === quest.options.find(opt => opt.right)?.id).length;
    this.totalAnswers = this.questions.length;
  }

  saveScore() {
    this.scoreService.saveScore({
      date: new Date(),
      rightAnswers: this.rightAnswers,
      totalAnswers: this.totalAnswers
    });
  }

}
