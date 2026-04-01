import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  template: `
    <h2>Login</h2>

    <input [(ngModel)]="username" placeholder="Username" />
    <input [(ngModel)]="password" type="password" placeholder="Password" />

    <button (click)="login()">Login</button>
  `
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({ username: this.username, password: this.password })
      .subscribe(() => this.router.navigate(['/dashboard']));
  }
}