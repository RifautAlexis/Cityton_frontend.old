import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';

import { ChallengesRoutingModule } from './challenges-routing.module';

import { AllChallengesComponent } from './pages/all-challenges/all-challenges.component';
import { GlobalStatsComponent } from './pages/global-stats/global-stats.Component';
import { CreateChallengeComponent } from './pages/create-challenge/create-challenge.component';

@NgModule({
  declarations: [
    AllChallengesComponent,
    GlobalStatsComponent,
    CreateChallengeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChallengesRoutingModule
  ],
  entryComponents: [
  ],
  providers: [
  ],
})

export class ChallengesModule { }
