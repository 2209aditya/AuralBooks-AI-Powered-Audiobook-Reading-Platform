import { Component } from '@angular/core';

@Component({
  selector: 'app-epub-viewer',
  standalone: true,
  template: `
    <h3>Book Content</h3>

    <div class="book-content">
      <p>Lorem ipsum dolor sit amet... (EPUB content)</p>
    </div>
  `,
  styles: [`
    .book-content {
      padding: 20px;
      background: #f5f5dc;
    }
  `]
})
export class EpubViewerComponent {}