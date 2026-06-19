import React, { useState, forwardRef, ReactElement, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import Animated, {
  Extrapolate,
  interpolate,
  Layout,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import { useKeyboardListener } from 'hooks';
import { isIOS } from 'services';
import { StyleProp, ViewStyle } from 'react-native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface IProps {
  children: ReactElement<any>;
  data?: any[];
  isTopInsetEnabled?: boolean;
  scrollEnabled?: boolean;
  headerVisible?: boolean;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_BOTTOM_OFFSET = 50;

export const FollowKeyboardScrollView = forwardRef(
  (
    {
      children,
      style,
      scrollEnabled = true,
      isTopInsetEnabled = true,
      headerVisible = false,
    }: IProps,
    ref,
  ) => {
    const insets = useSafeAreaInsets();
    const [paddingBottom, setPaddingBottom] = useState(insets.bottom);

    const scrollY = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler(
      event => {
        scrollY.value = event.contentOffset.y;
      },
      [scrollY],
    );

    useKeyboardListener(
      event => {
        setPaddingBottom(
          isIOS
            ? event.endCoordinates.height + insets.bottom
            : event.endCoordinates.height +
                insets.bottom +
                DEFAULT_BOTTOM_OFFSET,
        );
      },
      () => {
        if (scrollEnabled) {
          setPaddingBottom(insets.bottom + DEFAULT_BOTTOM_OFFSET);
        }
      },
    );

    useEffect(() => {
      if (scrollEnabled) {
        setPaddingBottom(insets.bottom + DEFAULT_BOTTOM_OFFSET);
      }
    }, [scrollEnabled]);

    const topStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              [0, 80],
              [-100, 0],
              Extrapolate.CLAMP,
            ),
          },
        ],
        height: insets.top,
      };
    }, [insets]);

    return (
      <>
        <ScrollWrapper
          ref={ref}
          scrollEnabled={scrollEnabled}
          contentContainerStyle={[
            {
              paddingBottom: isIOS ? paddingBottom : paddingBottom + 20,
              paddingTop: isTopInsetEnabled ? insets.top : 0,
            },
            style,
          ]}
          onScroll={onScroll}
          layout={Layout.delay(1000)}
          data={[]}
          renderItem={() => null}
          ListHeaderComponent={children}
          scrollEventThrottle={16}
          scrollToOverflowEnabled={true}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="always"
        />
        {headerVisible ? null : <TopInset style={topStyle} />}
      </>
    );
  },
);

const ScrollWrapper = styled(AnimatedFlatList)`
  padding-left: 12px;
  padding-right: 12px;
`;

const TopInset = styled(Animated.View)`
  background: #fff;
  position: absolute;
  top: 0;
  width: 100%;
`;
