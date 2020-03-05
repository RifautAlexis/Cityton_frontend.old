import { NgModule } from '@angular/core';

import {
  MatListModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatGridListModule,
  MatAutocompleteModule,
  MatProgressBarModule,
  MatChipsModule,
  MatMenuModule
} from '@angular/material';

import {
  LayoutModule
} from '@angular/cdk/layout';

import {
  FlexLayoutModule
} from '@angular/flex-layout';

const modules = [
  MatListModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatGridListModule,
  LayoutModule,
  FlexLayoutModule,
  MatAutocompleteModule,
  MatProgressBarModule,
  MatChipsModule,
  MatMenuModule
];

@NgModule({
  imports: [
    modules
  ],
  exports: [modules]
})
export class MaterialUiModule { }
