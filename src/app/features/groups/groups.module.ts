import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';

import { AllGroupsComponent } from './pages/all-groups/all-groups.component';
import { InformationComponent } from './pages/information/information.component';
import { CreateComponent } from './pages/create/create.component';

@NgModule({
  declarations: [
    AllGroupsComponent,
    InformationComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GroupsRoutingModule
  ],
  entryComponents: [
  ],
  providers: [],
})

export class GroupsModule { }
