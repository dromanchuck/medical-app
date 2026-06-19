import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { all, call, put, spawn, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

import { authService } from 'services';
import {
  IApiRegisterDoctorValues,
  IApiRegisterPatientValues,
  IApiUser,
} from 'types';

import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logOut,
  registerDoctorFailure,
  registerDoctorRequest,
  registerDoctorSuccess,
  registerPatientError,
  registerPatientRequest,
  registerPatientSuccess,
} from '../actions';

function* registerDoctorSaga({
  payload,
}: ActionType<typeof registerDoctorRequest>) {
  try {
    const {
      fullName,
      email,
      country,
      region,
      speciality,
      city,
      phone,
      gender,
      birthday,
      position,
      study,
      degree,
      password,
    } = payload;

    const dateArr = birthday.split('.');
    const date_of_birth = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;

    const registerValues: IApiRegisterDoctorValues = {
      email,
      full_name: fullName,
      country: country?.value || '',
      region: region?.value || '',
      city: city?.value || '',
      specialty: speciality.value || '',
      additional_specialty: '',
      phone_number: phone,
      gender,
      date_of_birth,
      position,
      working_place: study,
      academic_degree: degree?.value || '',
      role: 'doc',
      password,
      source: 'mob',
    };

    const {
      data: { access, refresh },
    } = yield call(() => authService.registerDoctor(registerValues));

    yield AsyncStorageLib.setItem('access', access);
    yield AsyncStorageLib.setItem('refresh', refresh);

    yield put(registerDoctorSuccess({ fullName, email, role: 'doc' }));
  } catch (error: any) {
    if (error?.response?.data?.details?.[0]) {
      yield put(registerDoctorFailure(error?.response?.data?.details?.[0]));

      return;
    }

    yield put(registerDoctorFailure('error'));
  }
}

function* registerPatientSaga({
  payload,
}: ActionType<typeof registerPatientRequest>) {
  try {
    const { fullName, email, phone, gender, birthday, password } = payload;
    const dateArr = birthday.split('.');
    const date_of_birth = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;

    const registerValues: IApiRegisterPatientValues = {
      email,
      full_name: fullName,
      phone_number: phone,
      gender,
      role: 'pat',
      password,
      source: 'mob',
      date_of_birth,
    };

    const {
      data: { access, refresh },
    } = yield call(() => authService.registerPatient(registerValues));

    yield call(() => updateTokens(access, refresh));

    yield put(registerPatientSuccess({ fullName, email, role: 'pat' }));
  } catch (error: any) {
    if (error?.response?.data?.details?.[0]) {
      yield put(registerPatientError(error?.response?.data?.details?.[0]));

      return;
    }

    yield put(registerPatientError('error'));
  }
}

function* loginSaga({ payload }: ActionType<typeof loginRequest>) {
  try {
    const { email, password } = payload;

    const {
      data: { access, refresh },
    } = yield call(() => authService.logIn(email, password));

    yield call(() => updateTokens(access, refresh));

    const {
      data: { email: userEmail, full_name, verified, role },
    }: { data: IApiUser } = yield call(() => authService.getUser());

    yield put(
      loginSuccess({ email: userEmail, fullName: full_name, verified, role }),
    );
  } catch (e: any) {
    yield put(loginFailure(e));
  }
}

function* logOutSaga() {
  yield spawn(() => updateTokens());
}

function* updateTokens(access?: string, refresh?: string) {
  yield all([
    call(() =>
      access
        ? AsyncStorageLib.setItem('access', access)
        : AsyncStorageLib.removeItem('access'),
    ),
    call(() =>
      refresh
        ? AsyncStorageLib.setItem('refresh', refresh)
        : AsyncStorageLib.removeItem('refresh'),
    ),
  ]);
}

export function* authSaga() {
  yield takeEvery(registerDoctorRequest, registerDoctorSaga);
  yield takeEvery(registerPatientRequest, registerPatientSaga);
  yield takeEvery(loginRequest, loginSaga);
  yield takeEvery(logOut, logOutSaga);
}
