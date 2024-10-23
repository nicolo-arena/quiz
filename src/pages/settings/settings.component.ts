import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import 'animate.css';
import { ConfigService } from '../../core/services/config.service';
import { Config, EditConfigRequest } from '../../core/models/config.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Paniere } from '../../core/models/paniere.model';
import { PaniereService } from '../../core/services/paniere.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: `./settings.component.html`,
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  
  destroyRef = inject(DestroyRef);

  panieri: Paniere[] = [];
  config: Config | undefined;
  alg: string = localStorage.getItem('algorithm') ?? 'random';

  constructor(private configService: ConfigService, private paniereService: PaniereService) {}

  ngOnInit() {
    this.getConfig();
    this.getPanieri();
  }

  getConfig() {
    this.configService.getConfig().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(config => this.config = config);
  }

  getPanieri() {
    this.paniereService.getPanieri().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(panieri => this.panieri = panieri);
  }

  selectPaniere(event: Event) {
    const paniereId: number = (event.target as any).value;
    if (this.config) {
      const editConfigRequest: EditConfigRequest = {
        paniereId
      };
      this.configService.editConfig(editConfigRequest).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(config => this.config = config);
    }
  }

  selectQuestionsNumber(event: Event) {
    const questionsPerTest: number = (event.target as any).value;
    if (this.config) {
      const editConfigRequest: EditConfigRequest = {
        questionsPerTest
      };
      this.configService.editConfig(editConfigRequest).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(config => this.config = config);
    }
  }

  selectRightQuestionsNumber(event: Event) {
    const minCorrectAnswers: number = (event.target as any).value;
    if (this.config) {
      const editConfigRequest: EditConfigRequest = {
        minCorrectAnswers
      };
      this.configService.editConfig(editConfigRequest).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(config => this.config = config);
    }
  }

  selectAlgorithm(alg: string) {
    localStorage.setItem('algorithm', alg);
  }

  
}
