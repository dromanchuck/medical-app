import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { EScreens, TDrawerScreenProps } from 'types';
import { Banners, UsersCount, PartnersFooter } from 'organisms';
import {
  useDisableBackButton,
  useDoctorMenu,
  useScreenName,
  useUserActivation,
} from 'hooks';

import { SectionButton } from './SectionButton';

const BANNER_HEIGHT = 180;

export const DoctorMain: FC<TDrawerScreenProps<EScreens.DoctorMain>> = ({
  navigation,
  route,
}) => {
  const bannersTranslateY = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const token = route?.params?.token;

  useScreenName('Глaвнaя');
  useDisableBackButton();
  useUserActivation(token);

  const {
    navigateToAlgorithms,
    navigateToLibrary,
    navigateToFeedback,
    navigateToDrugCalculator,
  } = useDoctorMenu(navigation);

  const scrollHandler = useAnimatedScrollHandler(
    event => {
      bannersTranslateY.value = event.contentOffset.y;
    },
    [bannersTranslateY],
  );

  const bannerStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: -bannersTranslateY.value }] };
  }, [bannersTranslateY]);

  return (
    <>
      <Animated.ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          paddingTop: BANNER_HEIGHT,
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        <Wrapper>
          <Sections>
            <SectionButton
              title="Алгоритмы"
              description={'Алгоритмы ведения пациентов с РСБП'}
              icon="sectionAlgorithm"
              onPress={navigateToAlgorithms}
            />
            <SectionButton
              title="Библиотека"
              description={'Исследования, статьи и материалы'}
              icon="sectionLibrary"
              onPress={navigateToLibrary}
            />
          </Sections>
          <Sections>
            <SectionButton
              title="Калькулятор доз"
              description={'Расчет дозировок и совместимость ЛС'}
              icon="sectionDrugs"
              onPress={navigateToDrugCalculator}
            />
            <SectionButton
              title="Сообщить о НЯ"
              description={'Заполнить форму сообщения о НЯ'}
              icon="sectionMessage"
              onPress={navigateToFeedback}
            />
          </Sections>
          <UsersCount />
          <PartnersFooter />
        </Wrapper>
      </Animated.ScrollView>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { height: BANNER_HEIGHT },
          bannerStyle,
        ]}>
        <Banners />
      </Animated.View>
    </>
  );
};

const Wrapper = styled(View)`
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 24px;
`;

const Sections = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;
