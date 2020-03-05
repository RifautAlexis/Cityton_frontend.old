import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GroupService } from '@core/services/group.service';

import { IGroup as Group } from '@shared/models/Group';
import { IGroupToEdit as GroupToEdit } from '@shared/models/GroupToEdit';

import { EditGroupsComponent } from '@shared/components/edit-groups/edit-groups.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-minor-groups',
  templateUrl: './minor-groups.component.html',
  styleUrls: ['./minor-groups.component.scss']
})
export class MinorGroupsComponent implements OnInit {

  @Output() toEdit: EventEmitter<GroupToEdit> = new EventEmitter();

  @Output() parentDeleteGroup: EventEmitter<number> = new EventEmitter();

  @Input() minorGroups: Group[];

  constructor(
    private groupService: GroupService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  openEditGroup(groupId: number): void {

    this.groupService.getMinimal(Number(groupId)).subscribe(
      (groupMinimal: GroupToEdit) => {

        const dialogRef = this.dialog.open(EditGroupsComponent, {
          width: '450px',
          data: groupMinimal
        });

        dialogRef.afterClosed().subscribe((result: GroupToEdit) => {
          if (result != null) this.toEdit.emit(result);
        });

      }
    );

  }

  deleteGroup(groupId: string) {
    this.parentDeleteGroup.emit(Number(groupId));
  }

}
