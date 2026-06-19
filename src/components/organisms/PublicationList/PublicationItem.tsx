import React from 'react';
import { Text, View, Image as FastImage } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated, { SlideInRight } from 'react-native-reanimated';
import styled from 'styled-components';

import { isAndroid } from 'services';
import { IPublication } from 'types';

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

interface IProps extends IPublication {
  onPress: () => void;
}

export const PublicationItem = ({
  thumbnail_url,
  title,
  short_title,
  onPress,
}: IProps) => {
  return (
    <Container
      entering={SlideInRight}
      onPress={onPress}
      style={isAndroid ? { elevation: 1, shadowColor: '#000' } : undefined}>
      <Image source={{ uri: thumbnail_url }} />
      <TextContainer>
        <Title>{title}</Title>
        <ShortDescription>{short_title}</ShortDescription>
      </TextContainer>
    </Container>
  );
};

const Container = styled(AnimatedRectButton)`
  background: #fff;
  box-shadow: 0px 0px 55px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  margin-bottom: 16px;
  margin-left: 16px;
  margin-right: 16px;
`;

const Image = styled(FastImage)`
  width: 100%;
  height: 160px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const TextContainer = styled(View)`
  padding: 16px;
`;

const Title = styled(Text)`
  font-family: Raleway;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  color: #262b37;
`;

const ShortDescription = styled(Text)`
  font-family: Open Sans;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  color: #95989d;
  margin-top: 4px;
`;
