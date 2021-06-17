import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TaskAddComponent } from './task/task-add/task-add.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: TaskComponent },
      { path: 'create', component: TaskAddComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

//    <app-task></app-task>
