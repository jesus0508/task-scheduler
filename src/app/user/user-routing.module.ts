import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { UserShowAndEditComponent } from './user-show-and-edit/user-show-and-edit.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: ':username', component: UserShowAndEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
