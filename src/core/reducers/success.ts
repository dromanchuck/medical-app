import { AnyAction } from 'redux';

import { ACTIONS } from '../constants';

export interface ISuccessState {
  [actionType: string]: boolean;
}

export const successReducer = (
  state: ISuccessState = {},
  action: AnyAction,
): ISuccessState => {
  const { type, payload } = action;

  if (type === ACTIONS.CLEAR_SUCCESS_BY_ACTION_TYPE) {
    return {
      ...state,
      [payload]: null,
    };
  }

  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]:
      (requestState === 'REQUEST' && null) ||
      (requestState === 'SUCCESS' && true) ||
      (requestState === 'FAILURE' && false),
  };
};
