import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '@core/services/user.service';
import { AuthService } from '@core/services/auth.service';

import { IUser as User } from '@shared/models/User';
import { IUserToUpdate as UserToUpdate } from '@shared/models/UserToUpdate';

import { equalPasswordsValidator } from '@shared/form-validators/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @Input() connectedUser: User;

  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService) {


  }

  ngOnInit() {

    this.passwordForm = this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirmPassword: ['', Validators.required]
    });

    this.passwordForm.setValidators(equalPasswordsValidator);

  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    let password = this.passwordForm.controls.password.value;

    let user: UserToUpdate = {
      id: this.connectedUser.id,
      username: this.connectedUser.username,
      phoneNumber: this.connectedUser.phoneNumber,
      email: this.connectedUser.email,
      picture: this.connectedUser.picture,
      role: this.connectedUser.role,
      password: (password ? password : "")
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

  checkEqualPasswords(formGroup: FormGroup): ValidationErrors {

    let password: string = formGroup.controls.password.value;
    let confirmPassword: string = formGroup.controls.confirmPassword.value;

    console.log(password + " " + confirmPassword);
    console.log(password !== confirmPassword);

    return password === confirmPassword ? null : { passwordsNotEqual: true };
  }

}
