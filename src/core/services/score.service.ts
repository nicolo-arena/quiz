import { Injectable } from '@angular/core';
import { Score } from '../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor() { }

  saveScores(scores: Score[]) {
    localStorage.setItem('scores', JSON.stringify(scores));
  }

  getScores(): Score[] {
    return JSON.parse(localStorage.getItem('scores') ?? '[]') as Score[];
  }

  saveScore(score: Score) {
    const scores = this.getScores();
    scores.push(score);
    this.saveScores(scores);
  }

  deleteAll() {
    this.saveScores([]);
  }

}
