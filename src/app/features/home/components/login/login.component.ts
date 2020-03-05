import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { IUserLogin as UserLogin } from '@shared/models/UserLogin';
import { IUser as User } from '@shared/models/User';

import { AuthService } from '@core/services/auth.service';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.required]
    });

  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    let userLogin: UserLogin = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };

    this.authService.login(userLogin.email, userLogin.password).subscribe(
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
