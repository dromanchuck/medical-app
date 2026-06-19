import React, { useContext } from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { useScreenName } from 'hooks';
import { CategoriesContext } from 'context';

import { Drawer } from './Drawer';
import { DrawerItem } from './DrawerItem';
import { EScreens } from 'types';

export const PatientDrawer = (props: DrawerContentComponentProps) => {
  useScreenName('Главная');
  const { navigation } = props;

  const { categories } = useContext(CategoriesContext);

  return (
    <Drawer {...props}>
      {categories.map(item => (
        <DrawerItem
          key={item.id}
          text={item.short_title}
          onPress={() => navigation.navigate(EScreens.Publications, item)}
          iconUrl={item?.small_icon_url}
        />
      ))}
    </Drawer>
  );
};
