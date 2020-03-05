import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

import { IUser as User } from '@shared/models/User';

@Injectable({ providedIn: 'root' })
export class IsNotConnectedGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let currentToken: User;

    this.authService.currentTokenValue();

    if (!currentToken) { return true; }

    // this.router.navigate(['']);

    return false;
  }

}
