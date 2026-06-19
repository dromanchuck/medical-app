import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import { BaseButton } from 'react-native-gesture-handler';

import { Icon, TIcon } from 'atoms';

interface IProps {
  icon: TIcon;
  name: string;
  onPress: () => void;
}

export const NavButton = ({ icon, name, onPress }: IProps) => {
  return (
    <BaseButton onPress={onPress}>
      <Container>
        <IconWrapper>
          <Icon name={icon} />
        </IconWrapper>
        <Name>{name}</Name>
        <Chevron>
          <Icon name="chevronRight" />
        </Chevron>
      </Container>
    </BaseButton>
  );
};

const Container = styled(View)`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #dbe3f1;
  height: 64px;
  align-items: center;
`;

const Name = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  color: #262b37;
`;

const IconWrapper = styled(View)`
  margin-right: 16px;
`;

const Chevron = styled(View)`
  position: absolute;
  right: 0;
`;
