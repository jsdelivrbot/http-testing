import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./routing/routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module/material-module.module';

import { DataService } from './data.service';
import { AuthService } from './auth.service';

import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { HttpClientComponent } from './http-client/http-client.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogInComponent } from './log-in/log-in.component';
import { DataComponent } from './data/data.component';



@NgModule({
  declarations: [
    AppComponent,
    HttpClientComponent,
    SignUpComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    LogInComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    MaterialModule
  ],
  providers: [DataService,
              AuthService,
              AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
