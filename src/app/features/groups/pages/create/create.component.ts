import { Component, OnInit } from '@angular/core';

import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';

import { IUser as User } from '@shared/models/User';
import { IGroup as Group } from '@shared/models/Group';
import { ExistNameValidator } from '@shared/form-validators/group';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  connectedUser: User;

  createGroupForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private groupService: GroupService,
    private existGroupNameValidator: ExistNameValidator) { }

  ngOnInit() {

    this.authService.getConnectedUser().subscribe(
      (user: User) => {
        this.connectedUser = user;
      }
    );

    this.createGroupForm = this.formBuilder.group({
      name: ['',
        {
          validators: [
            Validators.required,
            Validators.minLength(3)
          ],
          asyncValidators: [this.existGroupNameValidator.validate]
        }
      ]
    });
  }

  onSubmit() {
    if (this.createGroupForm.invalid) {
      return;
    }

    let name: string = this.createGroupForm.controls.name.value
    let creatorId: number = this.authService.getUserId();

    this.groupService.createByMember(name, creatorId).subscribe(
      (groupId: number) => {
        this.router.navigate(['groups/details', groupId]);
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
