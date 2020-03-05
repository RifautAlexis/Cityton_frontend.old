import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { IODataService } from './services/IOData.service';
import { GroupService } from './services/group.service';
import { CompanyService } from './services/company.service';
import { ChallengeService } from './services/challenge.service';
import { ChatService } from './services/chat.service';

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

import { NavMenuComponent } from './components/nav-menu/nav-menu.component';


@NgModule({
  declarations: [NavMenuComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    AuthService,
    UserService,
    IODataService,
    GroupService,
    CompanyService,
    ChallengeService,
    ChatService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

  ],
  exports: [
    NavMenuComponent
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
