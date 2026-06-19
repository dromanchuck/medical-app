import { useScreenName } from 'hooks';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isIOS } from 'services';

import { EScreens, IAnswer, IQuestion, TScreenProps } from 'types';

import { Header } from './Header';
import { Question } from './Question';
import { Result } from './Result';
import { Sources } from './Sources';

const HEADER_INSET = 80;

export const Algorithm: FC<TScreenProps<EScreens.Algorithm>> = ({
  navigation,
  route: {
    params: { name, sources, questions, results },
  },
}) => {
  useScreenName('Алгоритм');
  const insets = useSafeAreaInsets();

  const [answers, setAnswers] = useState<(IAnswer | null)[]>(
    questions.map(_item => null),
  );

  const onPressAnswer = useCallback(
    (index: number) => (answer: IAnswer) => {
      setAnswers(answers =>
        answers.map((_answer, idx) =>
          index === idx ? (answer.id === _answer?.id ? null : answer) : _answer,
        ),
      );
    },
    [setAnswers],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IQuestion; index: number }) => {
      return (
        <Question
          {...item}
          activeAnswerId={answers[index]?.id}
          onPressAnswer={onPressAnswer(index)}
        />
      );
    },
    [answers, onPressAnswer],
  );

  const resultWeight = answers.reduce(
    (acc, current) => acc + (current?.weight || 0),
    0,
  );

  const finalResult = results.find(
    item => item.min_range <= resultWeight && item.max_range >= resultWeight,
  );

  const isNoAnswers = answers.every(item => !item);

  return (
    <FlatList
      data={questions}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.list,
        { paddingTop: isIOS ? undefined : insets.top + HEADER_INSET },
      ]}
      ListHeaderComponent={<Header name={name} />}
      ListFooterComponent={
        <>
          <Result
            text={isNoAnswers ? '' : finalResult?.text}
            navigation={navigation}
          />
          <Sources sources={sources} />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
