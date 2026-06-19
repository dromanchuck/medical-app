import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

import { openURL } from 'helpers';
import { ISource } from 'types';

interface IProps {
  sources: ISource[];
}

export const Sources = ({ sources }: IProps) => {
  const onPressLink = (url: string) => () => {
    openURL(url);
  };

  return (
    <>
      <Title>Источники:</Title>
      {sources.map(item => (
        <Container key={item.id}>
          <Bullet />
          <Link>
            {item.text}
            {'\n'}
            {item.links.map(item => (
              <PressableText key={item.link} onPress={onPressLink(item.link)}>
                {item.title}{' '}
              </PressableText>
            ))}
          </Link>
        </Container>
      ))}
    </>
  );
};

const Title = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: #262b37;
`;

const Container = styled(View)`
  flex-direction: row;
`;

const Bullet = styled(View)`
  background: #95989d;
  width: 3px;
  height: 3px;
  border-radius: 50px;
  margin-right: 12px;
  margin-top: 10px;
`;

const Link = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  color: #95989d;
  flex: 1;
`;

const PressableText = styled(Link)`
  color: #22b38c;
`;
