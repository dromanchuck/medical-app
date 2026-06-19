import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { Image, Text } from 'react-native';

import { Icon, TIcon } from 'atoms';

interface IProps {
  text: string;
  icon?: TIcon;
  iconUrl?: string;
  onPress: () => void;
}

export const DrawerItem = ({ icon, text, iconUrl, onPress }: IProps) => {
  return (
    <Container onPress={onPress}>
      {icon ? (
        <Icon name={icon} />
      ) : iconUrl ? (
        <IconImage source={{ uri: iconUrl }} />
      ) : null}
      <ItemText>{text}</ItemText>
    </Container>
  );
};

const Container = styled(RectButton)`
  flex-direction: row;
  align-items: center;
`;

const ItemText = styled(Text)`
  font-family: Raleway;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #262b37;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const IconImage = styled(Image)`
  width: 24px;
  height: 24px;
  margin-right: 18px;
  margin-left: 6px;
`;
