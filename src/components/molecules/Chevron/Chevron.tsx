import React from 'react';

import { Icon } from 'atoms';
import styled from 'styled-components';
import Animated, { AnimatedStyleProp } from 'react-native-reanimated';
import { StyleProp, ViewStyle } from 'react-native';

interface IProps {
  isActive: boolean;
  style?: AnimatedStyleProp<ViewStyle> | StyleProp<ViewStyle>;
  iconStyle?: AnimatedStyleProp<ViewStyle> | StyleProp<ViewStyle>;
}

export const Chevron = ({ isActive, style, iconStyle }: IProps) => {
  return (
    <IconWrapper style={style} isActive={isActive}>
      <Animated.View style={iconStyle}>
        <Icon name={isActive ? 'chevron' : 'chevronDisabled'} />
      </Animated.View>
    </IconWrapper>
  );
};

const IconWrapper = styled(Animated.View)<IProps>`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  background: ${({ isActive }) =>
    isActive ? 'rgba(6, 88, 253, 0.2)' : '#F7F7F7'};
  border-radius: 4px;
`;
