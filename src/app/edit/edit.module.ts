import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from './material.imports';

import { EditRoutingModule } from './edit-routing.module';

import { BookComponent } from './book/book.component';
import { EditComponent } from './edit.component';

@NgModule({
  declarations: [
    BookComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    MaterialModules,
    ReactiveFormsModule,
  ]
})
export class EditModule { }
