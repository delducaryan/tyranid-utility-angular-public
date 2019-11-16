import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from './material.imports';

import { DataRoutingModule } from './data-routing.module';

import { AbilityDialogComponent } from './ability-dialog/ability-dialog.component';
import { AbilityEditComponent } from './ability-edit/ability-edit.component';
import { AbilityListComponent } from './ability-list/ability-list.component';
import { BiomorphDialogComponent } from './biomorph-dialog/biomorph-dialog.component';
import { BiomorphEditComponent } from './biomorph-edit/biomorph-edit.component';
import { BiomorphListComponent } from './biomorph-list/biomorph-list.component';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { DataComponent } from './data.component';
import { UnitDialogComponent } from './unit-dialog/unit-dialog.component';
import { UnitEditComponent } from './unit-edit/unit-edit.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { WeaponDialogComponent } from './weapon-dialog/weapon-dialog.component';
import { WeaponEditComponent } from './weapon-edit/weapon-edit.component';
import { WeaponListComponent } from './weapon-list/weapon-list.component';

@NgModule({
  declarations: [
    BookDialogComponent,
    BookEditComponent,
    BookListComponent,
    AbilityDialogComponent,
    AbilityEditComponent,
    AbilityListComponent,
    BiomorphDialogComponent,
    BiomorphEditComponent,
    BiomorphListComponent,
    DataComponent,
    UnitDialogComponent,
    UnitEditComponent,
    UnitListComponent,
    WeaponDialogComponent,
    WeaponEditComponent,
    WeaponListComponent,
  ],
  entryComponents: [
    AbilityDialogComponent,
    BiomorphDialogComponent,
    BookDialogComponent,
    UnitDialogComponent,
    WeaponDialogComponent,
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    MaterialModules,
    ReactiveFormsModule,
  ]
})
export class DataModule { }
