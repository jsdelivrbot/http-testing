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
import { LoginRoutingModule }      from './login/login-routing.module';

import { DataService } from './data.service';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HttpClientComponent,
    SignUpComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    AdminModule,
    LoginRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
