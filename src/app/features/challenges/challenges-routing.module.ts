import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllChallengesComponent } from './pages/all-challenges/all-challenges.component';
import { GlobalStatsComponent } from './pages/global-stats/global-stats.Component';
import { CreateChallengeComponent } from './pages/create-challenge/create-challenge.component';

import { IsMemberGuard } from '@core/guards/isMember.guard';

const routes: Routes = [
    { path: '', component: AllChallengesComponent, canActivate: [IsMemberGuard] },
    { path: 'stats', component: GlobalStatsComponent },
    { path: 'create', component: CreateChallengeComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ChallengesRoutingModule { }
