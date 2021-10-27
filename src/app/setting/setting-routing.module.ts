import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { SettingShowAndEditComponent } from './setting-show-and-edit/setting-show-and-edit.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: SettingShowAndEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
