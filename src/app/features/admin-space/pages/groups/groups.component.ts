import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { GroupService } from '@core/services/group.service';

import { IGroup as Group } from '@shared/models/Group';
import { IGroupToEdit as GroupToEdit } from '@shared/models/GroupToEdit';
import { IGroupDetails as GroupDetails } from '@shared/models/GroupDetails';

import { CreateGroupsComponent } from './../../components/groups/create-groups/create-groups.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  minorGroups$: Observable<Group[]>;
  minorGroups: Group[];

  groups$: Observable<Group[]> = of([]);
  searchField: string = "";

  constructor(
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.refreshMinorGroups();

    this.searchField = this.route.snapshot.queryParamMap.get('toSearch');

    if (this.searchField !== "" && this.searchField !== null && this.searchField.length !== 0) {
      this.search();
    }
  }

  deleteGroup(groupId: string) {
    this.groupService.deleteGroup(groupId).subscribe(
      () => {
        if (this.minorGroups.find(g => g.id === Number(groupId))) {
          this.refreshMinorGroups();
        }
      }
    );

  }

  openCreateGroup(): void {
    const dialogRef = this.dialog.open(CreateGroupsComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result !== undefined) {
        let creatorId: number = result.creator;

        let membersWithoutCreator: Array<number> = result.members;
        membersWithoutCreator = membersWithoutCreator.filter(id => id !== creatorId);

        this.groupService.createByAdmin(result.name, creatorId, membersWithoutCreator).subscribe();
      }

    });
  }

  editGroup(data: any) {
    this.groupService.edit(data).subscribe(
      (groupDetails: any) => {
        this.refreshMinorGroups();
      }
    );
  }

  private refreshMinorGroups() {
    this.groupService.getMinorGroups().subscribe(
      (groups: Group[]) => {
        this.minorGroups$ = of(groups);
        this.minorGroups = groups;
      }
    );
  }

  private search() {
    this.groups$ = this.groupService.searchGroups(this.searchField);
  }

  private searchGroup(toSearch: string) {
    this.searchField = toSearch;

    this.search();
  }

}
