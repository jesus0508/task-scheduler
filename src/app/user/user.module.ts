import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserShowAndEditComponent } from './user-show-and-edit/user-show-and-edit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserShowAndEditComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }
