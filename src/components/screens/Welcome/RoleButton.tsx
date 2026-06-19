import React, { ReactNode } from 'react';
import { BaseButton } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { Text, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

import { Icon, TIcon } from 'atoms';

interface IProps extends IBorder {
  children: ReactNode;
  role: 'doctor' | 'patient';
  onPress: () => void;
}

interface IBorder {
  topBorderRadius?: boolean;
  bottomBorderRadius?: boolean;
}

const icons: { [key: string]: TIcon } = {
  patient: 'patient',
  doctor: 'doctor',
};

export const RoleButton = ({
  onPress,
  children: text,
  role,
  topBorderRadius,
  bottomBorderRadius,
}: IProps) => {
  return (
    <ButtonContainer onPress={onPress}>
      <Container
        topBorderRadius={topBorderRadius}
        bottomBorderRadius={bottomBorderRadius}>
        <IconWrapper>
          <Icon name={icons[role]} />
        </IconWrapper>
        <Title>{text}</Title>
      </Container>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(BaseButton)`
  width: 100%;
`;

const Container = styled(View)<IBorder>`
  border-width: 1px;
  border-color: #dbe3f1;
  width: 100%;
  padding: ${heightPercentageToDP(1.99)}px;
  flex-direction: row;
  align-items: center;

  ${({ topBorderRadius, bottomBorderRadius }) =>
    topBorderRadius
      ? `
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    `
      : bottomBorderRadius
      ? `
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-width: 0px;
    `
      : ``}
`;

const Title = styled(Text)`
  margin-left: 12px;
  color: #262b37;
  font-size: ${heightPercentageToDP(1.99)}px;
  line-height: 20px;
  letter-spacing: -0.24px;
  font-family: Raleway;
  font-weight: 700;
`;

const IconWrapper = styled(View)`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background: #22b38c33;
  border-radius: 50px;
`;
