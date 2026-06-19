import React, { ForwardedRef, forwardRef, useCallback } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import BottomSheet from '@gorhom/bottom-sheet';

import { Button, Icon } from 'atoms';
import { BottomMenu } from 'molecules';

export const SendMessageSuccessMenu = forwardRef(
  ({}, ref: ForwardedRef<typeof BottomSheet>) => {
    const onPressButton = useCallback(() => {
      ref?.current?.close();
    }, [ref]);

    return (
      <BottomMenu ref={ref}>
        <Wrapper>
          <IconWrapper>
            <Icon name="menuMessage" />
          </IconWrapper>
          <MessageTitle>Спасибо за сообщение!</MessageTitle>
          <Message>
            {`Ответ может занять некоторое время.\n Он будет отправлен на вашу почту.`}
          </Message>
          <Button type="secondary" onPress={onPressButton}>
            Отправить еще сообщение
          </Button>
        </Wrapper>
      </BottomMenu>
    );
  },
);

const Wrapper = styled(View)``;

const MessageTitle = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  color: #262b37;
  margin-bottom: 12px;
`;

const Message = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  color: #95989d;
  margin-bottom: 24px;
`;

const IconWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  margin-top: 62px;
  margin-bottom: 54px;
`;
