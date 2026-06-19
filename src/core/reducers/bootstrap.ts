import { createReducer } from 'typesafe-actions';

const defaultState = {
  bootstrapFinished: false,
};

export const bootstrapReducer = createReducer(defaultState);
