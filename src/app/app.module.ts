import { ShareService } from './services/share.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { interceptors } from '@core/interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientModule } from '@layouts/client/client.module';
import { AdminModule } from '@layouts/admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { ChatService } from '@services/chat.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ClientModule,
    NgxSpinnerModule,
    AdminModule,
    ToastrModule.forRoot()
  ],
  providers: [ShareService, ...interceptors, ChatService, NgxSpinnerService],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
