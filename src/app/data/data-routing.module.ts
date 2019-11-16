import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { AbilityEditComponent } from './ability-edit/ability-edit.component';
import { AbilityListComponent } from './ability-list/ability-list.component';
import { BiomorphEditComponent } from './biomorph-edit/biomorph-edit.component';
import { BiomorphListComponent } from './biomorph-list/biomorph-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { DataComponent } from './data.component';
import { UnitEditComponent } from './unit-edit/unit-edit.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { WeaponEditComponent } from './weapon-edit/weapon-edit.component';
import { WeaponListComponent } from './weapon-list/weapon-list.component';

const routes: Routes = [
  {
    component: DataComponent,
    path: '',
    pathMatch: 'full',
  },
  {
    component: AbilityEditComponent,
    path: 'edit-ability',
  },
  {
    component: AbilityListComponent,
    path: 'list-ability',
  },
  {
    component: BiomorphEditComponent,
    path: 'edit-biomorph',
  },
  {
    component: BiomorphListComponent,
    path: 'list-biomorph',
  },
  {
    component: BookEditComponent,
    path: 'edit-book',
  },
  {
    component: BookListComponent,
    path: 'list-book',
  },
  {
    component: UnitEditComponent,
    path: 'edit-unit',
  },
  {
    component: UnitListComponent,
    path: 'list-unit',
  },
  {
    component: WeaponEditComponent,
    path: 'edit-weapon',
  },
  {
    component: WeaponListComponent,
    path: 'list-weapon',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
