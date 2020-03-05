import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ChallengeService } from '@core/services/challenge.service';

import { IChallenge as Challenge } from '@shared/models/Challenge';

@Component({
  selector: 'app-all-challenges',
  templateUrl: './all-challenges.component.html',
  styleUrls: ['./all-challenges.component.scss']
})
export class AllChallengesComponent implements OnInit {

  challengeList$: Observable<Challenge[]>;
  unlockedChallenges: Challenge[];
  lockedChallenges: Challenge[];

  nbUnlockedChallenges: number;
  nbLockedChallenges: number;
  percentSucceedChallenges: number;

  constructor(private challengeService: ChallengeService) { }

  ngOnInit() {
    this.challengeList$ = this.challengeService.getAll();

    this.challengeList$.subscribe(
      (challenges: Challenge[]) => {
        this.unlockedChallenges = challenges.filter(ch => ch.unlockedAt !== null);
        this.lockedChallenges = challenges.filter(ch => ch.unlockedAt === null);

        this.nbUnlockedChallenges = this.unlockedChallenges !== undefined && this.unlockedChallenges.length > 0 ? this.unlockedChallenges.length : 0 ;
        this.nbLockedChallenges = this.lockedChallenges !== undefined && this.lockedChallenges.length > 0 ? this.lockedChallenges.length : 0 ;
        this.percentSucceedChallenges = this.nbUnlockedChallenges / (this.nbUnlockedChallenges + this.nbLockedChallenges);
      }
    );
  }

}
