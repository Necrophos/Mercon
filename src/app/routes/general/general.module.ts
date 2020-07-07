import { TabShipmentModule } from "./../../components/tab-shipment/tab-shipment.module";
import { TabContainerModule } from "./../../components/tab-container/tab-container.module";
import { TabGeneralModule } from "./../../components/tab-general/tab-general.module";
import { TabsModule } from "ngx-tabs";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GeneralComponent } from "./general.component";
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  declarations: [GeneralComponent],
  imports: [
    CommonModule,
    TabsModule,
    TabGeneralModule,
    TabContainerModule,
    TabShipmentModule,
  ],
  exports: [GeneralComponent],
})
export class GeneralModule {}
