import { useCallback } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { EScreens, TDrawerParamList } from 'types';

export const useDoctorMenu = (
  navigation: DrawerNavigationProp<TDrawerParamList, EScreens.DoctorMain>,
) => {
  const navigateToAlgorithms = useCallback(() => {
    navigation.navigate(EScreens.Algorithms);
  }, [navigation]);

  const navigateToLibrary = useCallback(() => {
    navigation.navigate(EScreens.Library);
  }, [navigation]);

  const navigateToFeedback = useCallback(() => {
    navigation.navigate(EScreens.Feedback);
  }, [navigation]);

  const navigateToDrugCalculator = useCallback(() => {
    navigation.navigate(EScreens.Drug);
  }, [navigation]);

  return {
    navigateToAlgorithms,
    navigateToLibrary,
    navigateToFeedback,
    navigateToDrugCalculator,
  };
};
