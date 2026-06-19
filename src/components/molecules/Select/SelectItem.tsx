import React, { memo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styled from 'styled-components';

interface ISelectItemProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export const SelectItem = memo(
  ({ label, isActive, onPress }: ISelectItemProps) => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Item isActive={isActive}>
          <ItemText isActive={isActive}>{label}</ItemText>
        </Item>
        <Border />
      </TouchableOpacity>
    );
  },
);

interface IActive {
  isActive: boolean;
}

const Item = styled(View)<IActive>`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 16px;
  padding-left: 16px;
  justify-content: center;

  ${({ isActive }) => (isActive ? `background-color: #e2e3fc;` : '')}
`;

const ItemText = styled(Text)<IActive>`
  font-family: Open Sans;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  flex-wrap: wrap;
`;

const Border = styled(View)`
  border-bottom-width: 1px;
  border-bottom-color: #ebeff2;
  margin-left: 16px;
  margin-right: 16px;
`;
