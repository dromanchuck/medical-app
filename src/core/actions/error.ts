import { createAction } from 'typesafe-actions';

import { ACTIONS } from '../constants';

export const clearErrorByActionType = createAction(
  ACTIONS.CLEAR_ERROR_BY_ACTION_TYPE,
  (actionType: string) => actionType,
)();
