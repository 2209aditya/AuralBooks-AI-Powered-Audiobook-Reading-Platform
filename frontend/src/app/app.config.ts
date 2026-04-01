import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

// Interceptors
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { refreshInterceptor } from './core/interceptors/refresh.interceptor';

// NgRx
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

// Reducers
import { authReducer } from './store/auth/auth.reducer';
import { readerReducer } from './store/reader/reader.reducer';

// Effects
import { AuthEffects } from './store/auth/auth.effects';
import { ReaderEffects } from './store/reader/reader.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([authInterceptor, refreshInterceptor])
    ),

    // 🔥 NgRx Store
    provideStore({
      auth: authReducer,
      reader: readerReducer
    }),

    provideEffects([AuthEffects, ReaderEffects])
  ]
};