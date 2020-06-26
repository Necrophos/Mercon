import { NavbarModule } from './../../components/navbar/navbar.module';
import { SidebarModule } from './../../components/sidebar/sidebar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingComponent } from './admin.routing';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    NavbarModule,
    AdminRoutingComponent
  ]
})
export class AdminModule { }
