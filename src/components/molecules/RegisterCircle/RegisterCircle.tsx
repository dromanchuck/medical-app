import React from 'react';
import styled from 'styled-components';
import { Text, View } from 'react-native';

import { CircularProgress } from 'atoms';

interface IProps {
  step: 1 | 2 | 3;
}

const stepsValues = [0.34, 0.7, 1];

export const RegisterCircle = ({ step }: IProps) => {
  return (
    <CircularProgress value={stepsValues[step - 1]}>
      <StepCircle>
        <StepText>{step}/3</StepText>
      </StepCircle>
    </CircularProgress>
  );
};

const StepCircle = styled(View)`
  width: 55px;
  height: 55px;
  background: #22b38c;
  border-radius: 100px;
  transform: translateY(-1px) translateX(-1px);
  align-items: center;
  justify-content: center;
`;

const StepText = styled(Text)`
  font-size: 14px;
  line-height: 20px;
  font-family: Open Sans;
  letter-spacing: -0.4px;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: bold;
`;
