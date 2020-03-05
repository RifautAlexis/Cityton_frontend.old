import { map } from 'rxjs/operators';
import { Component, OnInit, Inject, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { UserService } from '@core/services/user.service';
import { CompanyService } from '@core/services/company.service';
import { AuthService } from '@core/services/auth.service';

import { IChallenge as challenge } from '@shared/models/challenge';

import { ExistNameValidator } from '@shared/form-validators/challenge';

@Component({
  selector: 'app-edit-challenges',
  templateUrl: './edit-challenges.component.html',
  styleUrls: ['./edit-challenges.component.scss']
})
export class EditChallengesComponent implements OnInit {

  editChallengeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditChallengesComponent>,
    private userService: UserService,
    private companyService: CompanyService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private existChallengeNameValidator: ExistNameValidator,
    @Inject(MAT_DIALOG_DATA) public data: challenge
  ) { }

  ngOnInit() {

    this.editChallengeForm = this.formBuilder.group({
      name: [this.data.name,
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ],
        asyncValidators: [this.nameValidator]
      }
      ],
      statement: [this.data.statement,
      {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100)
        ]
      }
      ],
    });

  }

  // ***************************************** //

  submit() {
    this.dialogRef.close({
      id: this.data.id,
      name: this.getterForm("name"),
      statement: this.getterForm("statement")
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }

  // ***************************************** //

  private getterForm(fieldName: string) {
    return this.editChallengeForm.get(fieldName).value;
  }

  private nameValidator = (control: AbstractControl) => {
    return this.existChallengeNameValidator.validateEdit(control, this.data.name);
  };

}
