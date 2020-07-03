import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentComponent } from "./document.component";
import { Routes, RouterModule } from "@angular/router";
const routes: Routes = [
  {
    path: ":trade_num/:bl_number",
    component: DocumentComponent,
  },
];
@NgModule({
  declarations: [DocumentComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [DocumentComponent],
})
export class DocumentModule {}
