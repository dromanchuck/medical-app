import React, { useMemo } from 'react';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import styled from 'styled-components';

export const Backdrop = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          animatedIndex.value,
          [0, 0.05],
          [1000, 0],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  );

  return <BlurView style={containerStyle} />;
};

const BlurView = styled(Animated.View)`
  width: 100%;
  height: 100%;
  background-color: rgba(38, 43, 55, 0.5);
`;
