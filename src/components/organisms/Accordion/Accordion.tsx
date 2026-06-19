import React, { ReactNode, useCallback } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BaseButton } from 'react-native-gesture-handler';
import styled from 'styled-components';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  useDerivedValue,
  FadeIn,
} from 'react-native-reanimated';

import { Chevron } from 'molecules';

interface IProps {
  children: ReactNode;
  title: string;
  headerStyle?: StyleProp<ViewStyle>;
}

const AnimatedButton = Animated.createAnimatedComponent(BaseButton);

export const Accordion = ({ children, title, headerStyle }: IProps) => {
  const open = useSharedValue(0);
  const height = useSharedValue(0);

  const transition = useDerivedValue(() => {
    return withTiming(open.value);
  });

  const onPress = useCallback(() => {
    open.value = open.value === 0 ? 1 : 0;
  }, [open]);

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(open.value),
    };
  }, [open]);

  const activeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(open.value === 0 ? 1 : 0),
    };
  }, [open]);

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(transition.value, [0, 1], [0, Math.PI])}rad`,
        },
      ],
    };
  }, [transition]);

  const contentStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(open.value === 1 ? height.value : 0, {
        duration: 200,
      }),
      opacity: interpolate(transition.value, [0.5, 1], [0, 1]),
    };
  });

  const onLayout = useCallback(
    ({
      nativeEvent: {
        layout: { height: h },
      },
    }) => {
      height.value = h;
    },
    [height],
  );

  return (
    <>
      <AnimatedButton
        onPress={onPress}
        style={headerStyle}
        entering={FadeIn.duration(300)}>
        <Container>
          <Title>{title}</Title>
          <ChevronRight>
            <Chevron isActive={false} style={style} iconStyle={iconStyle} />
            <Chevron
              isActive={true}
              style={[StyleSheet.absoluteFillObject, activeStyle]}
              iconStyle={iconStyle}
            />
          </ChevronRight>
        </Container>
      </AnimatedButton>
      <HiddenView onLayout={onLayout}>{children}</HiddenView>
      <Animated.View style={[contentStyle]}>
        <View>{children}</View>
      </Animated.View>
      <Border style={activeStyle} />
    </>
  );
};

const Container = styled(View)`
  flex-direction: row;
  margin-bottom: 12px;
`;

const Title = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: #262b37;
  padding-right: 30px;
`;

const ChevronRight = styled(View)`
  position: absolute;
  right: 0;
  top: 0;
`;

const HiddenView = styled(View)`
  position: absolute;
  opacity: 0;
  zindex: 0;
`;

const Border = styled(Animated.View)`
  width: 100%;
  height: 1px;
  background: #dbe3f1;
  margin-top: 5px;
`;
