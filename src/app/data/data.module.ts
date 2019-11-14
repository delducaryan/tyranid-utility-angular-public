import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from './material.imports';

import { DataRoutingModule } from './data-routing.module';

import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { DataComponent } from './data.component';

@NgModule({
  declarations: [
    BookEditComponent,
    BookListComponent,
    DataComponent,
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    MaterialModules,
    ReactiveFormsModule,
  ]
})
export class DataModule { }
