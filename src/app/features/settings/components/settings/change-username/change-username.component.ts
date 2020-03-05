import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm, AbstractControl } from '@angular/forms';

import { UserService } from '@core/services/user.service';
import { AuthService } from '@core/services/auth.service';

import { IUser as User } from '@shared/models/User';
import { IUserToUpdate as UserToUpdate } from '@shared/models/UserToUpdate';
import { ExistUsernameValidator } from '@shared/form-validators/user';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss']
})
export class ChangeUsernameComponent implements OnInit {

  @Input() connectedUser: User;

  usernameForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private existUsernameValidator: ExistUsernameValidator) { }

  ngOnInit() {

    this.usernameForm = this.formBuilder.group({
      username: [this.connectedUser.username,
        {
          validators: [
            Validators.required,
            Validators.minLength(3)
          ],
          asyncValidators: [this.usernameValidator]
        }
      ]
    });

  }

  onSubmit() {
    if (this.usernameForm.invalid) {
      return;
    }

    let user: UserToUpdate = {
      id: this.connectedUser.id,
      username: this.usernameForm.controls.username.value,
      phoneNumber: this.connectedUser.phoneNumber,
      email: this.connectedUser.email,
      picture: this.connectedUser.picture,
      role: this.connectedUser.role,
      password: ""
    };

    this.userService.update(user).subscribe(
      (data: User) => {
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

  // ***************************************** //

  private usernameValidator = (control: AbstractControl) => {
    return this.existUsernameValidator.validateEdit(control, this.connectedUser.username);
  };

}
