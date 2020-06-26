import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent
  }
];

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    NgbDropdownModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportModule { }
