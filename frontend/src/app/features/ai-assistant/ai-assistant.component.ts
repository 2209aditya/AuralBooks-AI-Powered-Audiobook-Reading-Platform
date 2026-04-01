import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  template: `
    <h2>AI Assistant</h2>
    <input [(ngModel)]="question" placeholder="Ask something..." />
    <button (click)="ask()">Ask</button>

    <p *ngIf="answer">{{ answer }}</p>
  `
})
export class AiAssistantComponent {

  question = '';
  answer = '';

  constructor(private http: HttpClient) {}

  ask() {
    this.http.post<any>('/api/v1/ai/ask', { question: this.question })
      .subscribe(res => this.answer = res);
  }
}