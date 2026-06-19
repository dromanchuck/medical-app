import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';

import { TextInput, TextInputProps } from 'react-native';

interface IProps extends TextInputProps {
  error?: string;
}

export const Input = forwardRef(
  ({ value, error, ...rest }: IProps, ref: Ref<TextInput>) => {
    return (
      <InputText
        ref={ref}
        placeholderTextColor={'#95989D'}
        defaultValue={value}
        {...rest}
        error={error}
      />
    );
  },
);

const InputText = styled(TextInput)<{ error?: string }>`
  border-radius: 6px;
  padding-right: 44px;
  padding-left: 12px;
  border: 1px solid ${({ error }) => (error ? '#FF8686' : '#dbe3f1')};
  height: 48px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  font-family: 'Open Sans';
  width: 100%;
  background: #f7fafe;
  color: #262b37;
`;
