import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../core/services/websocket.service';

@Component({
  standalone: true,
  template: `
    <h2>Group Chat</h2>

    <div *ngFor="let msg of messages">
      {{ msg }}
    </div>

    <input [(ngModel)]="message" />
    <button (click)="send()">Send</button>
  `
})
export class GroupChatComponent implements OnInit {

  message = '';
  messages: string[] = [];

  constructor(private ws: WebSocketService) {}

  ngOnInit() {
    this.ws.connect();
  }

  send() {
    this.ws.send(this.message);
    this.messages.push(this.message);
    this.message = '';
  }
}