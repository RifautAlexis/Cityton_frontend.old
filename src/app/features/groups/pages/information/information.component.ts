import { Component, OnInit } from '@angular/core';

import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';

import { IGroupDetails as GroupDetails } from '@shared/models/GroupDetails';
import { IGroupToEdit as GroupToEdit } from '@shared/models/GroupToEdit';

import { EditGroupsComponent } from '@shared/components/edit-groups/edit-groups.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  group: GroupDetails;
  creator: string;
  connectedUserId: number;

  isCreator: boolean = false;
  isMember: boolean = false;

  requestId: number = -1; // From membership if the connected user is member of this group, else -1

  constructor(
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.connectedUserId = this.authService.getUserId();

    this.refresh();

  }

  acceptRequest(requestId: number) {
    if (this.isCreator) {
      this.groupService.acceptRequest(requestId).subscribe();
      this.refresh();
    }
  }

  declineRequest(requestId: number) {
    if (this.isCreator) {
      this.groupService.declineRequest(requestId).subscribe();
      this.refresh();
    }
  }

  leaveGroup() {
    if (this.isMember) {
      this.groupService.leaveGroup(this.requestId).subscribe(
        () => {
          if (this.isCreator)
            this.router.navigate(['groups']);
          else
            this.refresh();
        }
      );
    }
  }

  openEditGroup(groupId: number): void {

    this.groupService.getMinimal(Number(groupId)).subscribe(
      (groupMinimal: GroupToEdit) => {

        const dialogRef = this.dialog.open(EditGroupsComponent, {
          width: '450px',
          data: groupMinimal
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result != null) this.groupService.edit(result).subscribe();
        });

      }
    );

  }

  private refresh() {

    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));

    this.groupService.getDetails(id).subscribe(
      (group: GroupDetails) => {

        this.group = group;
        this.isCreator = group.groupDetails.creatorId == this.connectedUserId;

        let currentMember: any = group.groupDetails.members.find(user => user.userId == this.connectedUserId); // GroupDetails.IUser
        if (currentMember !== undefined) {
          this.isMember = true;
          this.requestId = currentMember.requestId;

        } else {
          this.isMember = false;
          this.requestId = -1;
        }

      }
    );
  }

}
