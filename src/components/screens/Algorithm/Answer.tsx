import React, { useCallback } from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components';

import Animated, {
  Layout,
  SlideInLeft,
  SlideOutLeft,
} from 'react-native-reanimated';

import { Icon } from 'atoms';
import { IAnswer } from 'types';

interface IProps extends IAnswer {
  isActive: boolean;
  isQuestionActive: boolean;
  onPress: (answer: IAnswer) => void;
}

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

export const Answer = ({
  text,
  onPress,
  weight,
  id,
  isActive,
  isQuestionActive,
}: IProps) => {
  const handleOnPress = useCallback(() => {
    onPress({ weight, id, text });
  }, [onPress, weight, id, text]);

  return (
    <Container onPress={handleOnPress} isActive={isActive} layout={Layout}>
      {isQuestionActive ? (
        <Animated.View
          entering={SlideInLeft.duration(500)}
          exiting={SlideOutLeft.duration(500)}
          layout={Layout.duration(500)}>
          <Icon name={isActive ? 'checkboxRound' : 'checkboxRoundDisabled'} />
        </Animated.View>
      ) : null}

      <AnswerText>{text}</AnswerText>
    </Container>
  );
};

const Container = styled(AnimatedRectButton)<{ isActive: boolean }>`
  background: ${({ isActive }) =>
    isActive ? 'rgba(83, 215, 105, 0.2)' : '#f7f7f7'};
  border-radius: 6px;
  padding: 10px 12px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

const AnswerText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #262b37;
  margin-left: 12px;
`;
