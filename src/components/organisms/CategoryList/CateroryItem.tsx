import React, { memo } from 'react';
import styled from 'styled-components';
import { Text, View, Image as FastImage } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Animated, { SlideInRight } from 'react-native-reanimated';

import { IPublicationCategory } from 'types';
import { isAndroid } from 'services';

interface IProps extends IPublicationCategory {
  onPress: () => void;
}

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

export const CategoryItem = memo(
  ({ title, short_title, big_icon_url, onPress }: IProps) => {
    return (
      <Container
        entering={SlideInRight}
        onPress={onPress}
        style={isAndroid ? { elevation: 1, shadowColor: '#000' } : undefined}>
        <TextContainer>
          <Title>{title}</Title>
          <ShortTitle>{short_title}</ShortTitle>
        </TextContainer>
        {big_icon_url ? <Image source={{ uri: big_icon_url }} /> : null}
      </Container>
    );
  },
);

const Container = styled(AnimatedRectButton)`
  background: #ffffff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.03);
  border-radius: 16px;
  padding: 24px 24px 24px 16px;
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 16px;
  margin-left: 16px;
`;

const TextContainer = styled(View)`
  width: 196px;
`;

const Title = styled(Text)`
  font-family: Raleway;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  color: #262b37;
`;

const ShortTitle = styled(Text)`
  font-family: Open Sans;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  color: #95989d;
`;

const Image = styled(FastImage)`
  height: 79px;
  width: 79px;
  margin: 7px;
`;
