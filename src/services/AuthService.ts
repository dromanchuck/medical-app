import AsyncStorage from '@react-native-async-storage/async-storage';

import qs from 'query-string';
import Config from 'react-native-config';

import {
  IApiRegisterDoctorValues,
  IApiRegisterPatientValues,
  IApiUser,
  IApiUsersCount,
} from 'types';

import { BaseService } from './BaseService';

class AuthAPIService extends BaseService {
  protected _credentials = { URL: Config.REACT_API_URL };

  public async logIn(email: string, password: string) {
    return this.post('auth/login', { email, password });
  }

  public async registerDoctor(values: IApiRegisterDoctorValues) {
    const data = {
      ...values,
    };

    return this.post('mobile/auth/register', JSON.stringify(data), {
      'Content-Type': 'application/json',
    });
  }

  public async registerPatient(values: IApiRegisterPatientValues) {
    const data = {
      ...values,
    };

    return this.post('mobile/auth/register', JSON.stringify(data), {
      'Content-Type': 'application/json',
    });
  }

  public async refreshToken() {
    const refreshToken = await AsyncStorage.getItem('refresh');
    const isRefreshTokenExists = Boolean(refreshToken);

    if (!isRefreshTokenExists) {
      throw new Error('Refresh token is not exist');
    }

    const data = {
      refresh: refreshToken,
    };

    const {
      data: { access },
    } = await this.post('auth/refresh_token', qs.stringify(data), {
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    await AsyncStorage.setItem('access', access);

    return access;
  }

  public async forgotPassword(email: string) {
    return this.post('auth/reset_password?source=mob', { email });
  }

  public async createPassword(token: string, password: string) {
    return this.post(`auth/change_password/${token}`, { password });
  }

  public async getUser() {
    const data = await this.get<IApiUser>('auth/profile');
    return data;
  }

  public async getUsersCount() {
    const { data } = await this.get<IApiUsersCount>('auth/users_count');

    return data;
  }

  public async activateAccout(token: string) {
    return this.post(`mobile/auth/verify-email/${token}`, {});
  }
}

export const authService = new AuthAPIService();
