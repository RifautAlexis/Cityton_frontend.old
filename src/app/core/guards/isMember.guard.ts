import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

import { Role } from '@shared/models/Enum';

@Injectable({ providedIn: 'root' })
export class IsMemberGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

    let isMember: boolean = this.authService.getUserRole() === Role.Member;

    if (isMember) { return true; }

    this.router.navigate(['challenges/stats']);

    return false;
  }
}
