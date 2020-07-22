import { PurchaseInforComponent } from './purchase-infor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
const routes: Routes = [
  {
    path: ":id",
    component: PurchaseInforComponent,
  }
];
@NgModule({
  declarations: [PurchaseInforComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class PurchaseInforModule { }
