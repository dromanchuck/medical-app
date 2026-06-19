import React, { ReactNode, forwardRef } from 'react';
import { Animated, Image, ImageSourcePropType, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import styled from 'styled-components';
import { FollowKeyboardScrollView } from 'atoms';

import { DrugTitle } from './DrugTitle';
import { isIOS } from 'services';

interface IProps {
  children: ReactNode;
  imageUrl?: ImageSourcePropType;
}

const TOP_PADDING = 16;

export const DrugTemplate = forwardRef(
  ({ children, imageUrl }: IProps, ref) => {
    const headerHeight = useHeaderHeight();

    return (
      <FollowKeyboardScrollView
        headerVisible
        ref={ref}
        style={{
          paddingTop: isIOS ? TOP_PADDING : headerHeight + TOP_PADDING,
        }}>
        <InnerContainer>
          {imageUrl ? (
            <ImgBorder>
              <Image source={imageUrl} resizeMode="cover" />
            </ImgBorder>
          ) : null}
          <DrugTitle
            title="Дуодопа® гель интестинальный"
            subtitle="Леводопа + [Карбидопа] (Levodopa + [Carbidopa])"
          />
          {children}
        </InnerContainer>
      </FollowKeyboardScrollView>
    );
  },
);

const InnerContainer = styled(Animated.View)`
  background: #fff;
  padding: 16px;
  box-shadow: 0px 0px 55px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
`;

const ImgBorder = styled(View)`
  border: 1px solid rgba(6, 88, 253, 0.2);
  border-radius: 9.33333px;
  padding: 18px 16px;
  align-items: center;
  margin-bottom: 24px;
`;
