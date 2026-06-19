import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import {
  Welcome,
  RegisterStepOne,
  RegisterStepTwo,
  RegisterStepThree,
  Publications,
  Publication,
  Login,
  ForgotPassword,
  SetNewPassword,
  Algorithm,
  DrugCalculator,
  Drug,
  DrugSideEffects,
  DrugCompatibility,
} from 'screens';

import { EScreens, TRootStackParamList } from 'types';
import { bootstrapApp, selectAuthorized } from 'core';
import { isIOS } from 'services';

import { DrawerNavigator } from './navigators';
import { registerScreenOptions, screenOptions } from './screenOptions';
import { linkingConfig } from './linking';

const RootStack = createNativeStackNavigator<TRootStackParamList>();

export const RootNavigator = () => {
  const dispatch = useDispatch();
  const authorized = useSelector(selectAuthorized);

  useEffect(() => {
    dispatch(bootstrapApp());
  }, [dispatch]);

  return (
    <NavigationContainer linking={linkingConfig}>
      <RootStack.Navigator
        screenOptions={{
          animation: isIOS ? 'slide_from_right' : 'slide_from_bottom',
        }}>
        {!authorized ? (
          <>
            <RootStack.Screen
              name={EScreens.Welcome}
              component={Welcome}
              options={{
                headerShown: false,
                statusBarStyle: 'light',
              }}
            />
            <RootStack.Screen
              name={EScreens.RegisterStepOne}
              component={RegisterStepOne}
              options={registerScreenOptions}
            />
            <RootStack.Screen
              name={EScreens.RegisterStepTwo}
              component={RegisterStepTwo}
              options={registerScreenOptions}
            />

            <RootStack.Screen
              name={EScreens.RegisterStepThree}
              component={RegisterStepThree}
              options={registerScreenOptions}
            />
          </>
        ) : null}
        <RootStack.Screen
          name={EScreens.Drawer}
          options={{
            headerShown: false,
            statusBarStyle: 'light',
          }}
          component={DrawerNavigator}
        />
        <RootStack.Screen
          name={EScreens.Login}
          component={Login}
          options={registerScreenOptions}
        />
        <RootStack.Screen
          name={EScreens.Publications}
          options={screenOptions('#F7FAFE')}
          component={Publications}
        />
        <RootStack.Screen
          name={EScreens.Publication}
          options={{
            headerShown: false,
            statusBarStyle: 'light',
            contentStyle: { backgroundColor: '#fff' },
          }}
          component={Publication}
        />

        <RootStack.Screen
          name={EScreens.ForgotPassword}
          component={ForgotPassword}
          options={registerScreenOptions}
        />
        <RootStack.Screen
          name={EScreens.SetNewPassword}
          component={SetNewPassword}
          options={registerScreenOptions}
        />
        <RootStack.Screen
          name={EScreens.Algorithm}
          component={Algorithm}
          options={screenOptions('#F7FAFE')}
        />
        <RootStack.Screen
          name={EScreens.DrugCalculator}
          component={DrugCalculator}
          options={screenOptions('#F7FAFE')}
        />
        <RootStack.Screen
          name={EScreens.DrugCompatibility}
          component={DrugCompatibility}
          options={screenOptions('#F7FAFE')}
        />
        <RootStack.Screen
          name={EScreens.DrugSideEffects}
          component={DrugSideEffects}
          options={screenOptions('#F7FAFE')}
        />
        <RootStack.Screen
          name={EScreens.Drug}
          component={Drug}
          options={screenOptions('#F7FAFE')}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
