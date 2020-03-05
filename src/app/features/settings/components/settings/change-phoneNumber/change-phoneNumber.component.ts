import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm, AbstractControl } from '@angular/forms';

import { UserService } from '@core/services/user.service';
import { AuthService } from '@core/services/auth.service';

import { IUser as User } from '@shared/models/User';
import { IUserToUpdate as UserToUpdate } from '@shared/models/UserToUpdate';

import { ExistPhoneNumberValidator } from '@shared/form-validators/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-phoneNumber',
  templateUrl: './change-phoneNumber.component.html',
  styleUrls: ['./change-phoneNumber.component.scss']
})

export class ChangePhoneNumberComponent implements OnInit {

  @Input() connectedUser: User;

  phoneNumberForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private existPhoneNumberValidator: ExistPhoneNumberValidator) { }

  ngOnInit() {

    this.phoneNumberForm = this.formBuilder.group({
      phoneNumber: [this.connectedUser.phoneNumber,
        {
          validators: [
            Validators.required,
            Validators.minLength(10)
          ],
          asyncValidators: [this.phoneNumberValidator]
        }
      ]
    });

  }

  onSubmit() {
    if (this.phoneNumberForm.invalid) {
      return;
    }

    let user: UserToUpdate = {
      id: this.connectedUser.id,
      username: this.connectedUser.username,
      phoneNumber: this.phoneNumberForm.controls.username.value,
      email: this.connectedUser.email,
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

  // ***************************************** //

  private phoneNumberValidator = (control: AbstractControl) => {
    return this.existPhoneNumberValidator.validateEdit(control, this.connectedUser.phoneNumber);
  };

}
