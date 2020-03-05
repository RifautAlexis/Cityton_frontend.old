import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services/auth.service';

import { IUser as User } from '@shared/models/User';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let currentToken: string = this.authService.currentTokenValue();

    if (currentToken) {

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentToken}`
        }
      });

    }

    return next.handle(request);
  }
}
