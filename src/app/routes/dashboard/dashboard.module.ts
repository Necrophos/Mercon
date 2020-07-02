import { RatesChartModule } from './../../components/rates-chart/rates-chart.module';
import { TargetBagsChartModule } from './../../components/target-bags-chart/target-bags-chart.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    TargetBagsChartModule,
    RatesChartModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
