import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabShipmentComponent } from './tab-shipment.component';

@NgModule({
  declarations: [TabShipmentComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TabShipmentComponent
  ]
})
export class TabShipmentModule { }
