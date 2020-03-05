import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ChallengeService } from '@core/services/challenge.service';

import { IChallenge as Challenge } from '@shared/models/Challenge';
import { IGroupToEdit as GroupToEdit } from '@shared/models/GroupToEdit';

import { EditChallengesComponent } from '../edit-challenges/edit-challenges.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-search-challenges',
  templateUrl: './search-challenges.component.html',
  styleUrls: ['./search-challenges.component.scss']
})
export class SearchChallengesComponent implements OnInit {

  @Output() toEdit: EventEmitter<Challenge> = new EventEmitter();
  @Output() toDelete: EventEmitter<number> = new EventEmitter();
  @Output() toSearch: EventEmitter<string> = new EventEmitter();

  @Input() challengesSearched: Challenge[];
  @Input() searchField: string;

  constructor(
    private challengeService: ChallengeService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  onSubmit() {

    this.router.navigate(['admin/challenges'], { queryParams: { toSearch: this.searchField } });

    this.toSearch.emit(this.searchField);
  }

  openEdit(challengeId: number): void {

    const dialogRef = this.dialog.open(EditChallengesComponent, {
      width: '450px',
      data: this.challengesSearched.find(ch => ch.id === challengeId)
    });

    dialogRef.afterClosed().subscribe((result: Challenge) => {
      if (result != null) this.toEdit.emit(result);
    });

  }

  delete(challengeId: number) {
    this.toDelete.emit(challengeId);
  }

}
