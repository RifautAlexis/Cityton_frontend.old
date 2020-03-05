import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IGroupList as GroupList } from '@shared/models/GroupList';
import { IGroupDetails as GroupDetails } from '@shared/models/GroupDetails';
import { IGroup as Group } from '@shared/models/Group';
import { IGroupToEdit as GroupToEdit } from '@shared/models/GroupToEdit';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<GroupList> {
    return this.http.get<GroupList>(environment.apiUrl + 'group');
  }

  getDetails(groupId: number): Observable<GroupDetails> {
    return this.http.get<GroupDetails>(environment.apiUrl + 'group/' + groupId);
  }

  getMinimal(groupId: number): Observable<GroupToEdit> {
    return this.http.get<GroupToEdit>(environment.apiUrl + 'group/getInfosEdit/' + groupId);
  }

  membershipRequest(groupId): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'group/membershipRequest/', groupId);
  }

  acceptRequest(requestId): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'group/acceptRequest/', requestId);

  }

  declineRequest(requestId): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + 'group/declinRequest/' + requestId);

  }

  leaveGroup(requestId: number) {
    return this.http.delete<any>(environment.apiUrl + 'group/leaveGroup/' + requestId);
  }

  existName(name: string) {
    return this.http.get<boolean>(environment.apiUrl + 'group/existName/' + name);
  }

  createByMember(name: string, creatorId: number): Observable<number> {

    let group = {
      name: name,
      creatorId: creatorId
    }

    return this.http.post<number>(environment.apiUrl + 'group/createByMember', group);
  }

  createByAdmin(name: string, creatorId: number, membersId: number[]): Observable<number> {

    let group = {
      name: name,
      creatorId: creatorId,
      membersId: membersId
    }

    return this.http.post<number>(environment.apiUrl + 'group/createByAdmin', group);
  }

  edit(group: GroupToEdit): Observable<any>{
    return this.http.post<any>(environment.apiUrl + 'group/edit', group);
  }

  searchGroups(toSearch: string): Observable<Group[]> {

    let params = new HttpParams()
      .set('toSearch', toSearch)

    return this.http.get<Group[]>(environment.apiUrl + 'group/searchGroups', { params });
  }

  deleteGroup(groupId: string) {
    return this.http.delete(environment.apiUrl + 'group/' + groupId);
  }

  getMinorGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(environment.apiUrl + 'group/getMinorGroups');
  }

}
