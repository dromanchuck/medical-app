import React, { useCallback } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Animated, { SlideInRight } from 'react-native-reanimated';

import { SCREEN_WIDTH } from 'services';
import { IBanner } from 'types';
import { ButtonView } from 'atoms';
import { openURL } from 'helpers';

interface IProps extends IBanner {}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const Banner = ({ mobile_url, web_url, mob_url }: IProps) => {
  const openLink = useCallback(() => {
    const url = mob_url || web_url;

    if (url) {
      openURL(url);
    }
  }, [mob_url, web_url]);

  return (
    <BannerContainer
      entering={SlideInRight}
      onPress={openLink}
      activeOpacity={0.8}>
      {mobile_url ? (
        <BannerImage source={{ uri: mobile_url }} resizeMode="cover" />
      ) : (
        <BannerEmpty />
      )}
      <Btn>
        {mobile_url ? <ButtonView type="secondary">Перейти</ButtonView> : null}
      </Btn>
    </BannerContainer>
  );
};

const BannerContainer = styled(AnimatedTouchable)`
  width: ${SCREEN_WIDTH}px;
  height: 152px;
  align-items: center;
  border-radius: 16px;
  overflow: hidden;
`;

const BannerImage = styled(Image)`
  background: #22b38c;
  border-radius: 16px;
  width: ${SCREEN_WIDTH - 32}px;
  height: 100%;
  position: relative;
`;

const BannerEmpty = styled(View)`
  background: #22b38c;
  border-radius: 16px;
  width: ${SCREEN_WIDTH - 32}px;
  height: 100%;
  position: relative;
`;

const Btn = styled(View)`
  position: absolute;
  width: 97px;
  left: 30px;
  top: 90px;
`;
