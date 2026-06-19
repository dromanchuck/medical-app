import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { useDoctorMenu } from 'hooks';

import { Drawer } from './Drawer';
import { DrawerItem } from './DrawerItem';

export const DoctorDrawer = (props: DrawerContentComponentProps) => {
  const { navigation } = props;

  const {
    navigateToAlgorithms,
    navigateToLibrary,
    navigateToFeedback,
    navigateToDrugCalculator,
  } = useDoctorMenu(navigation as any);

  return (
    <Drawer {...props} isDoctor>
      <DrawerItem
        icon="algorithm"
        text={'Алгоритмы'}
        onPress={navigateToAlgorithms}
      />
      <DrawerItem
        icon="library"
        text={'Библиотека'}
        onPress={navigateToLibrary}
      />
      <DrawerItem
        icon="drugs"
        text={'Лекарства'}
        onPress={navigateToDrugCalculator}
      />
      <DrawerItem
        icon="message"
        text={'Сообщить о Неж. явлении'}
        onPress={navigateToFeedback}
      />
    </Drawer>
  );
};
