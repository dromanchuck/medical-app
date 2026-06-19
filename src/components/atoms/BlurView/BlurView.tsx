import React from 'react';

import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

import Animated from 'react-native-reanimated';
import styled from 'styled-components';
import { BlurView as BlurCore } from '@react-native-community/blur';

interface IProps {
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => boolean;
}

export const BlurView = ({ style, onPress }: IProps) => {
  return (
    <Container style={style} onStartShouldSetResponder={onPress}>
      <Blur />
    </Container>
  );
};

const Container = styled(Animated.View)`
  width: 100%;
  height: 100%;
  background-color: rgba(38, 43, 55, 0.5);
`;

const Blur = styled(BlurCore)`
  width: 100%;
  height: 100%;
  z-index: 1000;
`;
