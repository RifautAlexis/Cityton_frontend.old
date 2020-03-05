import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material';

import { AuthService } from '@core/services/auth.service';

import { LoginComponent } from '@features/home/components/login/login.component';
import { SignupComponent } from '@features/home/components/signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.currentTokenValue()) {
      this.router.navigate(['chat']);
    }
  }

  openLogin(): void {
    this.dialog.open(LoginComponent, {
      width: 'auto'
    });
  }

  openSignup(): void {
    this.dialog.open(SignupComponent, {
      width: 'auto'
    });
  }

}
