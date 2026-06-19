import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native-gesture-handler';
import Animated, {
  FadeInDown,
  FadeOutUp,
  Layout,
} from 'react-native-reanimated';

import { ISelectItem } from 'types';

import { SelectItem } from './SelectItem';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface IProps {
  items: ISelectItem[];
  searchText: string;
  selectedValue: string;
  onChange: (id: ISelectItem) => void;
}

export const SelectList = ({
  items,
  searchText,
  selectedValue,
  onChange,
}: IProps) => {
  const filteredData = useMemo(
    () =>
      items.filter(item => {
        const searchValue = item?.label || item.value;
        return searchValue?.toLowerCase()?.includes(searchText.toLowerCase());
      }),
    [items, searchText],
  );

  const onPressItem = useCallback(
    item => () => {
      onChange(item);
    },
    [],
  );

  return (
    <ScrollWrapper
      data={filteredData || []}
      keyExtractor={item => item.id}
      layout={Layout}
      exiting={FadeOutUp}
      entering={FadeInDown}
      keyboardShouldPersistTaps="always"
      renderItem={({ item }: { item: ISelectItem }) => (
        <SelectItem
          key={item.id}
          onPress={onPressItem(item)}
          label={item.label || item.value || ''}
          isActive={
            selectedValue === item.value || selectedValue === item.label
          }
        />
      )}
    />
  );
};

export const ScrollWrapper = styled(AnimatedFlatList)`
  max-height: 290px;
  z-index: 1000;
  background: #fff;
  border: 1px solid #ebeff2;
  box-shadow: 0px 4px 10px rgba(72, 83, 236, 0.08);
  border-radius: 6px;
  width: 100%;
`;
