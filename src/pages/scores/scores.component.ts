import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Test } from '../../core/models/test.model';
import { TestService } from '../../core/services/test.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.css'
})
export class ScoresComponent implements OnInit {

  tests: Test[] = [];

  destroyRef = inject(DestroyRef);

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.getTests();
  }

  getTests() {
    this.testService.getTests().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(tests => {
      this.tests = tests;
      this.tests.sort((t1,t2) => t1.creationDate < t2.creationDate ? 1 : -1);
    });
  }

}
