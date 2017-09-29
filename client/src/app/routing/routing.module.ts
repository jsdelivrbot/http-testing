// The Routing Module has several characteristics:
//
// Separates routing concerns from other application concerns.
// Provides a module to replace or remove when testing the application.
// Provides a well-known location for routing service providers including guards and resolvers.
// Does not declare components.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { SignUpComponent } from '../sign-up/sign-up.component';
import { HttpClientComponent } from "../http-client/http-client.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { WelcomeComponent } from '../welcome/welcome.component';
import { LogInComponent } from "../log-in/log-in.component";
import { DataComponent } from '../data/data.component';
import { AuthGuard } from "../auth.guard";

const appRoutes: Routes = [
  {path: 'bar-chart', component: HttpClientComponent, canActivate: [AuthGuard]},
  {path: 'post-data', component: DataComponent, canActivate: [AuthGuard]},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LogInComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: '', redirectTo: '/welcome', pathMatch:'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
