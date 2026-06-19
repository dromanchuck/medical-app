import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  Ref,
} from 'react';
import { Alert, Keyboard, Text, View } from 'react-native';
import styled from 'styled-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { AuthTemplate, FormInput } from 'molecules';
import { EScreens, TScreenProps } from 'types';
import { Button } from 'atoms';

import {
  useOnRequestError,
  useTextInput,
  useOnInternalError,
  useFormErrors,
} from 'hooks';

import { loginRequest, selectProfile } from 'core';
import { isIOS, validationService } from 'services';
import { RegistrationSuccessMenu } from 'organisms';

export const Login: FC<TScreenProps<EScreens.Login>> = ({ navigation }) => {
  const [email, setEmail] = useTextInput();
  const [password, setPassword] = useTextInput();
  const [isLoading, setIsLoading] = useState(false);
  const profile = useSelector(selectProfile);

  const successMenuRef: Ref<any> = useRef(null);
  const ref: Ref<any> = useRef(null);
  const isDoctor = profile?.role === 'doc';

  const { errors, setErrors, resetError } = useFormErrors({
    email: '',
    password: '',
  });

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const onFocus = useCallback(
    (index: number, key: keyof typeof errors) => () => {
      ref?.current?.scrollToIndex(index);

      resetError(key);
    },
    [ref, resetError],
  );

  const loginUser = useCallback(() => {
    const currentErrors = {
      email: validationService.validateEmail(email),
      password: validationService.validatePassword(password),
    };

    setErrors(currentErrors);

    const isValid = Object.values(currentErrors).every(error => !error);

    if (isValid) {
      setIsLoading(true);

      Keyboard.dismiss();
      dispatch(loginRequest({ email: email.toLowerCase(), password }));
    }
  }, [dispatch, email, password, setErrors]);

  const onOpenApp = useCallback(() => {
    navigation.push(EScreens.Drawer, { isDoctor });
  }, [navigation, isDoctor]);

  const navigateToForgotPassword = useCallback(() => {
    navigation.navigate(EScreens.ForgotPassword);
  }, [navigation]);

  useEffect(() => {
    setIsLoading(false);

    if (profile.fullName && profile.verified) {
      navigation.push(EScreens.Drawer, {
        isDoctor: profile.role === 'doc',
      });
    }

    if (profile.fullName && !profile.verified) {
      successMenuRef?.current?.show();
    }
  }, [
    profile.fullName,
    successMenuRef,
    profile.role,
    navigation,
    profile.verified,
  ]);

  useOnRequestError(loginRequest, error => {
    if (error?.response?.data?.detail?.includes('No active account')) {
      Alert.alert('Ошибка', 'Такого аккаунта не существует');
    }

    setIsLoading(false);
  });

  useOnInternalError(() => {
    Alert.alert('Ошибка', 'Внутренняя ошибка сервера, повторите попытку позже');

    setIsLoading(false);
    navigation.push(EScreens.Welcome);
  });

  return (
    <>
      <AuthTemplate ref={ref} hasTopInset title="Войти в приложение">
        <Email
          label="E-mail"
          placeholder="email@email.com"
          onFocus={onFocus(0, 'email')}
          value={email}
          onChange={setEmail}
          error={errors.email}
          keyboardType={isIOS ? 'default' : 'visible-password'}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={30}
        />
        <FormInput
          label="Пароль (мин. 8 символов)"
          placeholder="Введите пароль"
          onFocus={onFocus(1, 'password')}
          value={password}
          onChange={setPassword}
          error={errors.password}
          textContentType="oneTimeCode"
          isPassword
        />
        <ForgotPassText>
          Забыли ваш пароль?{' '}
          <PressableText onPress={navigateToForgotPassword}>
            Восстановить пароль
          </PressableText>
        </ForgotPassText>
        <Button isLoading={isLoading} onPress={loginUser}>
          Войти в аккаунт
        </Button>
      </AuthTemplate>
      <NoAccountBtn style={{ bottom: insets.bottom }}>
        <Button onPress={navigation.goBack} type="secondary">
          У меня нет аккаунта
        </Button>
      </NoAccountBtn>
      <RegistrationSuccessMenu ref={successMenuRef} onPress={onOpenApp} />
    </>
  );
};

const Email = styled(FormInput)`
  text-transform: lowercase;
`;

const ForgotPassText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #262b37;
  margin-top: 16px;
  margin-bottom: 32px;
`;

const PressableText = styled(ForgotPassText)`
  color: #22b38c;
`;

const NoAccountBtn = styled(View)`
  position: absolute;
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
`;
