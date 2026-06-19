import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { EScreens, IAlgorithm, TDrawerParamList } from 'types';
import { algorithmsService } from 'services';

import { AlgorithmItem } from './AlgorithmItem';

const keyExtractor = (item: IAlgorithm) => String(item.id);

interface IProps {
  navigation: DrawerNavigationProp<TDrawerParamList, EScreens.Algorithms>;
}

export const AlgorithmsList = ({ navigation }: IProps) => {
  const [algorithms, setAlgorithms] = useState<IAlgorithm[]>([]);

  useEffect(() => {
    algorithmsService
      .getAlgorithms()
      .then(algorithms => {
        setAlgorithms(algorithms);
      })
      .catch(() => {});
  }, [setAlgorithms]);

  const onAlgorithmPress = useCallback(
    (algorithm: IAlgorithm) => () => {
      navigation.navigate(EScreens.Algorithm, algorithm);
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }) => {
      return <AlgorithmItem {...item} onPress={onAlgorithmPress(item)} />;
    },
    [onAlgorithmPress],
  );

  return (
    <FlatList
      data={algorithms}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.list}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 16,
  },
});
