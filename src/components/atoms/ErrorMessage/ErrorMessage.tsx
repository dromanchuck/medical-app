import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

interface IProps {
  children: string;
}

export const ErrorMessage = ({ children: message }: IProps) => {
  return <Message>{message}</Message>;
};

const Message = styled(Text)`
  background: rgba(255, 134, 134, 0.16);
  border-radius: 6px;
  padding: 12px;
  color: #ff8686;
  border-radius: 6px;
`;
