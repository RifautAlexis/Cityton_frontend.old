import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '@core/services/user.service';
import { AuthService } from '@core/services/auth.service';

import { IUser as User } from '@shared/models/User';
import { IUserToUpdate as UserToUpdate } from '@shared/models/UserToUpdate';
import { ExistEmailValidator } from '@shared/form-validators/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})

export class ChangeEmailComponent implements OnInit {

  @Input() connectedUser: User;

  emailForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private existEmailValidator: ExistEmailValidator) { }

  ngOnInit() {

    this.emailForm = this.formBuilder.group({
      email: ['',
        {
          validators: [
            Validators.required,
            Validators.email
          ],
          asyncValidators: [this.existEmailValidator.validate]
        }
      ]
    });

  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    }

    let user: UserToUpdate = {
      id: this.connectedUser.id,
      username: this.connectedUser.username,
      phoneNumber: this.connectedUser.phoneNumber,
      email: this.emailForm.controls.email.value,
      picture: this.connectedUser.picture,
      role: this.connectedUser.role,
      password: ""
    };

    this.userService.update(user).subscribe(
      (user: User) => {
        // this.router.navigate(['chat']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cancel(formToReset: FormGroup) {
    formToReset.reset();
  }

}
