import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './core/guards/checkLogin/check-login.guard';
import { UserGuard } from './core/guards/user/user.guard';
import { Role } from './core/interfaces/Role';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [CheckLoginGuard] },
  { path: 'tasks', loadChildren: () => import('./job/job.module').then(t => t.JobModule), canLoad: [UserGuard], data: { roles: [Role.MANAGER, Role.ADMIN] } },
  { path: 'account', loadChildren: () => import('./user/user.module').then(t => t.UserModule), canLoad: [UserGuard], data: { roles: [Role.MANAGER, Role.ADMIN] } },
  { path: 'settings', loadChildren: () => import('./setting/setting.module').then(t => t.SettingModule), canLoad: [UserGuard], data: { roles: [Role.MANAGER, Role.ADMIN] } },
  { path: '**', redirectTo: 'tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
