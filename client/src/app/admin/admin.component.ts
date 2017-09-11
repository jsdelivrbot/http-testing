
import { Component } from '@angular/core';

@Component({
  template:  `
    <h3>ADMIN</h3>
    <nav>
      <a routerLink="./" routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">Dashboard</a>
      <a routerLink="./test" routerLinkActive="active">Test</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AdminComponent {
}
