import React from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { BackButton } from 'molecules';

import { headerOptions } from './common';

export const screenOptions: (
  backgroundColor?: string,
) => (props: { route: any; navigation: any }) => NativeStackNavigationOptions =
  backgroundColor =>
  ({ navigation }) => ({
    ...(headerOptions as Partial<NativeStackNavigationOptions>),
    headerTitleAlign: 'center',
    statusBarStyle: 'light',
    headerTransparent: false,
    contentStyle: {
      backgroundColor:
        backgroundColor || headerOptions.contentStyle.backgroundColor,
    },
    headerLeft: () => <BackButton onPress={navigation.goBack} />,
  });
