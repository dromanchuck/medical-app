import { ActionType, createReducer } from 'typesafe-actions';

import { IUser, TRole } from 'types';
import {
  authorizeUser,
  loginSuccess,
  logOut,
  registerDoctorSuccess,
  registerPatientSuccess,
  setAppServerError,
} from '../actions';

interface IAuthState extends IUser {
  role: TRole | null;
  authorized: boolean;
  internalError: string | null;
}

const defaultState: IAuthState = {
  role: null,
  fullName: '',
  email: '',
  verified: false,
  authorized: false,
  internalError: null,
};

const actions = {
  authorizeUser,
  registerDoctorSuccess,
  registerPatientSuccess,
  setAppServerError,
  logOut,
};

export const authReducer = createReducer<
  IAuthState,
  ActionType<typeof actions>
>(defaultState)
  .handleAction(
    [
      registerDoctorSuccess,
      registerPatientSuccess,
      authorizeUser,
      loginSuccess,
    ],
    (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  )
  .handleAction(setAppServerError, (state, { payload }) => ({
    ...state,
    internalError: payload,
  }))
  .handleAction(logOut, state => ({ ...state, ...defaultState }));
