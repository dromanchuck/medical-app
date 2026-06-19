import { Icon } from 'atoms';
import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';
import Animated, { SlideInRight } from 'react-native-reanimated';

import { IAlgorithm } from 'types';
import { isAndroid } from 'services';

interface IProps extends IAlgorithm {
  onPress: () => void;
}

const AnimatedRect = Animated.createAnimatedComponent(RectButton);

export const AlgorithmItem = ({ name, onPress, questions_count }: IProps) => {
  return (
    <Container
      onPress={onPress}
      entering={SlideInRight}
      style={isAndroid ? { elevation: 1, shadowColor: '#000' } : undefined}>
      <IconContainer>
        <Icon name="sectionAlgorithm" />
      </IconContainer>
      <Name>{name}</Name>
      <CountContainer>
        <QuestionCount>{questions_count}</QuestionCount>
      </CountContainer>
    </Container>
  );
};

const Container = styled(AnimatedRect)`
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 12px;
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
`;

const IconContainer = styled(View)`
  transform: scale(0.67);
  margin-right: 16px;
`;

const Name = styled(Text)`
  font-family: Raleway;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.24px;
  color: #262b37;
  flex: 1;
`;

const QuestionCount = styled(Text)`
  font-family: Open Sans;
  font-weight: 700;
  font-size: 11px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #ffffff;
`;

const CountContainer = styled(View)`
  background: #22b38c;
  border-radius: 15px;
  padding: 2px 7px;
  margin-left: 50px;
`;
