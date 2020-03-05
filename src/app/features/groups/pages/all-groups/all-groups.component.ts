import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { GroupService } from '@core/services/group.service';

import { IGroupList as GroupList } from '@shared/models/GroupList';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit {

  groupList$: Observable<GroupList>;

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
    this.groupList$ = this.groupService.getAll();
  }

  sendRequest(groupId: string) {
      this.groupService.membershipRequest(groupId).subscribe();
  }



}
