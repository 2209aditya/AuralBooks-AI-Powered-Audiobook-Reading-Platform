import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  template: `
    <h2>Checkout</h2>
    <button (click)="pay()">Pay Now</button>
  `
})
export class CheckoutComponent {

  constructor(private http: HttpClient) {}

  pay() {
    this.http.post('/api/v1/payments/pay/1', {})
      .subscribe(() => alert('Payment Initiated'));
  }
}