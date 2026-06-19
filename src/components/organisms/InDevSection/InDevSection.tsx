import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';
import { Text, View } from 'react-native';

import { Icon } from 'atoms';
import { PartnersFooter } from '../PartnersFooter';
import { UsersCount } from '../UsersCount';

export const InDevSection = () => {
  return (
    <Container>
      <Main>
        <Icon name="indevSection" />
        <Title>Раздел в разработке</Title>
        <SubTitle>
          {`Приносим свои извинения за временные\n неудобства. Спасибо за понимание.`}
        </SubTitle>
      </Main>
      <Footer>
        <UsersCount />
        <PartnersFooter />
      </Footer>
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  flex: 1;
`;

const Footer = styled(View)`
  flex: 0.3;
`;

const Main = styled(View)`
  flex: 0.7;
  align-items: center;
  justify-content: center;
`;

const Title = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 36px;
  margin-top: 32px;
  color: #262b37;
`;

const SubTitle = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  color: #95989d;
  margin-top: 12px;
`;
