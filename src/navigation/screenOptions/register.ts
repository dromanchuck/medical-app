import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { isIOS } from 'services';

export const registerScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  statusBarStyle: isIOS ? 'dark' : 'light',
};
