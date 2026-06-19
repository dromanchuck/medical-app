import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

import { Icon } from 'atoms';

interface IProps {
  name: string;
}

export const Header = ({ name }: IProps) => {
  return (
    <Container>
      <IconWrapper>
        <Icon name="sectionAlgorithm" />
      </IconWrapper>
      <Name>{name}</Name>
    </Container>
  );
};

const Container = styled(View)`
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  background: #ffffff;
  box-shadow: 0px 0px 55px rgba(0, 0, 0, 0.05);
  flex-direction: row;
  padding: 16px;
  align-items: flex-start;
  padding-bottom: 24px;
`;

const IconWrapper = styled(View)`
  transform: scale(0.68) translateY(-5px);
`;

const Name = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  color: #262b37;
  flex: 1;
  margin-left: 10px;
`;
