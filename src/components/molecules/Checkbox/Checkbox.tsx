import React, { ReactNode } from 'react';
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components';

import { Icon } from 'atoms';

interface IProps {
  checked: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  error?: string;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({
  children,
  onChange,
  checked,
  style,
  error,
}: IProps) => {
  const handleOnChange = () => {
    onChange(!checked);
  };

  return (
    <Container activeOpacity={0.8} onPress={handleOnChange} style={style}>
      {checked ? <Icon name="checkbox" /> : <UnCheckedView error={error} />}
      <CheckboxText>{children}</CheckboxText>
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  flex-direction: row;
`;

const CheckboxText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #95989d;
  padding-right: 20px;
  margin-left: 8px;
`;

const UnCheckedView = styled(View)<{ error: string }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin: 2px;
  background: #f7fafe;
  border: 1px solid ${({ error }) => (error ? '#FF8686' : '#dbe3f1')};
`;
