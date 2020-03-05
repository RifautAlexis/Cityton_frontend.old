import { Component, OnInit, Inject, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { UserService } from '@core/services/user.service';
import { CompanyService } from '@core/services/company.service';
import { AuthService } from '@core/services/auth.service';

import { IUserMinimal as UserMinimal } from '@shared/models/UserMinimal';
import { ICompany as Company } from '@shared/models/Company';
import { IGroupToEdit as GroupToEdit } from '@shared/models/GroupToEdit';
import { Role } from '@shared/models/Enum';

import { Observable, forkJoin } from 'rxjs';

import { ExistNameValidator } from '@shared/form-validators/group';

@Component({
  selector: 'app-edit-groups',
  templateUrl: './edit-groups.component.html',
  styleUrls: ['./edit-groups.component.scss']
})
export class EditGroupsComponent implements OnInit {

  editGroupForm: FormGroup;

  resultSRequests$: Observable<[UserMinimal[], Company]>;

  usersWithoutGroup: UserMinimal[];

  isMember: boolean;

  minGroupSize: number;
  maxGroupSize: number;

  constructor(
    public dialogRef: MatDialogRef<EditGroupsComponent>,
    private userService: UserService,
    private companyService: CompanyService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private existGroupNameValidator: ExistNameValidator,
    @Inject(MAT_DIALOG_DATA) public data: GroupToEdit
  ) { }

  ngOnInit() {

    this.editGroupForm = this.formBuilder.group({
      name: [this.data.name,
      {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ],
        asyncValidators: [this.nameValidator]
      }
      ],
      membersSelected: [[this.data.creator, ...this.data.members], [
        Validators.required
      ]],
      creatorSelected: [[this.data.creator], [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1)
      ]],
    });

    this.resultSRequests$ = forkJoin(this.userService.getUsersWithoutGroup(), this.companyService.getSettings());

    this.resultSRequests$.subscribe(
      (data: [UserMinimal[], Company]) => {

        this.usersWithoutGroup = [this.data.creator, ...this.data.members, ...data[0]];
        [...this.usersWithoutGroup].sort((current, next) => this.compare(current, next));

        this.minGroupSize = data[1].minGroupSize;
        this.maxGroupSize = data[1].maxGroupSize;

        this.editGroupForm.controls["membersSelected"].setValidators([Validators.minLength(this.minGroupSize), Validators.maxLength(this.maxGroupSize)]);

      }
    );

    this.isMember = this.authService.getUserRole() === Role.Member;

  }

  private compare(obj01: UserMinimal, obj02: UserMinimal) {
    return obj01.username.localeCompare(obj02.username, 'en', { sensitivity: 'base' })
  }

  usersSelectedContains(userId: number) {
    return this.getterForm('membersSelected').some(user => user.id === userId)
  }

  checkCreator(userId: number) {
    if (this.getterForm("creatorSelected")[0] !== null && this.getterForm("creatorSelected")[0] !== undefined && this.getterForm("creatorSelected")[0].id === userId) {
      this.getterForm("creatorSelected")[0] = null;
    }

  }

  // ***************************************** //

  submit() {
    this.dialogRef.close({
      id: this.data.id,
      name: this.getterForm("name"),
      creatorId: this.getterForm("creatorSelected")[0].id,
      membersId: this.getterForm("membersSelected").map(usersMinimal => usersMinimal.id)
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }

  // ***************************************** //

  private getterForm(fieldName: string) {
    return this.editGroupForm.get(fieldName).value;
  }

  private nameValidator = (control: AbstractControl) => {
    return this.existGroupNameValidator.validateEdit(control, this.data.name);
  };

}
