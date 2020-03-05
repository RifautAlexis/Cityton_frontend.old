import { Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { IUser as User } from '@shared/models/User';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import {
  ExistEmailValidator,
  ExistPhoneNumberValidator,
  ExistUsernameValidator
} from '@shared/form-validators/user';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
})

export class EditUserComponent {

  editUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    private formBuilder: FormBuilder,
    private existPhoneNumberValidator: ExistPhoneNumberValidator,
    private existUsernameValidator: ExistUsernameValidator,
    @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group({
      username: [this.data.username,
      {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ],
        asyncValidators: [this.usernameValidator]
      }
      ],
      phoneNumber: [this.data.phoneNumber,
      {
        validators: [
          Validators.required,
          Validators.minLength(10)
        ],
        asyncValidators: [this.phoneNumberValidator]
      }
      ],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  private usernameValidator = (control: AbstractControl) => {
    return this.existUsernameValidator.validateEdit(control, this.data.username);
  };

  private phoneNumberValidator = (control: AbstractControl) => {
    return this.existPhoneNumberValidator.validateEdit(control, this.data.phoneNumber);
  };

}
