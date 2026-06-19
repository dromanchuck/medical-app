import { StateType } from 'typesafe-actions';

import { rootReducer } from '../reducer';

export type TStore = StateType<typeof rootReducer>;
