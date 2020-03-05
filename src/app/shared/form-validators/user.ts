import { AbstractControl, AsyncValidator, ValidationErrors, FormGroup } from '@angular/forms';
import { UserService } from '@core/services/user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export function equalPasswordsValidator(formGroup: FormGroup): ValidationErrors {
  let password: string = formGroup.controls.password.value;
  let confirmPassword: string = formGroup.controls.confirmPassword.value;

  return password === confirmPassword ? null : { passwordsNotEqual: true };
}

@Injectable({ providedIn: 'root' })
export class ExistEmailValidator implements AsyncValidator {
  constructor(private userService: UserService) { }

  validate = (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (ctrl.value !== null && ctrl.value !== "") {

      return this.userService.existEmail(ctrl.value).pipe(
        map((isEmailTaken: boolean) => {

          return (isEmailTaken ? { uniqueEmail: true } : null)
        }),
        catchError(() => null)
      );

    }
    return null;
  }

  validateEdit = (ctrl: AbstractControl, actualEmail: string): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (ctrl.value !== null && ctrl.value !== "") {

      return this.userService.existEmail(ctrl.value).pipe(
        map((isEmailTaken: boolean) => {

          if (ctrl.value !== actualEmail) return (isEmailTaken ? { uniqueEmail: true } : null)
          return null;
        }),
        catchError(() => null)
      );

    }
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class ExistPhoneNumberValidator implements AsyncValidator {
  constructor(private userService: UserService) { }

  validate = (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (ctrl.value !== null && ctrl.value !== "") {

      return this.userService.existPhoneNumber(ctrl.value).pipe(
        map((isPhoneNumberTaken: boolean) => {

          return (isPhoneNumberTaken ? { uniquePhoneNumber: true } : null)
        }),
        catchError(() => null)
      );

    }
    return null;
  }

  validateEdit = (ctrl: AbstractControl, actualPhoneNumber: string): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (ctrl.value !== null && ctrl.value !== "") {

      return this.userService.existPhoneNumber(ctrl.value).pipe(
        map((isPhoneNumberTaken: boolean) => {

          if (ctrl.value !== actualPhoneNumber) return (isPhoneNumberTaken ? { uniquePhoneNumber: true } : null)
          return null;
        }),
        catchError(() => null)
      );

    }
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class ExistUsernameValidator implements AsyncValidator {
  constructor(private userService: UserService) { }

  validate = (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (ctrl.value !== null && ctrl.value !== "") {

      return this.userService.existUsername(ctrl.value).pipe(
        map((isUsernameTaken: boolean) => {
          console.log(ctrl.value);
          console.log(isUsernameTaken);
          return (isUsernameTaken ? { uniqueUsername: true } : null)
        }),
        catchError(() => null)
      );

    }
    return null;
  }

  validateEdit = (ctrl: AbstractControl, actualUsername: string): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (ctrl.value !== null && ctrl.value !== "") {

      return this.userService.existUsername(ctrl.value).pipe(
        map((isUsernameTaken: boolean) => {

          if (ctrl.value !== actualUsername) return (isUsernameTaken ? { uniqueUsername: true } : null)
          return null;
        }),
        catchError(() => null)
      );

    }
    return null;
  }
}
