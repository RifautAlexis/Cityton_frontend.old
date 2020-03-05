import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IChallengeChat as ChallengeChat } from '@shared/models/ChallengeChat';

import { StatusChallenge } from '@shared/models/Enum';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  @Input() challenges: ChallengeChat[];

  @Output() toUpdateChallenge: EventEmitter<IUpdateChallenge> = new EventEmitter();

  statusChallenge: any = StatusChallenge; // Allow to use Enum in HTML

  constructor() { }

  ngOnInit() {
  }

  validate(challengeGivenId: number) {
    const data: IUpdateChallenge = {
      challengeGivenId: challengeGivenId,
      newStatus: StatusChallenge.Validated
    }

    this.toUpdateChallenge.emit(data);
  }

  reject(challengeGivenId: number) {
    const data: IUpdateChallenge = {
      challengeGivenId: challengeGivenId,
      newStatus: StatusChallenge.Validated
    }

    this.toUpdateChallenge.emit(data);
  }

  undo(challengeGivenId: number) {
    const data: IUpdateChallenge = {
      challengeGivenId: challengeGivenId,
      newStatus: StatusChallenge.InProgress
    }

    this.toUpdateChallenge.emit(data);
  }
}

  // **************** //

interface IUpdateChallenge {
  challengeGivenId: number,
  newStatus: StatusChallenge
}
