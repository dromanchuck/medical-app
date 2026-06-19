import { Platform, Dimensions, StatusBar } from 'react-native';

const { OS } = Platform;

export const isIOS = OS === 'ios';
export const isAndroid = OS === 'android';

export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;

export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SCREEN_WIDTH = Dimensions.get('screen').width;

const DEFAULT_BAR_HEIGHT = 24;

export const navigationBarHeight =
  SCREEN_HEIGHT -
  WINDOW_HEIGHT -
  (StatusBar.currentHeight || DEFAULT_BAR_HEIGHT);
