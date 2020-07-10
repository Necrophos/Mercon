import { AlertModule } from './../../modals/alert/alert.module';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatComponent } from "./chat.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  {
    path: "",
    component: ChatComponent,
  },
];

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    AlertModule,
    NgbModalModule,
    Ng2ImgMaxModule ,
    ReactiveFormsModule,
  ],
})
export class ChatModule {}
