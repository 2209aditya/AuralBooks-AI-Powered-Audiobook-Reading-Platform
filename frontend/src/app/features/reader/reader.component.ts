import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <h2>Reader</h2>

    <app-audio-player></app-audio-player>
    <app-epub-viewer></app-epub-viewer>
    <app-highlight-toolbar></app-highlight-toolbar>
  `
})
export class ReaderComponent {}