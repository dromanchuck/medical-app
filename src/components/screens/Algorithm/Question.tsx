import React from 'react';
import { Text, View } from 'react-native';
import { isAndroid } from 'services';
import styled from 'styled-components';

import { IAnswer, IQuestion } from 'types';

import { Answer } from './Answer';

interface IProps extends IQuestion {
  activeAnswerId?: number;
  onPressAnswer: (answer: IAnswer) => void;
}

export const Question = ({
  text,
  answers,
  activeAnswerId,
  onPressAnswer,
}: IProps) => {
  return (
    <ItemContainer>
      <QuestionTitle>{text}</QuestionTitle>
      {answers.map(item => {
        return (
          <Answer
            key={item.id}
            {...item}
            onPress={onPressAnswer}
            isQuestionActive={Boolean(activeAnswerId)}
            isActive={item.id === activeAnswerId}
          />
        );
      })}
    </ItemContainer>
  );
};

const ItemContainer = styled(View)`
  padding-bottom: 16px;
  background-color: #fff;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: -10px;
`;

const QuestionTitle = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  color: #95989d;
  padding-bottom: 8px;
`;
