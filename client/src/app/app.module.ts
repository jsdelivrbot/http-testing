import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./routing/routing.module";
import { FormsModule } from "@angular/forms";

import { DataService } from './data.service';
import { AuthService } from './auth.service';

import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { HttpClientComponent } from './http-client/http-client.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogInComponent } from './log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    HttpClientComponent,
    SignUpComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
