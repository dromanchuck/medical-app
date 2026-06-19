import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  ReactNode,
} from 'react';

import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';

import styled from 'styled-components';
import { StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import { isIOS, navigationBarHeight } from 'services';

import { Backdrop } from './Backdrop';

interface IProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const initialSnapPoints = ['0.1', 'CONTENT_HEIGHT'];

const BOTTOM_INSET = 50;

export const BottomMenu = forwardRef(
  ({ children, title, description }: IProps, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const insets = useSafeAreaInsets();

    useImperativeHandle(ref, () => ({
      show: bottomSheetRef.current?.expand,
      close: bottomSheetRef.current?.close,
    }));

    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    return (
      <BottomSheet
        ref={bottomSheetRef}
        handleIndicatorStyle={style.indicator}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
        enablePanDownToClose={false}
        backdropComponent={Backdrop}>
        <Container
          onLayout={handleContentLayout}
          style={{
            paddingBottom: isIOS
              ? insets.bottom
              : insets.bottom + navigationBarHeight + BOTTOM_INSET,
          }}>
          {title ? <Header>{title}</Header> : null}
          {description ? <PreDescription>{description}</PreDescription> : null}
          {children}
        </Container>
      </BottomSheet>
    );
  },
);

const style = StyleSheet.create({
  indicator: {
    backgroundColor: '#dbe3f1',
    width: 34,
    height: 4,
    borderRadius: 2,
  },
});

const Container = styled(BottomSheetView)`
  background: #ffffff;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Header = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: 800;
  font-size: ${widthPercentageToDP(5.8)}px;
  line-height: ${widthPercentageToDP(8.7)}px;
  align-items: center;
  color: #262b37;
  margin-top: 14px;
  margin-bottom: ${widthPercentageToDP(3)}px;
`;

const PreDescription = styled(Text)`
  font-family: Raleway;
  font-weight: bold;
  font-size: ${widthPercentageToDP(3.1)}px;
  line-height: ${widthPercentageToDP(4.8)}px;
  color: #95989d;
  margin-bottom: ${widthPercentageToDP(3.9)}px;
`;
