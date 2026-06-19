import { createAction } from 'typesafe-actions';

import {
  IRegisterDoctorValues,
  IAuthPayloadType,
  IRegisterPatientValues,
  ILoginUser,
} from 'types';

import { ACTIONS } from '../constants';

export const registerDoctorRequest = createAction(
  ACTIONS.REGISTER_DOCTOR_REQUEST,
)<IRegisterDoctorValues>();

export const registerDoctorSuccess = createAction(
  ACTIONS.REGISTER_DOCTOR_SUCCESS,
)<IAuthPayloadType>();

export const registerDoctorFailure = createAction(
  ACTIONS.REGISTER_DOCTOR_FAILURE,
)<string>();

export const authorizeUser = createAction(
  ACTIONS.AUTHORIZE_USER,
)<IAuthPayloadType>();

export const registerPatientRequest = createAction(
  ACTIONS.REGISTER_PATIENT_REQUEST,
)<IRegisterPatientValues>();

export const registerPatientSuccess = createAction(
  ACTIONS.REGISTER_PATIENT_SUCCESS,
)<IAuthPayloadType>();

export const registerPatientError = createAction(
  ACTIONS.REGISTER_PATIENT_FAILURE,
)<string>();

export const loginRequest = createAction(ACTIONS.LOGIN_REQUEST)<ILoginUser>();

export const loginSuccess = createAction(
  ACTIONS.LOGIN_SUCCESS,
)<IAuthPayloadType>();

export const loginFailure = createAction(ACTIONS.LOGIN_FAILURE)<string>();
export const logOut = createAction(ACTIONS.LOGOUT)();

export const setAppServerError = createAction(
  ACTIONS.SET_APP_SERVER_ERROR,
)<string>();

export const clearInternalError = createAction(ACTIONS.CLEAR_INTERNAL_ERROR)();
