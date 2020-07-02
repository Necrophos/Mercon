import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetBagsChartComponent } from './target-bags-chart.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TargetBagsChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ],
  exports: [
    TargetBagsChartComponent
  ]
})
export class TargetBagsChartModule { }
