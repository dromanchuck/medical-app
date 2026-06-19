import React, { FC, useCallback, useState, useRef } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthTemplate, FormInput } from 'molecules';
import { Button } from 'atoms';
import { EScreens, TScreenProps } from 'types';
import { useTextInput } from 'hooks';
import { authService, validationService } from 'services';

export const SetNewPassword: FC<TScreenProps<EScreens.SetNewPassword>> = ({
  navigation,
  route,
}) => {
  const [password, setPassword] = useTextInput();
  const [repeatPassword, setRepeatPassword] = useTextInput();
  const [errors, setErrors] = useState({ password: '', repeatPassword: '' });
  const scrollRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const token = route?.params?.token as string;

  const onFocus = useCallback(
    (index: number, error: keyof typeof errors) => () => {
      scrollRef?.current?.scrollToIndex(index);

      setErrors(errors => ({ ...errors, [error]: '' }));
    },
    [setErrors, scrollRef],
  );

  const navigateToWelcome = useCallback(() => {
    navigation.navigate(EScreens.Welcome);
  }, [navigation]);

  const acceptPassword = useCallback(() => {
    const errors = {
      password: validationService.validatePassword(password),
      repeatPassword: validationService.validateRepeatedPassword(
        password,
        repeatPassword,
      ),
    };

    setErrors(errors);

    const isValid = Object.values(errors).every(error => !Boolean(error));

    if (isValid) {
      setIsLoading(true);

      authService
        .createPassword(token, password)
        .then(() => {
          navigation.navigate(EScreens.Login);
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [password, repeatPassword, token, navigation, setIsLoading]);

  return (
    <>
      <AuthTemplate ref={scrollRef} hasTopInset title="Создать пароль">
        <Description>
          Создайте новый и сильный пароль, который Вы не используете на других
          веб сервисах.
        </Description>
        <FormInput
          placeholder={'Задайте новый пароль'}
          value={password}
          isPassword
          onChange={setPassword}
          textContentType="oneTimeCode"
          label={'Новый пароль (мин. 8 символов)'}
          onFocus={onFocus(0, 'password')}
          error={errors.password}
        />
        <FormInput
          placeholder={'Повторите пароль'}
          value={repeatPassword}
          isPassword
          textContentType="oneTimeCode"
          onChange={setRepeatPassword}
          label={'Повторите пароль (мин. 8 символов)'}
          onFocus={onFocus(0, 'repeatPassword')}
          error={errors.repeatPassword}
        />
        <AcceptBtn onPress={acceptPassword} isLoading={isLoading}>
          Подтвердить пароль
        </AcceptBtn>
      </AuthTemplate>
      <NoAccountBtn style={{ bottom: insets.bottom }}>
        <Button onPress={navigateToWelcome} type="secondary">
          У меня нет аккаунта
        </Button>
      </NoAccountBtn>
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

const AcceptBtn = styled(Button)`
  margin-top: 24px;
`;

const NoAccountBtn = styled(View)`
  position: absolute;
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
`;
