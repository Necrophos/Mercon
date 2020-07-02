import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatesChartComponent } from './rates-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [RatesChartComponent],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports: [
    RatesChartComponent
  ]
})
export class RatesChartModule { }
