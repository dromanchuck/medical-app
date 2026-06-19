import React, { forwardRef } from 'react';

import styled from 'styled-components';
import { Text, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import { Button } from 'atoms';
import { BottomMenu } from 'molecules';

interface IProps {
  onPress: () => void;
}

export const RegistrationSuccessMenu = forwardRef(
  ({ onPress }: IProps, ref) => {
    return (
      <BottomMenu
        title={'Добро пожаловать!'}
        description="На указанный Вами адрес электронной почты направлено письмо-
      подтверждение. Проверьте почту и активируйте Ваш аккаунт для доступа
      ко всем функциям приложения Medical App."
        ref={ref}>
        <DescriptionPartOne>Приложение содержит 2 раздела:</DescriptionPartOne>
        <BulletContainer>
          <Bullet />
          <BulletText>
            для врачей доступны научно-образовательные материалы по болезни
            Паркинсона
          </BulletText>
        </BulletContainer>
        <BulletContainer>
          <Bullet />
          <BulletText>
            для пациентов и лиц, осуществляющих уход за людьми с болезнью
            Паркинсона доступна справочная информация.
          </BulletText>
        </BulletContainer>
        <DescriptionPartTwo>
          Имеются противопоказания. Необходима консультация специалиста. При
          любых признаках заболевания обратитесь к врачу. Самолечение опасно и
          может нанести непоправимый вред Вашему здоровью!
        </DescriptionPartTwo>

        <Button
          onPress={() => {
            ref?.current?.close();

            onPress();
          }}>
          Войти в приложение
        </Button>
      </BottomMenu>
    );
  },
);

const Description = styled(Text)`
  font-family: Open Sans;
  font-weight: normal;
  font-size: ${widthPercentageToDP(3.4)}px;
  line-height: 23px;
  display: flex;
  align-items: center;
  color: #262b37;
`;

const DescriptionPartOne = styled(Description)`
  margin-bottom: ${widthPercentageToDP(2.9)}px;
`;

const DescriptionPartTwo = styled(Description)`
  margin-bottom: ${widthPercentageToDP(3.4)}px;
`;

const BulletContainer = styled(View)`
  flex-direction: row;
  margin-bottom: ${widthPercentageToDP(3.9)}px;
`;

const Bullet = styled(View)`
  width: 5px;
  height: 5px;
  background: #262b37;
  margin-top: 10px;
  border-radius: 50px;
  margin-right: 10px;
`;

const BulletText = styled(Description)``;
