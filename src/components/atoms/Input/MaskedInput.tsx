import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';

import { TextInput } from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';

import { DATE_MASK, PHONE_MASK } from './masks';

export type TMaskType = 'phone' | 'date';

interface IProps extends MaskInputProps {
  maskType: TMaskType;
  error?: string;
}

const maskMap = {
  phone: PHONE_MASK,
  date: DATE_MASK,
};

export const MaskedInput = forwardRef(
  ({ value, maskType, error, ...rest }: IProps, ref: Ref<TextInput>) => {
    return (
      <InputText
        ref={ref}
        mask={maskMap[maskType]}
        defaultValue={value}
        value={value}
        error={error}
        placeholderTextColor={'#95989D'}
        {...rest}
      />
    );
  },
);

const InputText = styled(MaskInput)<{ error?: string }>`
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
  flex: 1;
  color: #262b37;
`;
