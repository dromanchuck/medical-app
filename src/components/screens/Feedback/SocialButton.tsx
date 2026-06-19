import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import styled from 'styled-components';

import { Icon, TIcon } from 'atoms';

interface IProps {
  color: string;
  text: string;
  icon: TIcon;
  iconColor: string;
  onPress: () => void;
}

export const SocialButton = ({
  icon,
  onPress,
  color,
  text,
  iconColor,
}: IProps) => {
  return (
    <Container onPress={onPress} color={color}>
      <IconWrapper color={iconColor}>
        <Icon name={icon} />
      </IconWrapper>
      <Title color={iconColor}>{text}</Title>
    </Container>
  );
};

const Container = styled(RectButton)<{ color: string }>`
  border-radius: 6px;
  margin-top: 10px;
  background: ${({ color }) => color};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 13px 0;
  overflow: hidden;
`;

const Title = styled(Text)<{ color: string }>`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: ${({ color }) => color};
`;

const IconWrapper = styled(View)<{ color: string }>`
  position: absolute;
  left: 0;
  background-color: ${({ color }) => color};
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;
