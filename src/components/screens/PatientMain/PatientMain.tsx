import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { View } from 'react-native';

import {
  Banners,
  CategoryList,
  PartnersFooter,
  RegistrationSuccessMenu,
  UsersCount,
} from 'organisms';

import { EScreens, TDrawerScreenProps } from 'types';
import { Button } from 'atoms';
import { useDisableBackButton, useScreenName, useUserActivation } from 'hooks';

export const PatientMain: FC<TDrawerScreenProps<EScreens.PatientMain>> = ({
  navigation,
  route,
}) => {
  const token = route?.params?.token;

  useScreenName('Глaвнaя');
  useDisableBackButton();

  useUserActivation(token);

  const navigateToFeedback = useCallback(() => {
    navigation.navigate(EScreens.Feedback);
  }, [navigation]);

  return (
    <>
      <CategoryList
        navigation={navigation}
        renderFooter={
          <Container>
            <UsersCount />
            <PartnersFooter />
            <Btn onPress={navigateToFeedback}>
              Сообщить о нежелательном явлении
            </Btn>
          </Container>
        }
        renderHeader={<Banners />}
      />
    </>
  );
};

const Btn = styled(Button)`
  margin-top: 12px;
`;

const Container = styled(View)`
  padding-right: 16px;
  padding-left: 16px;
`;
