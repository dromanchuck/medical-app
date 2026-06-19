import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

interface IProps {
  children: ReactNode;
  text?: string;
  isOptional?: boolean;
}

export const Label = ({ text = '', children, isOptional = false }: IProps) => {
  return (
    <LabelWrapper>
      <TextWrapper>
        <LabelText>{text}</LabelText>
        {isOptional ? <OptionalText>Опционально</OptionalText> : null}
      </TextWrapper>
      {children}
    </LabelWrapper>
  );
};

const LabelText = styled(Text)`
  font-family: Raleway;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #95989d;
  letter-spacing: -0.154px;
  margin-bottom: 8px;
  margin-top: 8px;
`;

const LabelWrapper = styled(View)`
  margin-bottom: 12px;
  width: 100%;
`;

const TextWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OptionalText = styled(Text)`
  font-family: Open Sans;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #c2c3de;
`;
