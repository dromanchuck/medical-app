import React, {
  FC,
  ReactNode,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
} from 'react';

import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';
import { useAnimatedRef } from 'react-native-reanimated';

import { FollowKeyboardScrollView, ErrorMessage, Icon } from 'atoms';

interface IProps {
  children: ReactNode;
  title: string;
  hasTopInset?: boolean;
  hasRequiredFieldError?: boolean;
  renderHeader?: () => ReactNode;
  renderButtons?: () => ReactNode;
}

const HEADER_HEIGHT = 100;
const FIELD_HEIGHT = 80;

const renderDefaultHeader = () => <Icon name="smallLogo" />;

export const AuthTemplate: FC<IProps> = forwardRef(
  (
    {
      children,
      hasRequiredFieldError,
      title,
      hasTopInset = false,
      renderButtons,
      renderHeader,
    },
    ref: ForwardedRef<{ scrollToIndex: (index: number) => void }>,
  ) => {
    const scrollRef = useAnimatedRef();

    useImperativeHandle(ref, () => ({
      scrollToIndex: (index: number) => {
        scrollRef?.current?.scrollToOffset({
          offset: HEADER_HEIGHT + FIELD_HEIGHT * index,
        });
      },
    }));

    return (
      <FollowKeyboardScrollView ref={scrollRef}>
        <>
          <HeadContainer style={hasTopInset ? styles.header : undefined}>
            {renderHeader ? renderHeader() : renderDefaultHeader()}
          </HeadContainer>
          <Title>{title}</Title>
          {children}
          {hasRequiredFieldError ? (
            <ErrorMessage>
              Пожалуйста, заполните все обязательные поля
            </ErrorMessage>
          ) : null}
          {renderButtons ? renderButtons() : null}
        </>
      </FollowKeyboardScrollView>
    );
  },
);

const HeadContainer = styled(View)`
  width: 70px;
  height: 70px;
  margin-top: 36px;
  margin-bottom: 24px;
`;

const Title = styled(Text)`
  color: #262b37;
  font-size: 24px;
  line-height: 36px;
  margin-bottom: 12px;
  font-family: Raleway;
  font-weight: 800;
`;

const styles = StyleSheet.create({
  header: {
    marginTop: 72,
  },
});
