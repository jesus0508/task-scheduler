import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingShowAndEditComponent } from './setting-show-and-edit/setting-show-and-edit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SettingShowAndEditComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule,
  ]
})
export class SettingModule { }
