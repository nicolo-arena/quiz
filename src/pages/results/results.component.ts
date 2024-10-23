import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import 'animate.css';
import { Test } from '../../core/models/test.model';
import { Config } from '../../core/models/config.model';

@Component({
  selector: 'app-prize',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {

  test: Test | undefined;
  score: number = 0;
  totalQuestions: number = 0;
  config: Config | undefined;

  constructor() {}

  ngOnInit(): void {
    this.readTestFromState();
  }

  readTestFromState() {
    this.test = history.state['test'];
    this.config = history.state['config'];
    this.score = this.test?.score ?? 0;
    this.totalQuestions = this.test?.testQuestions.length ?? 0;
  }

}
