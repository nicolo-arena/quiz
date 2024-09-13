import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { Score } from '../../core/models/score.model';
import { RouterModule } from '@angular/router';
import { ScoreService } from '../../core/services/score.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoresComponent implements OnInit {

  scores: Score[] = [];
  downloadJsonHref: SafeUrl = '';

  constructor(private scoreService: ScoreService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getScores();
    this.exportAsJson();
  }

  getScores() {
    this.scores = this.scoreService.getScores();
    this.scores.sort((score1, score2) => score1.date < score2.date ? 1 : -1);
  }

  exportAsJson() {
    let theJSON = JSON.stringify(this.scores);
    let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }

  deleteScores() {
    this.scoreService.deleteAll();
    this.scores = [];
  }

}
