import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatesChartComponent } from './rates-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RatesChartComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
    NgSelectModule,
    FormsModule,
  ],
  exports: [
    RatesChartComponent
  ]
})
export class RatesChartModule { }
