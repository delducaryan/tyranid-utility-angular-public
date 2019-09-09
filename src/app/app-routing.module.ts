import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EditUnitComponent } from './edit-unit/edit-unit.component';
import { TestViewDataComponent } from './test-view-data/test-view-data.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'edit',
    component: EditUnitComponent,
  },
  {
    path: 'test',
    component: TestViewDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
