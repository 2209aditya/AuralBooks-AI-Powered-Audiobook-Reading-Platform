import { createReducer, on } from '@ngrx/store';
import * as ReaderActions from './reader.actions';

export interface ReaderState {
  book: any;
  progress: number;
}

const initialState: ReaderState = {
  book: null,
  progress: 0
};

export const readerReducer = createReducer(
  initialState,

  on(ReaderActions.loadBookSuccess, (state, { book }) => ({
    ...state,
    book
  })),

  on(ReaderActions.updateProgress, (state, { progress }) => ({
    ...state,
    progress
  }))
);