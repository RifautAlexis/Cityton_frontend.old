import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { CoreModule } from '@core/core.module';

import{ AdminSpaceModule } from '@features/admin-space/admin-space.module';
import{ ChatModule } from '@features/chat/chat.module';
import{ HomeModule } from '@features/home/home.module';
import{ SettingsModule } from '@features/settings/settings.module';
import{ GroupsModule } from '@features/groups/groups.module';
import{ ChallengesModule } from '@features/challenges/challenges.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    AdminSpaceModule,
    ChatModule,
    HomeModule,
    SettingsModule,
    GroupsModule,
    ChallengesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
