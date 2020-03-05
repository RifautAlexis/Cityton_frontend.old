import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ChallengeService } from '@core/services/challenge.service';
import { AuthService } from '@core/services/auth.service';

import { IUser as User } from '@shared/models/User';

import { ExistNameValidator } from '@shared/form-validators/challenge';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.scss']
})
export class CreateChallengeComponent implements OnInit {

  connectedUser: User;

  createChallengeForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private challengeService: ChallengeService,
    private existChallengeNameValidator: ExistNameValidator) { }

  ngOnInit() {

    this.authService.getConnectedUser().subscribe(
      (user: User) => {
        this.connectedUser = user;
      }
    );

    this.createChallengeForm = this.formBuilder.group({
      name: ['',
        {
          validators: [
            Validators.required,
            Validators.minLength(3)
          ],
          asyncValidators: [this.existChallengeNameValidator.validate]
        }
      ],
      statement: ['',
        {
          validators: [
            Validators.required,
            Validators.minLength(10)
          ]
        }
      ]
    });
  }

  onSubmit() {
    if (this.createChallengeForm.invalid) {
      return;
    }

    let name = this.createChallengeForm.controls.name.value;
    let statement = this.createChallengeForm.controls.statement.value;

    this.challengeService.create(name, statement).subscribe(
      (challengeId: number) => {
        this.router.navigate(['challenges']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cancel(formToReset: FormGroup) {
    formToReset.reset();
  }

}
