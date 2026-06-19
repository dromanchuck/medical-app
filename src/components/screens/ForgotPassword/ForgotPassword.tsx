import React, { FC, useCallback, useRef, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import styled from 'styled-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthTemplate, FormInput } from 'molecules';
import { EScreens, TScreenProps } from 'types';
import { Button } from 'atoms';
import { useTextInput } from 'hooks';
import { authService, isIOS, validationService } from 'services';

import { SendEmailSuccessMenu } from './SendEmailSuccessMenu';

export const ForgotPassword: FC<TScreenProps<EScreens.ForgotPassword>> = ({
  navigation,
}) => {
  const ref = useRef(null);
  const menuRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useTextInput();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigateToWelcome = useCallback(() => {
    navigation.navigate(EScreens.Welcome);
  }, [navigation]);

  const sendEmail = useCallback(() => {
    const error = validationService.validateEmail(email.toLowerCase());
    setError(error);
    Keyboard.dismiss();

    if (!error) {
      setIsLoading(true);

      authService
        .forgotPassword(email)
        .then(() => {
          menuRef?.current?.show();
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [email, menuRef]);

  const onFocus = useCallback(() => {
    setError('');
    ref?.current?.scrollToIndex(0);
  }, [setError]);

  const onPressLogin = useCallback(() => {
    navigation.navigate(EScreens.Login);
  }, [navigation]);

  const onPressRegister = useCallback(() => {
    navigation.navigate(EScreens.Welcome);
  }, [navigation]);

  return (
    <>
      <AuthTemplate ref={ref} hasTopInset title="Забыли пароль?">
        <Description>
          На указанный вами адрес будет отправлено письмо. Пожалуйста, проверьте
          вашу почту и откройте данное письмо.
        </Description>
        <FormInput
          value={email}
          onChange={setEmail}
          label="E-mail"
          placeholder="email@email.com"
          error={error}
          keyboardType={isIOS ? 'default' : 'visible-password'}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={30}
          onFocus={onFocus}
          style={{ textTransform: 'lowercase' }}
        />
        <SendButton isLoading={isLoading} onPress={sendEmail}>
          Войти в аккаунт
        </SendButton>
      </AuthTemplate>
      <NoAccountBtn style={{ bottom: insets.bottom }}>
        <Button onPress={navigateToWelcome} type="secondary">
          У меня нет аккаунта
        </Button>
      </NoAccountBtn>
      <SendEmailSuccessMenu
        ref={menuRef}
        onPressLogin={onPressLogin}
        onPressRegister={onPressRegister}
      />
    </>
  );
};

const Description = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  color: #95989d;
  margin-bottom: 32px;
`;

const NoAccountBtn = styled(View)`
  position: absolute;
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
`;

const SendButton = styled(Button)`
  margin-top: 24px;
`;
