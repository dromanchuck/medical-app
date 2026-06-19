import React from 'react';
import styled from 'styled-components';
import { Linking, Text } from 'react-native';

import { Checkbox } from 'molecules';

interface IProps {
  agreed: boolean;
  onChange: (agreed: boolean) => void;
  error?: string;
}

const openURL = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  }
};

export const PolicyAgreement = ({ agreed, error, onChange }: IProps) => {
  return (
    <CheckboxComponent checked={agreed} onChange={onChange} error={error}>
      Я согласен с{' '}
      <PressableText
        onPress={() => {
          openURL(
            'https://drive.google.com/file/d/1CGjp8LKF3nVqOKgKedE4h_mVamjmfpWy/view',
          );
        }}>
        политикой конфиденциальности
      </PressableText>{' '}
      и{' '}
      <PressableText
        onPress={() => {
          openURL(
            'https://drive.google.com/file/d/1jALGESCWl04bUyUvU_2ZgAfthGWPp309/view',
          );
        }}>
        пользовательским соглашением
      </PressableText>
      , а также выражаю согласие на обработку персональных данных
    </CheckboxComponent>
  );
};

const CheckboxComponent = styled(Checkbox)`
  margin-bottom: 12px;
`;

const PressableText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #22b38c;
`;
