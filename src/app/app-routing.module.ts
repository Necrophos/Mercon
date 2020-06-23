import { LoginComponent } from './routes/login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './layouts/client/client.component';
import { AdminComponent } from '@layouts/admin/admin.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@routes/login/login.module').then(mod => mod.LoginModule)
  },

  {
    path: 'reset-password',
    loadChildren: () => import('@routes/reset-password/reset-password.module').then(mod => mod.ResetPasswordModule)
  },

  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('@layouts/admin/admin.module').then(mod => mod.AdminModule)
  }
];

@NgModule({
  imports: [  RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
