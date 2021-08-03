import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { SharedModule } from '../shared/shared.module';

import { JobListComponent } from './job-list/job-list.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobAddComponent } from './job-add/job-add.component';
import { JobFormComponent } from './job-form/job-form.component';


@NgModule({
  declarations: [
    JobListComponent,
    JobEditComponent,
    JobAddComponent,
    JobFormComponent,
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedModule
  ]
})
export class JobModule { }
