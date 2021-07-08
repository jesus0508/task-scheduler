import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { DashboardComponent } from './dashboard.component';
import { TaskComponent } from './task/task.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskAddComponent } from './task/task-add/task-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import { TaskFormComponent } from './task/task-form/task-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TaskComponent,
    NavbarComponent,
    TaskAddComponent,
    TaskEditComponent,
    TaskFormComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
