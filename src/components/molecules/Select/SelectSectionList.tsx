import React, { Fragment, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

import { ISelectItem, ISelectWithChildrenItem } from 'types';
import { useMountState } from 'hooks';

import { SelectItem } from './SelectItem';

interface IProps {
  items: ISelectWithChildrenItem[];
  searchText: string;
  selectedValue: string;
  onChange: (id: ISelectItem) => void;
}

export const SelectSectionList = ({
  items,
  searchText,
  selectedValue,
  onChange,
}: IProps) => {
  const filteredData = useMemo(
    () =>
      items.map(item => ({
        ...item,
        children: item?.children.filter(child =>
          child.value.includes(searchText.toLowerCase()),
        ),
      })),
    [items, searchText],
  );

  const isMounted = useMountState();

  const onPressItem = useCallback(
    item => () => {
      onChange(item);
    },
    [onChange],
  );

  return items.length > 0 && isMounted ? (
    <>
      <ScrollWrapper
        data={filteredData}
        exiting={FadeOutUp}
        entering={FadeInDown}
        initialNumToRender={0}
        keyboardShouldPersistTaps="always"
        renderItem={({ item }: { item: unknown }) => {
          const section = item as ISelectWithChildrenItem;

          return (
            <Fragment>
              {section.children.length ? (
                <TitleWrapper>
                  <SectionTitle>{section.value}</SectionTitle>
                </TitleWrapper>
              ) : null}
              {section.children.map(child => (
                <SelectItem
                  key={child.id}
                  label={child?.label || child?.value}
                  onPress={onPressItem(child)}
                  isActive={
                    selectedValue === child.value ||
                    selectedValue === child.label
                  }
                />
              ))}
            </Fragment>
          );
        }}
      />
    </>
  ) : null;
};

const SectionTitle = styled(Text)`
  font-family: Open Sans;
  font-weight: bold;
  font-size: 10px;
  line-height: 24px;
  text-transform: uppercase;
  color: #95989d;
`;

const TitleWrapper = styled(View)`
  border-bottom-width: 1px;
  border-bottom-color: #ebeff2;
  height: 32px;
  margin-right: 16px;
  margin-left: 16px;
  margin-top: 8px;
`;

const ScrollWrapper = styled(Animated.FlatList)`
  max-height: 290px;
  z-index: 1000;
  background: #fff;
  border: 1px solid #ebeff2;
  box-shadow: 0px 4px 10px rgba(72, 83, 236, 0.08);
  border-radius: 6px;
  width: 100%;
`;
