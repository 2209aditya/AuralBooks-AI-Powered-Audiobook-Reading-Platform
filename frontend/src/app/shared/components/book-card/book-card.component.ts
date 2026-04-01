import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-card',
  standalone: true,
  template: `
    <div class="card">
      <h3>{{ book.title }}</h3>
      <p>{{ book.author }}</p>
      <button>View</button>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 8px;
    }
  `]
})
export class BookCardComponent {
  @Input() book: any;
}