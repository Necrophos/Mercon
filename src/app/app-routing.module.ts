import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '@layouts/admin/admin.component';
import { AuthGuard } from '@services/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('@routes/login/login.module').then(mod => mod.LoginModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('@routes/reset-password/reset-password.module').then(mod => mod.ResetPasswordModule)
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate:[AuthGuard],
    loadChildren: () => import('@layouts/admin/admin.module').then(mod => mod.AdminModule)
  }
];

@NgModule({
  imports: [  RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
