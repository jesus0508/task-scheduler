import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { JobListComponent } from './job-list/job-list.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobAddComponent } from './job-add/job-add.component';
import { JobFormComponent } from './shared/components/job-form/job-form.component';
import { JobShowComponent } from './job-show/job-show.component';
import { JobDetailFormComponent } from './shared/components/job-detail-form/job-detail-form.component';
import { HttpRequestConfigFormComponent } from './shared/components/http-request-config-form/http-request-config-form.component';
import { NotificationConfigFormComponent } from './shared/components/notification-config-form/notification-config-form.component';


@NgModule({
  declarations: [
    JobListComponent,
    JobEditComponent,
    JobAddComponent,
    JobFormComponent,
    JobShowComponent,
    JobDetailFormComponent,
    HttpRequestConfigFormComponent,
    NotificationConfigFormComponent,
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class JobModule { }
