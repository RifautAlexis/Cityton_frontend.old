import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ChallengeService } from '@core/services/challenge.service';

import { IChallenge as Challenge } from '@shared/models/Challenge';

@Component({
  selector: 'app-waiting-approval',
  templateUrl: './waiting-approval.component.html',
  styleUrls: ['./waiting-approval.component.scss']
})
export class WaitingApprovalComponent implements OnInit {

  @Output() toValidate: EventEmitter<number> = new EventEmitter();
  @Output() toDelete: EventEmitter<number> = new EventEmitter();

  @Input() challengesToApprove: Challenge[];

  constructor() { }

  ngOnInit() {
  }

  validate(challengeId: number) {
    this.toValidate.emit(challengeId);
  }

  delete(challengeId: number) {
    this.toDelete.emit(challengeId);
  }

}
