import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TargetBagsChartComponent } from "./target-bags-chart.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [TargetBagsChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    NgSelectModule,
  ],
  exports: [TargetBagsChartComponent],
})
export class TargetBagsChartModule {}
