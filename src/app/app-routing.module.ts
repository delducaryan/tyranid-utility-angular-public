import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TestViewDataComponent } from './test-view-data/test-view-data.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    component: HomeComponent,
    path: 'home',
  },
  {
    component: TestViewDataComponent,
    path: 'test',
  },
  {
    loadChildren: () => import('./edit/edit.module').then(m => m.EditModule),
    path: 'edit',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
