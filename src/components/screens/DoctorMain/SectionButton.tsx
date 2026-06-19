import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';

import { SCREEN_WIDTH } from 'services';
import { TIcon, Icon } from 'atoms';

interface IProps {
  title: string;
  description: string;
  icon: TIcon;
  onPress: () => void;
}

export const SectionButton = ({
  title,
  description,
  icon,
  onPress,
}: IProps) => {
  return (
    <Container onPress={onPress}>
      <Icon name={icon} />
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};

const Container = styled(RectButton)`
  padding: 16px;
  background: #ffff;
  box-shadow: 0px 0px 55px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  width: ${(SCREEN_WIDTH - 35) / 2}px;
`;

const IconWrapper = styled(View)`
  width: 48px;
  height: 48px;
  background: rgba(83, 215, 105, 0.2);
  border-radius: 50px;
  margin-bottom: 16px;
`;

const Title = styled(Text)`
  font-family: Raleway;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #262b37;
  margin-top: 16px;
`;

const Description = styled(Text)`
  font-family: Open Sans;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #95989d;
`;
