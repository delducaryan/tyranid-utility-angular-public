import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import MaterialModules from './material.imports';

import { EditRoutingModule } from './edit-routing.module';

import { BookComponent } from './book/book.component';
import { EditComponent } from './edit.component';

@NgModule({
  declarations: [
    BookComponent,
    EditComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    EditRoutingModule,
    MaterialModules,
  ]
})
export class EditModule { }
