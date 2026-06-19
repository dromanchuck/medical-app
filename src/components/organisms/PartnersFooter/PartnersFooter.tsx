import React, { useCallback } from 'react';
import { Text, View, Image as FastImage } from 'react-native';
import styled from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';

import { openURL, sendEmail } from 'helpers';

import { partner1, partner2, partner3, partner4 } from './img';

export const PartnersFooter = () => {
  const onPressPartner = useCallback(
    (url: string) => () => {
      openURL(url);
    },
    [],
  );

  const onPressSendEmail = useCallback(() => {
    sendEmail('hospital@fccps.ru');
  }, []);

  return (
    <Container>
      <Partners>
        <BorderlessButton onPress={onPressPartner('https://фцмн.рф')}>
          <Partner1 source={partner1} />
        </BorderlessButton>
        <BorderlessButton
          onPress={onPressPartner('http://www.parkinsonizm.ru​​​​​​​')}>
          <Partner2 source={partner2} />
        </BorderlessButton>
        <BorderlessButton onPress={onPressPartner('https://medicalpartner.ru')}>
          <Partner3 source={partner3} />
        </BorderlessButton>
        <BorderlessButton onPress={onPressPartner('https://medical-app.ru')}>
          <Partner4 source={partner4} />
        </BorderlessButton>
      </Partners>

      <Appointment>
        Запись для региональных пациентов о возможности консультации через сайт:{' '}
        <PressableText onPress={onPressSendEmail}>
          hospital@fccps.ru
        </PressableText>
      </Appointment>
    </Container>
  );
};

const Partner1 = styled(FastImage)`
  width: 132px;
  height: 32px;
`;

const Partner2 = styled(FastImage)`
  width: 32px;
  height: 32px;
`;

const Partner3 = styled(FastImage)`
  width: 32px;
  height: 32px;
`;

const Partner4 = styled(FastImage)`
  width: 32px;
  height: 32px;
`;

const Container = styled(View)`
  background: #fff;
  border-radius: 10px;
  padding-right: 12px;
  padding-left: 12px;
  margin-top: 16px;
`;

const Partners = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 21px;
  padding-bottom: 21px;
  border-bottom-width: 1px;
  border-bottom-color: #dbe3f1;
`;

const Appointment = styled(Text)`
  font-family: Open Sans;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #262b37;
  padding-bottom: 12px;
  padding-top: 12px;
`;

const PressableText = styled(Appointment)`
  color: #22b38c;
`;
