import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <h2>Groups</h2>

    <ul>
      <li *ngFor="let group of groups">
        {{ group }}
      </li>
    </ul>
  `
})
export class GroupListComponent {

  groups = ['Fiction Lovers', 'Sci-Fi Club', 'Startup Readers'];
}