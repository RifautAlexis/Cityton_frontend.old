import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialUiModule } from '@shared/material-ui/material-ui.module';

import { EditGroupsComponent } from '@shared/components/edit-groups/edit-groups.component';

import { DisplayParticipantsChatPipe } from './pipes/displayParticipantsChat.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    EditGroupsComponent,
    DisplayParticipantsChatPipe,
    TruncatePipe
  ],
  entryComponents: [
    EditGroupsComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialUiModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialUiModule,
    DisplayParticipantsChatPipe,
    TruncatePipe
  ],
  providers: [
    DisplayParticipantsChatPipe,
    TruncatePipe
  ]
})

export class SharedModule { }
