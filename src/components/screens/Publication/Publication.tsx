import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
  StyleSheet,
  Text,
  View,
  Image as FastImage,
  Alert,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RenderHtml from 'react-native-render-html';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import WebView from 'react-native-webview';

import Animated, {
  interpolate,
  SlideInDown,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { BackButton } from 'molecules';
import { EScreens, IFullPublication, TScreenProps } from 'types';
import { publicationService, SCREEN_WIDTH } from 'services';
import { BlurView, Icon } from 'atoms';
import { openURL } from 'helpers';

import { Quote } from './Quote';
import {
  customHTMLElementModels,
  htmlStylesContent,
  renderers,
} from './styles';

const HEADER_HEIGHT = 270;
const AnimatedImage = Animated.createAnimatedComponent(FastImage);

export const Publication: FC<TScreenProps<EScreens.Publication>> = ({
  navigation,
  route: {
    params: { thumbnail_url, title, id, area },
  },
}) => {
  const insets = useSafeAreaInsets();
  const [publication, setPublication] = useState<IFullPublication | null>(null);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const isMontedRef = useRef(false);

  const scrollY = useSharedValue(0);

  useEffect(() => {
    isMontedRef.current = true;

    publicationService
      .getPublication(String(id))
      .then(publicationInfo => {
        if (isMontedRef.current) {
          setPublication(publicationInfo);
        }
      })
      .catch(() => {
        Alert.alert('Ошибка', 'Статья не найдена');
        navigation.goBack();
      });

    return () => {
      isMontedRef.current = false;
    };
  }, [id, navigation, isMontedRef]);

  const scrollHandler = useAnimatedScrollHandler(
    event => {
      scrollY.value = event.contentOffset.y;
    },
    [scrollY],
  );

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scrollY.value, [0, -100], [1, 1.7], {
            extrapolateLeft: 'clamp',
          }),
        },
        {
          translateY: interpolate(scrollY.value, [0, 1], [0, -1], {
            extrapolateLeft: 'clamp',
          }),
        },
      ],
    };
  }, [scrollY]);

  const headerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, 1], [0, -1], {
            extrapolateLeft: 'clamp',
          }),
        },
      ],
    };
  }, [scrollY]);

  const hiddenHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT],
            [-100, 0],
            'clamp',
          ),
        },
      ],
    };
  }, [scrollY]);

  const openSource = useCallback(() => {
    if (publication?.source_url) {
      openURL(publication?.source_url);
    }
  }, [publication]);

  const publicationDescription = publication?.description
    .replace(/text-align: justify;/gi, '')
    .replace(/src="\/\//gi, 'src="https://');

  const onHtmlLoaded = useCallback(() => {
    if (isMontedRef.current) {
      setIsContentLoaded(true);
    }
  }, [setIsContentLoaded, isMontedRef]);

  return (
    <>
      <Animated.View style={imageStyle}>
        <Image
          source={{ uri: thumbnail_url }}
          style={[{ paddingTop: insets.top }, StyleSheet.absoluteFillObject]}
        />
        <Gradient
          start={{ x: 0.0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['rgba(38, 43, 55, 0.32)', 'rgba(38, 43, 55, 0)']}
        />
      </Animated.View>

      <ScrollWrapper
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          paddingTop: HEADER_HEIGHT - 10,
        }}
        scrollEventThrottle={16}
        entering={SlideInDown}
        onScroll={scrollHandler}>
        <InnerWrapper>
          <Area>
            <Icon name="sectionLibrary" />
            <AreaTitle>{area.title}</AreaTitle>
          </Area>
          <Title>{title}</Title>
          {publication?.short_title ? (
            <ShortDescription>{publication?.short_title}</ShortDescription>
          ) : null}
          {publication?.quote_text ? (
            <Quote
              text={publication?.quote_text}
              author={publication?.quote_author_full_name}
              authorPosition={publication?.quote_author_position}
            />
          ) : null}
          {isContentLoaded || publication ? null : (
            <ActivityIndicator color={'#22B38C'} />
          )}
          {publicationDescription ? (
            <RenderHtml
              source={{
                html: publicationDescription,
              }}
              renderers={renderers}
              contentWidth={SCREEN_WIDTH}
              ignoredDomTags={['o:p']}
              tagsStyles={htmlStylesContent}
              customHTMLElementModels={customHTMLElementModels}
              onHTMLLoaded={onHtmlLoaded}
              WebView={WebView}
              renderersProps={{
                iframe: {
                  scalesPageToFit: true,
                },
              }}
            />
          ) : null}
          <SourceTitle>Источник</SourceTitle>
          <SourceLink onPress={openSource}>
            {publication?.source_name}
          </SourceLink>
        </InnerWrapper>
      </ScrollWrapper>
      <Header style={[{ paddingTop: insets.top }, headerStyle]}>
        <BackButton onPress={navigation.goBack} />
      </Header>
      <HiddenHeader style={[{ height: insets.top }, hiddenHeaderStyle]} />
    </>
  );
};

const Image = styled(AnimatedImage)`
  width: ${SCREEN_WIDTH}px;
  height: ${HEADER_HEIGHT + 10}px;
  padding-left: 15px;
`;

const ScrollWrapper = styled(Animated.ScrollView)``;

const InnerWrapper = styled(View)`
  background: #fff;
  padding: 20px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const Header = styled(Animated.View)`
  position: absolute;
  padding-left: 16px;
`;

const Title = styled(Text)`
  font-family: Raleway;
  font-weight: 800;
  font-size: 18px;
  line-height: 36px;
  color: #262b37;
  margin-bottom: 12px;
`;

const Area = styled(View)`
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
`;

const AreaTitle = styled(Text)`
  font-family: Open Sans;
  font-weight: bold;
  font-size: 11px;
  line-height: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #98e7a5;
  margin-left: 8px;
`;

const ShortDescription = styled(Text)`
  font-family: Raleway;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  color: #95989d;
  margin-bottom: 24px;
`;

const HiddenHeader = styled(BlurView)`
  position: absolute;
  width: 100%;
`;

const SourceTitle = styled(Text)`
  font-family: Raleway;
  font-style: italic;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #95989d;
  margin-top: 24px;
  margin-bottom: 4px;
`;

const SourceLink = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #22b38c;
`;

const Gradient = styled(LinearGradient)`
  width: ${SCREEN_WIDTH}px;
  height: ${HEADER_HEIGHT + 10}px;
  position: absolute;
  top: 0;
`;
