import { createAction } from 'typesafe-actions';

import { ACTIONS } from '../constants';

export const bootstrapApp = createAction(ACTIONS.BOOTSTRAP_APP)();
export const finishBootstrap = createAction(ACTIONS.FINISH_BOOTSTRAP)();
