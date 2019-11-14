import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { DataComponent } from './data.component';

const routes: Routes = [
  {
    component: DataComponent,
    path: '',
    pathMatch: 'full',
  },
  {
    component: BookEditComponent,
    path: 'edit-book',
  },
  {
    component: BookListComponent,
    path: 'list-book',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
