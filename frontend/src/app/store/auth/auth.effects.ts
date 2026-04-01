import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private auth: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.auth.login(action).pipe(
          map(token => AuthActions.loginSuccess({ token })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );
}