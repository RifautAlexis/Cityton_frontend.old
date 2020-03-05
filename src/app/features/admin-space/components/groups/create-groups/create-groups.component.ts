import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '@core/services/user.service';
import { CompanyService } from '@core/services/company.service';

import { IUserMinimal as UserMinimal } from '@shared/models/UserMinimal';
import { ICompany as Company } from '@shared/models/Company';

import { Observable, forkJoin } from 'rxjs';

import { ExistNameValidator } from '@shared/form-validators/group';

@Component({
  selector: 'app-create-groups',
  templateUrl: './create-groups.component.html',
  styleUrls: ['./create-groups.component.scss']
})
export class CreateGroupsComponent implements OnInit {

  createGroupForm: FormGroup;

  resultSRequests$: Observable<[UserMinimal[], Company]>;

  minGroupSize: number;
  maxGroupSize: number;

  constructor(
    public dialogRef: MatDialogRef<CreateGroupsComponent>,
    private userService: UserService,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private existGroupNameValidator: ExistNameValidator,
  ) { }

  ngOnInit() {

    this.createGroupForm = this.formBuilder.group({
      name: ['',
      {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ],
        asyncValidators: [this.existGroupNameValidator.validate]
      }
      ],
      membersSelected: ['', [
        Validators.required
      ]],
      creatorSelected: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1)
      ]],
    });

    this.resultSRequests$ = forkJoin(this.userService.getUsersWithoutGroup(), this.companyService.getSettings());

    this.resultSRequests$.subscribe(
      (data: [UserMinimal[], Company]) => {

        this.minGroupSize = data[1].minGroupSize;
        this.maxGroupSize = data[1].maxGroupSize;

        this.createGroupForm.controls["membersSelected"].setValidators([Validators.minLength(this.minGroupSize), Validators.maxLength(this.maxGroupSize)]);

      }
    );

  }

  compare(obj01: UserMinimal, obj02: UserMinimal) {
    return obj01.username.localeCompare(obj02.username, 'en', { sensitivity: 'base' })
  }

  usersSelectedContains(userId: number) {
    return this.getterForm('membersSelected').some(user => user.id === userId)
  }

  // ***************************************** //

  submit() {
    this.dialogRef.close({
    name: this.getterForm("name"),
    creator: this.getterForm("creatorSelected")[0].id,
    members: this.getterForm("membersSelected").map(member => member.id)
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  // ***************************************** //

  private getterForm(fieldName: string) {
    return this.createGroupForm.get(fieldName).value;
  }

}
