import React, { FC, RefObject, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Alert, Keyboard, View } from 'react-native';

import { EScreens, TScreenProps, TGender } from 'types';
import { Button, Icon } from 'atoms';
import { FormInput as Input, RegisterCircle, AuthTemplate } from 'molecules';
import { isIOS, REQUIRED_FIELD, validationService } from 'services';
import { PolicyAgreement, RegistrationSuccessMenu } from 'organisms';
import { ERRORS, registerPatientRequest } from 'core';

import {
  useOnRequestError,
  useOnRequestSuccess,
  useOnInternalError,
} from 'hooks';

import { GenderSelection } from './GenderSelection';

const renderHeader = (isDoctor: boolean) => () =>
  isDoctor ? <RegisterCircle step={1} /> : <Icon name="smallLogo" />;

const defaultErrors = {
  fullName: '',
  birthday: '',
  email: '',
  password: '',
  repeatPassword: '',
  phone: '',
};

export const RegisterStepOne: FC<TScreenProps<EScreens.RegisterStepOne>> = ({
  navigation,
  route: {
    params: { isDoctor },
  },
}) => {
  const [fullName, setFullname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [gender, setGender] = useState<TGender>('man');
  const [agreeWithPolicy, setAgreeWithPolicy] = useState(false);
  const scrollRef: RefObject<any> = useRef(null);
  const successMenuRef: RefObject<any> = useRef(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>(
    isDoctor ? { ...defaultErrors } : { ...defaultErrors, agreeWithPolicy: '' },
  );

  const hasRequiredFieldError = Boolean(
    Object.values(errors).find(item => item === REQUIRED_FIELD),
  );

  const navigateNext = useCallback(() => {
    const currentErrors: { [key: string]: string } = {
      fullName: validationService.validateName(fullName),
      birthday: validationService.validateDate(birthday),
      password: validationService.validatePassword(password),
      repeatPassword: validationService.validateRepeatedPassword(
        password,
        repeatPassword,
      ),
      phone: validationService.validatePhoneNumber(phone),
      email: validationService.validateEmail(email),
    };

    if (!isDoctor) {
      currentErrors.agreeWithPolicy = agreeWithPolicy ? '' : REQUIRED_FIELD;
    }

    setErrors(currentErrors);
    const isValid = Object.values(currentErrors).every(error => !error);
    Keyboard.dismiss();

    if (isDoctor && isValid) {
      navigation.push(EScreens.RegisterStepTwo, {
        fullName,
        birthday,
        phone,
        email,
        password,
        gender,
      });
    }

    if (!isDoctor && isValid) {
      setIsLoading(true);

      dispatch(
        registerPatientRequest({
          fullName,
          birthday,
          phone,
          email,
          password,
          gender,
        }),
      );
    }
  }, [
    agreeWithPolicy,
    birthday,
    dispatch,
    email,
    fullName,
    gender,
    isDoctor,
    navigation,
    password,
    phone,
    repeatPassword,
  ]);

  const resetError = useCallback(
    (key: keyof typeof errors) => {
      if (errors[key]) {
        setErrors(errorsValues => ({ ...errorsValues, [key]: '' }));
      }
    },
    [errors],
  );

  const onFocus = useCallback(
    (index: number, key: keyof typeof errors) => () => {
      scrollRef.current.scrollToIndex(index);
      resetError(key);
    },
    [scrollRef, resetError],
  );

  const onChangeCheckbox = useCallback(
    checked => {
      setErrors(state => ({ ...state, agreeWithPolicy: '' }));
      setAgreeWithPolicy(checked);
    },
    [setErrors, setAgreeWithPolicy],
  );

  useOnRequestSuccess(registerPatientRequest, () => {
    setIsLoading(false);

    successMenuRef?.current?.show();
  });

  useOnRequestError(registerPatientRequest, (error: string) => {
    if (ERRORS[error]) {
      Alert.alert('Ошибка', ERRORS[error]);
    }

    setIsLoading(false);
  });

  const renderButtons = useCallback(
    () => (
      <ButtonContainer>
        <Btn onPress={navigateNext} isLoading={isLoading}>
          {isDoctor ? 'Далее' : 'Зарегистрироваться'}
        </Btn>
      </ButtonContainer>
    ),
    [navigateNext, isDoctor, isLoading],
  );

  const navigateToDrawer = useCallback(() => {
    navigation.push(EScreens.Drawer, { isDoctor });
  }, [navigation, isDoctor]);

  useOnInternalError(() => {
    Alert.alert(
      'Ошибка',
      'Не удалось зарегистрировать пользователя, повторите регистрацию позже',
    );

    setIsLoading(false);
    navigation.push(EScreens.Welcome);
  });

  return (
    <>
      <AuthTemplate
        ref={scrollRef}
        renderHeader={renderHeader(isDoctor)}
        hasRequiredFieldError={hasRequiredFieldError}
        renderButtons={renderButtons}
        title="Регистрация">
        <Input
          placeholder={'Фамилия Имя Отчество'}
          value={fullName}
          label={'Фамилия Имя Отчество'}
          onChange={event => {
            setFullname(event.nativeEvent.text);
          }}
          onFocus={onFocus(0, 'fullName')}
          error={errors.fullName}
          maxLength={60}
        />
        <Input
          placeholder={'dd.mm.yyyy'}
          value={birthday}
          onChange={event => {
            setBirthday(event.nativeEvent.text);
          }}
          label={'Дата рождения'}
          onFocus={onFocus(1, 'birthday')}
          error={errors.birthday}
          maskType="date"
          maxLength={10}
          keyboardType={'number-pad'}
        />

        <GenderSelection
          gender={gender}
          onChange={genderValue => setGender(genderValue)}
        />

        <Input
          placeholder={'+79999999999'}
          value={phone}
          isOptional
          onChange={event => {
            setPhone(event.nativeEvent.text);
          }}
          label={'Tелефон'}
          onFocus={onFocus(2, 'phone')}
          error={errors.phone}
          maskType="phone"
          maxLength={15}
          keyboardType="phone-pad"
        />
        <Email
          placeholder={'email@email.com'}
          value={email}
          onChange={event => {
            setEmail(event.nativeEvent.text);
          }}
          label={'E-mail'}
          onFocus={onFocus(3, 'email')}
          error={errors.email}
          keyboardType={isIOS ? 'default' : 'visible-password'}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={30}
        />
        <Input
          placeholder={'Задайте пароль'}
          value={password}
          isPassword
          onChange={event => {
            setPassword(event.nativeEvent.text);
          }}
          textContentType="oneTimeCode"
          label={'Задайте пароль (мин. 8 символов)'}
          onFocus={onFocus(4, 'password')}
          error={errors.password}
        />
        <Input
          placeholder={'Повторите пароль'}
          value={repeatPassword}
          isPassword
          textContentType="oneTimeCode"
          onChange={event => {
            setRepeatPassword(event.nativeEvent.text);
          }}
          label={'Повторите пароль (мин. 8 символов)'}
          onFocus={onFocus(5, 'repeatPassword')}
          error={errors.repeatPassword}
        />

        {!isDoctor && (
          <PolicyAgreement
            agreed={agreeWithPolicy}
            onChange={onChangeCheckbox}
            error={errors.agreeWithPolicy}
          />
        )}
      </AuthTemplate>
      <RegistrationSuccessMenu
        ref={successMenuRef}
        onPress={navigateToDrawer}
      />
    </>
  );
};

const Email = styled(Input)`
  text-transform: lowercase;
`;

const Btn = styled(Button)``;

const ButtonContainer = styled(View)`
  margin-top: 26px;
`;
