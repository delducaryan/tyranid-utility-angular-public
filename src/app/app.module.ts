import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModules } from './material.imports';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EditUnitComponent } from './edit-unit/edit-unit.component';
import { EditWeaponsComponent } from './edit-weapons/edit-weapons.component';
import { EditWeaponsFormComponent } from './edit-weapons-form/edit-weapons-form.component';
import { HomeComponent } from './home/home.component';
import { OptionArrayComponent } from './option-array/option-array.component';
import { OptionSelectionComponent } from './option-selection/option-selection.component';
import { NavComponent } from './nav/nav.component';
import { TestViewDataComponent } from './test-view-data/test-view-data.component';
import { EditAbilityComponent } from './edit-ability/edit-ability.component';

@NgModule({
  declarations: [
    AppComponent,
    EditUnitComponent,
    EditWeaponsComponent,
    EditWeaponsFormComponent,
    HomeComponent,
    OptionArrayComponent,
    OptionSelectionComponent,
    NavComponent,
    TestViewDataComponent,
    EditAbilityComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    LayoutModule,
    MaterialModules,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
