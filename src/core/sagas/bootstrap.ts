import { delay, put, takeEvery } from 'redux-saga/effects';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

import { authService } from 'services';

import { bootstrapApp, authorizeUser } from '../actions';

function* bootstrapAppSaga() {
  try {
    const access: string = yield AsyncStorageLib.getItem('access');

    if (access) {
      yield authService.refreshToken();

      const { data } = yield authService.getUser();

      yield put(
        authorizeUser({
          role: data.role,
          fullName: data.full_name,
          email: data.email,
          verified: data.verified,
          authorized: true,
        }),
      );
    }
  } catch (error) {
  } finally {
    yield delay(300);
    RNBootSplash.hide({ fade: true });
  }
}

export function* bootstrapSaga() {
  yield takeEvery(bootstrapApp, bootstrapAppSaga);
}
