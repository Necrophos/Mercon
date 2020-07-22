import { TabShipmentModule } from "./../../components/tab-shipment/tab-shipment.module";
import { TabContainerModule } from "./../../components/tab-container/tab-container.module";
import { TabGeneralModule } from "./../../components/tab-general/tab-general.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GeneralComponent } from "./general.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseInforModule } from '@routes/purchase-infor/purchase-infor.module';
import { PurchaseInforComponent } from '@routes/purchase-infor/purchase-infor.component';

const routes: Routes = [
  {
    path: ":trade_num/bl/:bl_number/pss-information",
    component: PurchaseInforComponent
  },
];

@NgModule({
  declarations: [GeneralComponent],
  imports: [
    CommonModule,
    NgbModule,
    TabGeneralModule,
    TabContainerModule,
    RouterModule,
    TabShipmentModule,
    PurchaseInforModule,
    RouterModule.forChild(routes),
  ],
  exports: [GeneralComponent],
})
export class GeneralModule {}
