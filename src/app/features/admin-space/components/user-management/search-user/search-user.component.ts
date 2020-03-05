import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '@core/services/user.service';

import { IUser as User } from '@shared/models/User';
import { IUserToUpdate as UserToUpdate } from '@shared/models/UserToUpdate';
import { Role } from '@shared/models/Enum';
import { MatDialog } from '@angular/material';
import { EditUserComponent } from '../edit-user/edit-user.component';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})

export class SearchUserComponent implements OnInit {

  searchField: string;

  selectedSecurity: string = "All";
  users$: Observable<User[]>;
  users: User[];
  Role = Role;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  onChange(security: string) {
    this.selectedSecurity = security;
  }

  onSubmit() {

    let username: string = this.searchField ? this.searchField : "";

    this.users$ = this.userService.searchUser(username, this.selectedSecurity)
      .pipe(map((users: User[]) => {
        this.users = users;
        return users;
      }));
  }

  changeSecurityLevel(id: number, newSecurityLevel: string) {
    this.userService.changeSecurityLevel(id, Role[newSecurityLevel]);
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      () => {

      },
      (error) => {
        console.log(error);
      }
    );
  }

  async openEdit(userId: string) {
    let user: User = null;

    await this.userService.get(userId).then(
      (data: User) => {

        user = data;
      },
      err => console.log(err)
    );

    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '250px',
      data: user
    });

    dialogRef.afterClosed().subscribe((data: UserToUpdate) => {
      if (data) this.userService.update(data);
    });
  }

}
