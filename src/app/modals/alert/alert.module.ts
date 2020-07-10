import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class AlertModule { }
