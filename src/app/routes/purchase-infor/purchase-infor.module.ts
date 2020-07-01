import { PurchaseInforComponent } from './purchase-infor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: ":trade_num",
    component: PurchaseInforComponent,
  }
];
@NgModule({
  declarations: [PurchaseInforComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PurchaseInforModule { }
