import { spawn } from 'redux-saga/effects';

import { bootstrapSaga, authSaga } from './sagas';

export function* rootSaga() {
  try {
    yield spawn(bootstrapSaga);
    yield spawn(authSaga);
  } catch (e) {}
}
