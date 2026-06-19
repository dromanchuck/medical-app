import React, { useCallback } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

import { Button } from 'atoms';
import { openURL } from 'helpers';

import { SocialButton } from './SocialButton';

export const UsefulLinks = () => {
  const onPressLink = useCallback(
    (url: string) => () => {
      openURL(url);
    },
    [],
  );

  return (
    <>
      <Title>Ресурсы о болезни Паркинсона:</Title>
      <Button onPress={onPressLink('http://parkinsonizm.ru/')}>
        Паркинсон.ру
      </Button>
      <SocialButton
        icon="vk"
        color="rgba(0, 119, 255, 0.2)"
        text="Вконтакте"
        iconColor="#0077FF"
        onPress={onPressLink('https://vk.com/Medical App_medical-app')}
      />
      <SocialButton
        icon="youtube"
        iconColor="#FF0000"
        text="YouTube"
        color="rgba(255, 0, 0, 0.2)"
        onPress={onPressLink('https://www.youtube.com/c/medical-app')}
      />
      <SocialButton
        icon="telegram"
        color="rgba(34, 158, 217, 0.2)"
        text="Telegram"
        iconColor="#229ED9"
        onPress={onPressLink('https://t.me/Medical App_medical-app')}
      />
    </>
  );
};

const Title = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.154px;
  color: #262b37;
  margin-top: 26px;
  margin-bottom: 18px;
`;
