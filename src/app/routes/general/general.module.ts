import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general.component';

@NgModule({
  declarations: [GeneralComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GeneralComponent
  ]
})
export class GeneralModule { }
