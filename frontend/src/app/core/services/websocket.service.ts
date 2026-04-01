import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WebSocketService {

  private socket!: WebSocket;

  connect() {
    this.socket = new WebSocket('ws://localhost:8082/chat');

    this.socket.onopen = () => console.log('Connected');
    this.socket.onmessage = (msg) => console.log('Message:', msg.data);
  }

  send(message: string) {
    this.socket.send(message);
  }

  close() {
    this.socket.close();
  }
}