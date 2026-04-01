import { Component } from '@angular/core';

@Component({
  selector: 'app-highlight-toolbar',
  standalone: true,
  template: `
    <h4>Highlight</h4>

    <button (click)="highlight('yellow')">Yellow</button>
    <button (click)="highlight('green')">Green</button>
    <button (click)="highlight('blue')">Blue</button>
  `
})
export class HighlightToolbarComponent {

  highlight(color: string) {
    console.log('Highlight with', color);
  }
}