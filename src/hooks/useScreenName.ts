import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

export const useScreenName = (name: string) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);
};
