import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  template: `
    <h2>Register</h2>

    <input [(ngModel)]="username" placeholder="Username" />
    <input [(ngModel)]="password" type="password" placeholder="Password" />

    <button (click)="register()">Register</button>
  `
})
export class RegisterComponent {

  username = '';
  password = '';

  constructor(private auth: AuthService) {}

  register() {
    this.auth.register({
      username: this.username,
      password: this.password
    }).subscribe(() => alert('Registered'));
  }
}