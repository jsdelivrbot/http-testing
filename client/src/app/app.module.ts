import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./routing/routing.module";
import { AdminModule } from './admin/admin.module';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HttpClientComponent } from './http-client/http-client.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { DataService } from './data.service';


@NgModule({
  declarations: [
    AppComponent,
    HttpClientComponent,
    SignUpComponent,
    PageNotFoundComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    AdminModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
