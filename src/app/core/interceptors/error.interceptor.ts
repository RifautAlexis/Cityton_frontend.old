import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { AuthService } from '@core/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {

          if (error instanceof HttpErrorResponse) {

            if (error.error instanceof ErrorEvent) {
              console.error("Error Event");

            } else {

              console.log(`error status : ${error.status} ${error.statusText}`);

              switch (error.status) {
                case 400:     // BadRequest
                  window.alert(error.message);
                  break
                case 401:     //login
                  this.router.navigate([""]);
                  break;

                // case 403:     //forbidden
                //   this.router.navigate("/unauthorized");
                //   break;
              }
            }
          } else {

            console.error("some thing else happened");
          }

          return throwError(error);
        })
      )
  }
}
