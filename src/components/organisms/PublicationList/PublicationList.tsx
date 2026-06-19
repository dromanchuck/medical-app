import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { isIOS } from 'services';
import { EScreens, IPublication, TRootStackParamList } from 'types';

import { PublicationItem } from './PublicationItem';

interface IProps {
  publications: IPublication[];
  navigation: NativeStackNavigationProp<
    TRootStackParamList,
    EScreens.Publications
  >;
  onLoadMore: () => void;
}

export const PublicationList = ({
  publications,
  navigation,
  onLoadMore,
}: IProps) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const navigateToPublication = useCallback(
    (item: IPublication) => () => {
      navigation.navigate(EScreens.Publication, item);
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: unknown }) => {
      const publication = item as IPublication;
      return (
        <PublicationItem
          {...publication}
          onPress={navigateToPublication(publication)}
        />
      );
    },
    [navigateToPublication],
  );

  return (
    <FlatList
      data={publications}
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        paddingTop: isIOS ? insets.top - 30 : insets.top + headerHeight + 20,
      }}
      keyExtractor={(item: IPublication) => String(item.id)}
      renderItem={renderItem}
      initialNumToRender={1}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.01}
    />
  );
};
