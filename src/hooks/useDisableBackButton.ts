import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useDisableBackButton = () => {
  const navigation = useNavigation();

  useEffect(() =>
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    }),
  );
};
