import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  template: `
    <h2>Upload Book</h2>

    <input [(ngModel)]="title" placeholder="Title" />
    <button (click)="upload()">Upload</button>
  `
})
export class UploadBookComponent {

  title = '';

  constructor(private http: HttpClient) {}

  upload() {
    this.http.post('/api/v1/books', { title: this.title })
      .subscribe(() => alert('Uploaded'));
  }
}import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  template: `
    <h2>Upload Book</h2>

    <input [(ngModel)]="title" placeholder="Title" />
    <button (click)="upload()">Upload</button>
  `
})
export class UploadBookComponent {

  title = '';

  constructor(private http: HttpClient) {}

  upload() {
    this.http.post('/api/v1/books', { title: this.title })
      .subscribe(() => alert('Uploaded'));
  }
}