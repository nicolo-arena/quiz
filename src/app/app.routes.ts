import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { QuestionComponent } from '../pages/question/question.component';
import { ResultsComponent } from '../pages/results/results.component';
import { ScoresComponent } from '../pages/scores/scores.component';
import { SettingsComponent } from '../pages/settings/settings.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: 'full',
        redirectTo: "/home"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "question",
        component: QuestionComponent
    },
    {
        path: "results",
        component: ResultsComponent
    },
    {
        path: "scores",
        component: ScoresComponent
    },
    {
        path: "settings",
        component: SettingsComponent
    },
];
