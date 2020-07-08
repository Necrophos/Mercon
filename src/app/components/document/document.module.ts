import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentComponent } from "./document.component";
import { Routes, RouterModule } from "@angular/router";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
const routes: Routes = [
  {
    path: ":trade_num/:bl_number",
    component: DocumentComponent,
  },
];
@NgModule({
  declarations: [DocumentComponent],
  imports: [CommonModule, NgbDropdownModule, RouterModule.forChild(routes)],
  exports: [DocumentComponent],
})
export class DocumentModule {}
