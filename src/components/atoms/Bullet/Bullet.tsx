import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

export interface IBullet {
  id: number;
  text: string;
  title?: string;
}

export const Bullet = ({ title, text }: IBullet) => {
  return (
    <Container>
      <Dot />
      <View>
        {title ? <Title>{title}</Title> : null}
        <Content>{text}</Content>
      </View>
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
  margin-bottom: 4px;
`;

const Dot = styled(View)`
  background: #22b38c;
  width: 4px;
  height: 4px;
  border-radius: 50px;
  margin: 8px 8px 8px 0;
`;

const Content = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  color: #95989d;
`;

const Title = styled(Content)`
  color: #262b37;
`;
