import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

import { IUser as User } from '@shared/models/User';

@Injectable({ providedIn: 'root' })
export class IsConnectedGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

    let currentToken: string = this.authService.currentTokenValue();

    if (currentToken) { return true; }

    this.router.navigate(['']);

    return false;
  }
}
