import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { authService } from 'services';

export const signInUser = async (email: string, password: string) => {
  const {
    data: { access, refresh },
  } = await authService.logIn(email, password);

  await Promise.all([
    AsyncStorageLib.setItem('access', access),
    AsyncStorageLib.setItem('refresh', refresh),
  ]);

  const {
    data: { email: userEmail, full_name, verified, role },
  } = await authService.getUser();

  return { email: userEmail, fullName: full_name, verified, role };
};
