import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components';

import { Icon } from 'atoms';

interface IProps {
  onPress: () => void;
}

export const DrawerButton = ({ onPress }: IProps) => {
  return (
    <Button onPress={onPress}>
      <Icon name="drawer" />
    </Button>
  );
};

const Button = styled(BorderlessButton)`
  padding-left: 5px;
`;
