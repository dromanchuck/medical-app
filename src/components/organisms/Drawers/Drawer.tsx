import React, { ReactNode, useCallback } from 'react';

import {
  DrawerContentComponentProps,
  useDrawerProgress,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import { View } from 'react-native';
import styled from 'styled-components';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { Icon } from 'atoms';
import { EScreens } from 'types';
import { logOut } from 'core';

import { DrawerItem } from './DrawerItem';
import { isIOS } from 'services';

interface IProps extends DrawerContentComponentProps {
  children: ReactNode;
  isDoctor?: boolean;
}

export const Drawer = ({ navigation, children, isDoctor = false }: IProps) => {
  const progress = useDrawerProgress();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const translateX = Animated.interpolateNode(
    progress as Animated.Adaptable<never>,
    {
      inputRange: [0, 1],
      outputRange: [-120, 40],
    },
  );

  const opacity = Animated.interpolateNode(
    progress as Animated.Adaptable<never>,
    {
      inputRange: [0.8, 1],
      outputRange: [0, 1],
    },
  );

  const closeDrawer = useCallback(() => {
    navigation.closeDrawer();

    return true;
  }, [navigation]);

  const navigateToAbout = useCallback(() => {
    navigation.navigate(EScreens.About);
  }, [navigation]);

  const navigateToFeedback = useCallback(() => {
    navigation.navigate(EScreens.Feedback);
  }, [navigation]);

  const navigateToMain = useCallback(() => {
    navigation.navigate(isDoctor ? EScreens.DoctorMain : EScreens.PatientMain);
  }, [navigation, isDoctor]);

  const logout = useCallback(() => {
    navigation.closeDrawer();

    dispatch(logOut());

    requestAnimationFrame(() => {
      navigation.push(EScreens.Welcome);
    });
  }, [dispatch, navigation]);

  return (
    <>
      <ScrollWrapper>
        <Icon name="drawerLogo" />

        <ItemsContainer>
          <DrawerItem
            icon="home"
            text={'Главная страница'}
            onPress={navigateToMain}
          />
          {children}
        </ItemsContainer>
        <DrawerItem
          icon="about"
          text={'О приложении'}
          onPress={navigateToAbout}
        />
        <DrawerItem icon="about" text={'Выйти из аккаунта'} onPress={logout} />
      </ScrollWrapper>
      <FeedbackItem style={{ paddingBottom: insets.bottom }}>
        <DrawerItem
          icon="message"
          text={'Форма обратной связи'}
          onPress={navigateToFeedback}
        />
      </FeedbackItem>
      <Circle
        style={{
          transform: [{ translateX, scale: 1.5, translateY: isIOS ? 0 : 15 }],
          top: insets.top,
          opacity,
        }}
        onStartShouldSetResponder={closeDrawer}>
        <Icon name="clear" />
      </Circle>
    </>
  );
};

const ScrollWrapper = styled(DrawerContentScrollView)`
  padding-left: 15px;
  padding-right: 15px;
`;

const ItemsContainer = styled(View)`
  border-top-width: 1px;
  border-top-color: #bfd6d5;
  border-bottom-width: 1px;
  border-bottom-color: #bfd6d5;
  padding-top: 12px;
  padding-bottom: 12px;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const Circle = styled(Animated.View)`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 0;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const FeedbackItem = styled(View)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
`;
