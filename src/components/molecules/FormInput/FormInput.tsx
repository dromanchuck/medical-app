import React, { useCallback, useState, useRef } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components';

import { Text, TextInputProps, View } from 'react-native';

import { Icon, Input, Label, MaskedInput, TMaskType } from 'atoms';
import { REQUIRED_FIELD } from 'services';

interface IProps extends TextInputProps {
  label: string;
  maskType?: TMaskType;
  error?: string;
  isOptional?: boolean;
  isPassword?: boolean;
}

export const FormInput = ({
  value,
  isPassword,
  label,
  isOptional,
  maskType,
  error,
  onFocus,
  ...rest
}: IProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  const ref = useRef(null);

  const handleOnFocus = useCallback(
    e => {
      onFocus?.(e);
    },
    [onFocus],
  );

  const togglePassword = useCallback(() => {
    setSecureTextEntry(value => !value);
  }, [setSecureTextEntry]);

  const inputProps = {
    secureTextEntry: secureTextEntry,
    defaultValue: value,
    onFocus: handleOnFocus,
    value: value || '',
    error,
    ...rest,
  };

  return (
    <Label text={label} isOptional={isOptional}>
      <Container>
        {maskType ? (
          <MaskedInput {...inputProps} maskType={maskType} />
        ) : (
          <Input ref={ref} {...inputProps} />
        )}
        {isPassword ? (
          <EyeButton onPress={togglePassword}>
            <Icon name={secureTextEntry ? 'closedEye' : 'eye'} />
          </EyeButton>
        ) : null}
      </Container>
      {error && error !== REQUIRED_FIELD ? <Error>{error}</Error> : null}
    </Label>
  );
};

const EyeButton = styled(BorderlessButton)`
  position: absolute;
  right: 0px;
  width: 44px;
`;

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Error = styled(Text)`
  font-family: Open Sans;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.078px;
  color: #ff8686;
  margin-top: 4px;
`;
