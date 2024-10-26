import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { QuestionComponent } from '../pages/test/test.component';
import { ResultsComponent } from '../pages/results/results.component';
import { ScoresComponent } from '../pages/scores/scores.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { EditPaniereComponent } from '../pages/editPaniere/editPaniere.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: 'full',
        redirectTo: "/home"
    },
    {
        path: "home",
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: "question",
        pathMatch: 'full',
        component: QuestionComponent
    },
    {
        path: "results",
        pathMatch: 'full',
        component: ResultsComponent
    },
    {
        path: "scores",
        pathMatch: 'full',
        component: ScoresComponent
    },
    {
        path: "settings",
        pathMatch: 'full',
        component: SettingsComponent
    },
    {
        path: "editPaniere",
        pathMatch: 'full',
        component: EditPaniereComponent
    },
];
