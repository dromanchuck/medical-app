import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

export const useOnLostInternet = () => {
  const netInfo = useNetInfo();

  useEffect(() => {
    if (netInfo?.isConnected === false) {
      Toast.show({
        type: 'error',
        text1: 'Нет соединения с интернетом',
      });
    }
  }, [netInfo]);
};
