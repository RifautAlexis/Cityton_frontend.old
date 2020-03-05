import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

import { IUser as User } from '@shared/models/User';
import { Role } from '@shared/models/Enum';

@Injectable({ providedIn: 'root' })
export class IsAdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

    let isAdmin: boolean = this.authService.getUserRole() === Role.Admin;

    if (isAdmin) { return true; }

    this.router.navigate(['']);

    return false;
  }
}
