import { AbstractControl, AsyncValidator, ValidationErrors, FormGroup } from '@angular/forms';
import { ChallengeService } from '@core/services/challenge.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ExistNameValidator implements AsyncValidator {
  constructor(private challengeService: ChallengeService) { }

  validate = (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (ctrl.value !== null && ctrl.value !== "") {

      return this.challengeService.existName(ctrl.value).pipe(
        map((isNameTaken: boolean) => {

          return (isNameTaken ? { uniqueName: true } : null)
        }),
        catchError(() => null)
      );

    }
    return null;
  }

  validateEdit = (ctrl: AbstractControl, actualName: string): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (ctrl.value !== null && ctrl.value !== "") {

      return this.challengeService.existName(ctrl.value).pipe(
        map((isNameTaken: boolean) => {

          if (ctrl.value !== actualName) return (isNameTaken ? { uniqueName: true } : null)
          return null;
        }),
        catchError(() => null)
      );

    }
    return null;
  }
}
