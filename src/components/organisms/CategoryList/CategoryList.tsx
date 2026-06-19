import React, { ReactNode, useCallback } from 'react';

import styled from 'styled-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { EScreens, IPublicationCategory, TDrawerParamList } from 'types';

import { CategoryItem } from './CateroryItem';
import { isIOS } from 'services';

interface IProps {
  categories: IPublicationCategory[];
  navigation:
    | DrawerNavigationProp<TDrawerParamList, EScreens.Library>
    | DrawerNavigationProp<TDrawerParamList, EScreens.PatientMain>;
  renderHeader?: ReactNode;
  renderFooter?: ReactNode;
}

export const CategoryList = ({
  categories,
  navigation,
  renderHeader,
  renderFooter,
}: IProps) => {
  const insets = useSafeAreaInsets();

  const onPressItem = useCallback(
    (item: IPublicationCategory) => () => {
      navigation.navigate(EScreens.Publications, item);
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: unknown }) => {
      return (
        <CategoryItem
          {...(item as IPublicationCategory)}
          onPress={onPressItem(item as IPublicationCategory)}
        />
      );
    },
    [onPressItem],
  );

  return (
    <List
      data={categories}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      contentContainerStyle={{
        paddingBottom: isIOS ? insets.bottom : insets.bottom + 20,
      }}
      renderItem={renderItem}
      keyExtractor={(item: IPublicationCategory) => String(item.id)}
    />
  );
};

const List = styled(Animated.FlatList)`
  flex: 1;
`;
