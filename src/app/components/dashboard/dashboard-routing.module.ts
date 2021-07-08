import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TaskAddComponent } from './task/task-add/task-add.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: TaskComponent },
      { path: 'create', component: TaskAddComponent },
      { path: ':id/edit', component: TaskEditComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

