import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { GroupService } from '@core/services/group.service';

import { IGroup as Group } from '@shared/models/Group';
import { IGroupToEdit as GroupToEdit } from '@shared/models/GroupToEdit';

import { EditGroupsComponent } from '@shared/components/edit-groups/edit-groups.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search-groups',
  templateUrl: './search-groups.component.html',
  styleUrls: ['./search-groups.component.scss']
})
export class SearchGroupsComponent implements OnInit {

  @Output() toEdit: EventEmitter<GroupToEdit> = new EventEmitter();
  @Output() parentDeleteGroup: EventEmitter<number> = new EventEmitter();
  @Output() toSearch: EventEmitter<string> = new EventEmitter();

  @Input() groups: Group[];
  @Input() searchField: string;

  constructor(
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  onSubmit() {

    this.router.navigate(['admin/groups'], { queryParams: {toSearch: this.searchField} });

    this.toSearch.emit(this.searchField);
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
