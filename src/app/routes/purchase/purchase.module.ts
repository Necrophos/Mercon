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
    path: "information",
    loadChildren: () =>
      import("@routes/purchase-infor/purchase-infor.module").then(
        (mod) => mod.PurchaseInforModule
      ),
  },
];
@NgModule({
  declarations: [PurchaseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    GeneralModule
  ],
})
export class PurchaseModule {}
