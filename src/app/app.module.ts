import { ShareService } from './services/share.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientModule } from '@layouts/client/client.module';
import { AdminModule } from '@layouts/admin/admin.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClientModule,
    AdminModule
  ],
  providers: [ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
