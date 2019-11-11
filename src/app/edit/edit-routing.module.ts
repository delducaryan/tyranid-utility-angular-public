import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { BookComponent } from './book/book.component';
import { EditComponent } from './edit.component';

const routes: Routes = [
  {
    component: EditComponent,
    path: '',
    pathMatch: 'full',
  },
  {
    component: BookComponent,
    path: 'book',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
