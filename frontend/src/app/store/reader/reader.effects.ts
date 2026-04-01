import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as ReaderActions from './reader.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class ReaderEffects {

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReaderActions.loadBook),
      mergeMap(action =>
        this.http.get(`/api/v1/books/${action.bookId}`)
          .pipe(
            map(book => ReaderActions.loadBookSuccess({ book }))
          )
      )
    )
  );
}