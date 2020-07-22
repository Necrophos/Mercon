import { PurchaseInforModule } from './../purchase-infor/purchase-infor.module';
import { PurchaseInforComponent } from './../purchase-infor/purchase-infor.component';
import { GeneralComponent } from "./../general/general.component";
import { GeneralModule } from "./../general/general.module";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PurchaseComponent } from "./purchase.component";
import { NgxPaginationModule } from "ngx-pagination";
const routes: Routes = [
  {
    path: ":trade_num",
    component: PurchaseComponent,
  },
  {
    path: ":trade_num/bl/:bl_number",
    component: GeneralComponent,
  },
  {
    path: ":trade_num/pss-information",
    component: PurchaseInforComponent
  },
];
@NgModule({
  declarations: [PurchaseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    PurchaseInforModule,
    GeneralModule,
  ],
})
export class PurchaseModule {}
