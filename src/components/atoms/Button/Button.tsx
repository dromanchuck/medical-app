import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';

import {
  ActivityIndicator,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import styled from 'styled-components';

import { isIOS } from 'services';

type TButtonType = 'primary' | 'secondary' | 'disabled' | 'error' | 'thirdly';

interface IProps {
  children: ReactNode;
  isLoading?: boolean;
  type?: TButtonType;
  style?: StyleProp<ViewStyle>;
}

const colors = {
  primary: '#fff',
  secondary: '#22b38c',
  thirdly: '#0658FD',
  disabled: '#fff',
  error: '#fff',
};

const backgroundColors = {
  primary: '#22b38c',
  secondary: '#D9F0EF',
  thirdly: 'rgba(6, 88, 253, 0.2)',
  disabled: 'rgba(149, 152, 157, 0.64)',
  error: '#FF8686',
};

const Touchable = isIOS ? TouchableOpacity : TouchableNativeFeedback;

export const Button = (props: IProps & { onPress: () => void }) => {
  const { type, isLoading, onPress } = props;

  return (
    <Touchable
      activeOpacity={0.8}
      onPress={type !== 'disabled' && !isLoading ? onPress : undefined}>
      <ButtonView {...props} />
    </Touchable>
  );
};

export const ButtonView = ({
  children: text,
  style,
  type = 'primary',
  isLoading = false,
}: IProps) => {
  return (
    <Container style={[style]} type={type}>
      <TitleWrapper>
        <Loader color={colors[type]} isVisible={isLoading} />
        <Title type={type}>{text}</Title>
      </TitleWrapper>
    </Container>
  );
};

const Container = styled(View)<{ type: TButtonType }>`
  height: 48px;
  justify-content: center;
  background: #22b38c;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: ${({ type }) => backgroundColors[type]};
`;

const Title = styled(Text)<{ type: TButtonType }>`
  font-size: 16px;
  line-height: 22px;
  color: ${({ type }) => colors[type]};
  font-weight: 700;
  text-align: center;
`;

const TitleWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  transform: translateX(-14px);
`;

const Loader = styled(ActivityIndicator)<{ isVisible: boolean }>`
  margin-right: 6px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;
