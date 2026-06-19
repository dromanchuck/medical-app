import { combineReducers } from 'redux';

import {
  bootstrapReducer,
  authReducer,
  successReducer,
  errorReducer,
} from './reducers';

export const rootReducer = combineReducers({
  bootstrapReducer,
  successReducer,
  authReducer,
  errorReducer,
});
