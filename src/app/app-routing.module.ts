import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './core/guards/checkLogin/check-login.guard';
import { UserGuard } from './core/guards/user/user.guard';
import { Role } from './core/interfaces/Role';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [CheckLoginGuard] },
  //{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(d => d.DashboardModule), canLoad: [UserGuard], data: { roles: [Role.MANAGER, Role.ADMIN] } },
  { path: 'tasks', loadChildren: () => import('./job/job.module').then(t => t.JobModule), canLoad: [UserGuard], data: { roles: [Role.MANAGER, Role.ADMIN] } },
  //{ path: 'users', loadChildren: () => import('./job/job.module').then(t => t.JobModule), canLoad: [UserGuard], data: { roles: [Role.ADMIN] } },
  { path: 'account', loadChildren: () => import('./user/user.module').then(t => t.UserModule), canLoad: [UserGuard], data: { roles: [Role.MANAGER, Role.ADMIN] } },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
