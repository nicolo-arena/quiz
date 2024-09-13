import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import myLocaleIt from '@angular/common/locales/it'

import {registerLocaleData} from '@angular/common';

registerLocaleData(myLocaleIt);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {provide: LOCALE_ID, useValue: 'it'}
  ],
})
export class AppComponent {
  title = 'quiz';
}
