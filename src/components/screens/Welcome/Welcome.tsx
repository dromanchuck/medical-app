import React, { useCallback, FC, useLayoutEffect, useEffect } from 'react';
import { Text, View, ImageBackground, Image as FastImage } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { CommonActions } from '@react-navigation/native';

import { EScreens, TScreenProps } from 'types';
import { Button } from 'atoms';
import { useDisableBackButton } from 'hooks';

import { RoleButton } from './RoleButton';

export const Welcome: FC<TScreenProps<EScreens.Welcome>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  useDisableBackButton();

  useEffect(() => {
    navigation.dispatch(state => {
      const routes = state.routes.filter(r => r.name.includes('Welcome'));

      return CommonActions.reset({
        ...state,
        routes: [routes[0]],
        index: routes.length - 1,
      });
    });
  }, [navigation]);

  const navigateToDoctorRegister = useCallback(() => {
    navigation.push(EScreens.RegisterStepOne, { isDoctor: true });
  }, [navigation]);

  const navigateToPatientRegister = useCallback(() => {
    navigation.push(EScreens.RegisterStepOne, { isDoctor: false });
  }, [navigation]);

  const navigateToLogin = useCallback(() => {
    navigation.push(EScreens.Login);
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({ gestureEnabled: false });
  }, [navigation]);

  return (
    <Wrapper
      style={{ paddingTop: insets.top }}
      source={require('./background.png')}
      resizeMode="cover"
      resizeMethod="auto">
      <Image
        resizeMode="contain"
        source={require('../../../../assets/img/logo.png')}
      />
      <RoleSelection>
        <Title>Зарегистрироваться</Title>
        <Explanation>
          Пожалуйста, не регистрируйтесь как врач, если Вы не являетесь
          действующим специалистом здравоохранения. Самолечение - опасно для
          Вашего здоровья. Регистрируясь в качестве врача Вы принимаете на себя
          ответственность за дальнейшее использование полученной информации.
        </Explanation>
        <RoleButton
          role="doctor"
          onPress={navigateToDoctorRegister}
          topBorderRadius>
          Я врач
        </RoleButton>
        <RoleButton
          role="patient"
          onPress={navigateToPatientRegister}
          bottomBorderRadius>
          Я пациент
        </RoleButton>
      </RoleSelection>
      <LogInButton type="error" onPress={navigateToLogin}>
        Войти
      </LogInButton>
      <FooterContainer style={{ paddingBottom: insets.bottom }}>
        <Footer>
          Приложение содержит научно-образовательные материалы для врачей по
          Болезни Паркинсона, а также справочные материалы для пациентов с
          развернутыми стадиями Болезни Паркинсона
        </Footer>
      </FooterContainer>
    </Wrapper>
  );
};

const Wrapper = styled(ImageBackground)`
  height: 100%;
  width: 100%;
  background-position: center;
  padding: 0 12px;
  flex: 1;
`;

const RoleSelection = styled(View)`
  background-color: #ffff;
  padding: 24px 15px 16px 15px;
  border-radius: 16px;
  align-items: center;
`;

const Title = styled(Text)`
  font-size: ${heightPercentageToDP(2)}px;
  line-height: 24px;
  color: #262b37;
  margin-bottom: 4px;
  font-family: Raleway;
  font-weight: 700;
`;

const Explanation = styled(Text)`
  font-size: ${heightPercentageToDP(1.6)}px;
  line-height: ${heightPercentageToDP(2.45)}px;
  color: #8f92a1;
  text-align: center;
  margin-bottom: ${heightPercentageToDP(2.95)}px;
  font-family: 'Open Sans';
  font-weight: 400;
`;

const Footer = styled(Text)`
  text-align: center;
  margin-top: ${heightPercentageToDP(2.45)}px;
  color: #dbe3f1;
  font-size: ${heightPercentageToDP(1.46)}px;
  line-height: ${heightPercentageToDP(2.22)}px;
  font-family: 'Open Sans';
  font-weight: 400;
`;

const FooterContainer = styled(View)`
  width: 100%;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 12px;
`;

const Image = styled(FastImage)`
  align-self: center;
  width: 167px;
  height: ${heightPercentageToDP(18)}px;
  margin-top: ${heightPercentageToDP(7)}px;
  margin-bottom: ${heightPercentageToDP(4)}px;
`;

const LogInButton = styled(Button)`
  margin-top: 10px;
`;
