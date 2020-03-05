import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { SettingsRoutingModule } from './settings-routing.module';

import { SettingsComponent } from './pages/settings/settings.component';

import { ChangeUsernameComponent } from './components/settings/change-username/change-username.component';
import { ChangePhoneNumberComponent } from './components/settings/change-phoneNumber/change-phoneNumber.component';
import { ChangeEmailComponent } from './components/settings/change-email/change-email.component';
import { ChangePasswordComponent } from './components/settings/change-password/change-password.component';
import { ChangePictureComponent } from './components/settings/change-picture/change-picture.component';

@NgModule({
  declarations: [
    ChangeUsernameComponent,
    ChangePhoneNumberComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    ChangePictureComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule
  ],
  providers: [],
})

export class SettingsModule { }
