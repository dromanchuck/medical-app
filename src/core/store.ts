import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducer';
import { rootSaga } from './saga';
import { TStore } from './types';

const sagaMiddleware = createSagaMiddleware();

export const store: Store<TStore> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
