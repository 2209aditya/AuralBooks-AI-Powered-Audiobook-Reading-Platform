import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);

  return next(req).pipe(
    catchError(err => {

      if (err.status === 401) {
        return auth.refreshToken().pipe(
          switchMap(() => next(req))
        );
      }

      return throwError(() => err);
    })
  );
};