import React from 'react';
import { View } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components';

import { SCREEN_WIDTH } from 'services';
import { IBanner } from 'types';

import { Banner } from './Banner';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface IProps {
  items: IBanner[];
}

const renderItem = ({ item }: { item: unknown }) => {
  const banner = item as IBanner;
  return <Banner {...banner} />;
};

const emptyBanner: IBanner = {
  desktop_url: '',
  mobile_url: '',
  name: '',
  web_url: '',
  mob_url: '',
};

export const Banners = ({ items }: IProps) => {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.x;
  });

  const activeDotStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            items.length > 1
              ? interpolate(
                  scrollY.value,
                  items.map((_item, index) => index * SCREEN_WIDTH),
                  items.map((_item, index) => index * 10),
                )
              : 0,
        },
      ],
    };
  }, [scrollY]);

  return (
    <View>
      {items.length > 0 ? (
        <AnimatedFlatList
          data={items as IBanner[]}
          renderItem={renderItem}
          pagingEnabled={true}
          keyExtractor={item => `feed_${(item as IBanner)?.name}`}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.list}
          initialNumToRender={1}
        />
      ) : (
        <Banner {...emptyBanner} />
      )}
      <Dots>
        {items.map((item, index) => (
          <Dot key={item.name} isLast={index === items.length - 1} />
        ))}
        <ActiveDot style={activeDotStyle} />
      </Dots>
    </View>
  );
};

const styles = {
  list: { paddingTop: 16 },
};

const Dots = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  align-self: center;
`;

const Dot = styled(Animated.View)<{ isLast?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50px;
  background: #d9f0ef;
  margin-right: ${({ isLast }) => (isLast ? 0 : 4)}px;
`;

const ActiveDot = styled(Dot)`
  position: absolute;
  background: #22b38c;
`;
