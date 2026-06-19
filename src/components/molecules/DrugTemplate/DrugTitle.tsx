import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

interface IProps {
  title: string;
  subtitle: string;
}

export const DrugTitle = ({ title, subtitle }: IProps) => {
  return (
    <>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </>
  );
};

const Title = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 30px;
  color: #262b37;
  margin-bottom: 1px;
`;

const Subtitle = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  color: #95989d;
  margin-bottom: 16px;
`;
