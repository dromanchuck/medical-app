import { createAction } from 'typesafe-actions';

import { ACTIONS } from '../constants';

export const clearSuccessByActionType = createAction(
  ACTIONS.CLEAR_SUCCESS_BY_ACTION_TYPE,
)<string>();
