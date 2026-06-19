import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

import { Button } from 'atoms';
import { EScreens, TRootStackParamList } from 'types';

interface IProps {
  navigation: NativeStackNavigationProp<
    TRootStackParamList,
    EScreens.Algorithm
  >;
  text?: string;
}

export const Result = ({ text, navigation }: IProps) => {
  const navigateToFeedback = useCallback(() => {
    navigation.navigate(EScreens.Feedback, {
      screenName: 'Вопрос специалисту',
    });
  }, [navigation]);

  return (
    <Container>
      {text ? (
        <>
          <Title>Первичный скрининг</Title>
          <ResultText>{text}</ResultText>
        </>
      ) : null}
      <Button type="secondary" onPress={navigateToFeedback}>
        Задать вопрос специалисту
      </Button>
    </Container>
  );
};

const Container = styled(View)`
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  background: #fff;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  margin-bottom: 24px;
  box-shadow: 0px 0px 55px rgba(0, 0, 0, 0.05);
`;

const Title = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: #262b37;
  margin-bottom: 1px;
`;

const ResultText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  color: #95989d;
  margin-bottom: 18px;
`;
