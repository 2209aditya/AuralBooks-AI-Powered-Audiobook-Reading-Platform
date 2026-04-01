import { createAction, props } from '@ngrx/store';

export const loadBook = createAction(
  '[Reader] Load Book',
  props<{ bookId: number }>()
);

export const loadBookSuccess = createAction(
  '[Reader] Load Book Success',
  props<{ book: any }>()
);

export const updateProgress = createAction(
  '[Reader] Update Progress',
  props<{ progress: number }>()
);