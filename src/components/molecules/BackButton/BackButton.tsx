import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Icon } from 'atoms';
import styled from 'styled-components';

interface IProps {
  onPress: () => void;
}

export const BackButton = ({ onPress }: IProps) => {
  return (
    <Button onPress={onPress}>
      <Icon name="arrowLeft" />
    </Button>
  );
};

const Button = styled(BorderlessButton)`
  padding: 8px 8px 8px 0px;
`;
