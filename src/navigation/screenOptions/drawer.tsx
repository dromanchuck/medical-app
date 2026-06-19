import React from 'react';
import { DrawerNavigationOptions } from '@react-navigation/drawer';

import { DrawerButton } from 'molecules';
import { headerOptions } from './common';

export const drawerScreenOptions: (
  backgroundColor?: string,
) => (props: { route: any; navigation: any }) => DrawerNavigationOptions =
  backgroundColor =>
  ({ navigation }) => ({
    ...(headerOptions as Partial<DrawerNavigationOptions>),
    headerTitleAlign: 'center',
    sceneContainerStyle: {
      backgroundColor:
        backgroundColor || headerOptions.contentStyle.backgroundColor,
    },

    headerLeft: () => (
      <DrawerButton
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    ),
  });
