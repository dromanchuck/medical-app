import React, { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated';

import Svg, { Circle } from 'react-native-svg';
import styled from 'styled-components';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const { PI } = Math;

interface IProps {
  value: number;
  strokeWidth?: number;
  size?: number;
  children?: React.ReactChild;
}

export const CircularProgress = memo(
  ({ value, children, size = 80, strokeWidth = 4 }: IProps) => {
    const progress = useSharedValue(0);

    const { r, cx, cy } = {
      r: (size - strokeWidth) / 2,
      cx: size / 2,
      cy: size / 2,
    };

    const circumference = r * 2 * PI;

    useEffect(() => {
      progress.value = withTiming(value, { duration: 300 });
    }, [value]);

    const animatedProps = useAnimatedProps(() => {
      return {
        strokeDashoffset: circumference - circumference * progress.value,
      };
    }, [progress]);

    return (
      <View style={[{ width: size + 2, height: size + 2 }]}>
        <TextContainer>{children}</TextContainer>
        <Svg width={size} height={size} style={styles.container}>
          <Circle
            stroke={'#DBE3F1'}
            fill="none"
            {...{
              strokeWidth,
              cx,
              cy,
              r,
            }}
          />
          <AnimatedCircle
            stroke={'#22B38C'}
            fill="none"
            strokeDasharray={`${circumference}, ${circumference}`}
            strokeWidth={strokeWidth}
            cx={cx}
            cy={cy}
            r={r}
            animatedProps={animatedProps}
          />
        </Svg>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: '270deg' }],
  },
});

const TextContainer = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;
