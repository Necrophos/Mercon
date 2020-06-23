import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '@components/navbar/navbar.module';
import { FooterModule } from '@components/footer/footer.module';
import { ClientRoutingModule } from './client.routing';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    FooterModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
