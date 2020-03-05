import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

import { IUserRegister as UserRegister } from '@shared/models/UserRegister';
import { IUser as User } from '@shared/models/User';

import {
  ExistUsernameValidator,
  ExistPhoneNumberValidator,
  ExistEmailValidator,
  equalPasswordsValidator
} from '@shared/form-validators/user';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private existUsernameValidator: ExistUsernameValidator,
    private existPhoneNumberValidator: ExistPhoneNumberValidator,
    private existEmailValidator: ExistEmailValidator,
    public dialogRef: MatDialogRef<SignupComponent>) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      username: ['',
        {
          validators: [
            Validators.required,
            Validators.minLength(3)
          ],
          asyncValidators: [this.existUsernameValidator.validate]
        }
      ],
      phoneNumber: ['',
        {
          validators: [
            Validators.minLength(10)
          ],
          asynValidators: [this.existPhoneNumberValidator.validate]
        }
      ],
      email: ['',
        {
          validators: [
            Validators.required,
            Validators.email
          ],
          asyncValidators: [this.existEmailValidator.validate]
        }
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirmPassword: ['', Validators.required]
    });

    this.registerForm.setValidators(equalPasswordsValidator);

  }

  onSubmit() {

    if (this.registerForm.invalid) {
      return;
    }

    let userRegister: UserRegister = {
      username: this.registerForm.controls.username.value,
      phoneNumber: this.registerForm.controls.phoneNumber.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
      companyId: 1
    };

    this.authService.register(userRegister)
      .subscribe(
        (token: string) => {
          this.router.navigate(['chat']);
        },
        (error: any) => {
          console.log(error);
        }
      );

    this.dialogRef.close();

  }

  cancel() {
    this.dialogRef.close();
  }

}
