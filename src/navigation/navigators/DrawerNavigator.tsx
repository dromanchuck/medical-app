import React, { FC } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import {
  Algorithms,
  DoctorMain,
  Feedback,
  Library,
  About,
  PatientMain,
} from 'screens';

import { DoctorDrawer, PatientDrawer } from 'organisms';
import { EScreens, TDrawerParamList, TScreenProps } from 'types';
import { SCREEN_WIDTH } from 'services';
import { selectRole } from 'core';
import { CategoriesProvider } from 'context';

import { drawerScreenOptions } from '../screenOptions';

const Drawer = createDrawerNavigator<TDrawerParamList>();

export const DrawerNavigator: FC<TScreenProps<EScreens.Drawer>> = ({
  route,
}) => {
  const role = useSelector(selectRole);
  const isDoctorRole = role === 'doc' || route?.params?.isDoctor || false;

  return (
    <CategoriesProvider isDoctor={isDoctorRole}>
      <Drawer.Navigator
        drawerContent={props =>
          isDoctorRole ? (
            <DoctorDrawer {...props} />
          ) : (
            <PatientDrawer {...props} />
          )
        }
        screenOptions={{
          drawerStyle: styles.drawer,
          drawerType: 'front',
        }}>
        {isDoctorRole ? (
          <Drawer.Screen
            name={EScreens.DoctorMain}
            component={DoctorMain}
            options={drawerScreenOptions('#F7FAFE')}
          />
        ) : (
          <Drawer.Screen
            name={EScreens.PatientMain}
            component={PatientMain}
            options={drawerScreenOptions('#F7FAFE')}
          />
        )}

        <Drawer.Screen
          name={EScreens.Algorithms}
          component={Algorithms}
          options={drawerScreenOptions('#F7FAFE')}
        />
        <Drawer.Screen
          name={EScreens.Library}
          component={Library}
          options={drawerScreenOptions('#F7FAFE')}
        />
        <Drawer.Screen
          name={EScreens.Feedback}
          component={Feedback}
          options={drawerScreenOptions('#fff')}
        />

        <Drawer.Screen
          name={EScreens.About}
          component={About}
          options={drawerScreenOptions('#fff')}
        />
      </Drawer.Navigator>
    </CategoriesProvider>
  );
};

const styles = StyleSheet.create({
  drawer: {
    width: SCREEN_WIDTH - 60,
  },
});
