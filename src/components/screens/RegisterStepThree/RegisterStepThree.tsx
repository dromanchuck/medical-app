import React, { FC, RefObject, useCallback, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import styled from 'styled-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { Button } from 'atoms';
import { EScreens, ISelectItem, TScreenProps } from 'types';
import { Checkbox, RegisterCircle, Select, AuthTemplate } from 'molecules';
import { REQUIRED_FIELD, validationService } from 'services';
import { PolicyAgreement, RegistrationSuccessMenu } from 'organisms';
import { ERRORS, registerDoctorRequest } from 'core';

import {
  useOnRequestError,
  useOnRequestSuccess,
  useOnInternalError,
} from 'hooks';

import { CountrySelect } from './CountrySelect';
import { countriesList } from './data';
import { CitySelect } from './CitySelect';

const renderHeader = () => <RegisterCircle step={3} />;

export const RegisterStepThree: FC<
  TScreenProps<EScreens.RegisterStepThree>
> = ({ navigation, route: { params } }) => {
  const [country, setCountry] = useState<ISelectItem | null>(null);

  const [region, setRegion] = useState<
    (ISelectItem & { cities: ISelectItem[] }) | null
  >(null);

  const [city, setCity] = useState<ISelectItem | null>(null);
  const [mdConfirmation, setMDConfirmation] = useState(false);
  const [agreeWithMaterial, setAgreeWithMaterial] = useState(false);
  const [agreeWithPolicy, setAgreeWithPolicy] = useState(false);

  const insets = useSafeAreaInsets();
  const scrollRef: RefObject<any> = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const successMenuRef = useRef(null);
  const { goBack } = navigation;

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    country: '',
    region: '',
    city: '',
    mdConfirmation: '',
    agreeWithMaterial: '',
    agreeWithPolicy: '',
  });

  const navigateNext = useCallback(() => {
    const errorsValues = {
      country: validationService.validateRequired(country?.value || ''),
      region:
        country?.value === 'Россия'
          ? validationService.validateRequired(region?.value || '')
          : '',
      city: validationService.validateRequired(city?.value || ''),
      mdConfirmation: mdConfirmation ? '' : REQUIRED_FIELD,
      agreeWithMaterial: agreeWithMaterial ? '' : REQUIRED_FIELD,
      agreeWithPolicy: agreeWithPolicy ? '' : REQUIRED_FIELD,
    };

    setErrors(state => ({ ...state, ...errorsValues }));
    const isValid = Object.values(errorsValues).every(error => !error);

    if (isValid) {
      setIsLoading(true);
      dispatch(
        registerDoctorRequest({
          country: country as ISelectItem,
          city: city as ISelectItem,
          region,
          ...params,
        }),
      );
    }
  }, [
    country,
    region,
    city,
    params,
    mdConfirmation,
    agreeWithMaterial,
    agreeWithPolicy,
    setErrors,
    dispatch,
  ]);

  useOnRequestSuccess(registerDoctorRequest, () => {
    setIsLoading(false);
    successMenuRef?.current?.show();
  });

  useOnRequestError(registerDoctorRequest, (error: string) => {
    if (ERRORS[error]) {
      Alert.alert('Ошибка', ERRORS[error]);
    }

    setIsLoading(false);
  });

  const resetError = (key: keyof typeof errors) => {
    if (errors[key]) {
      setErrors(errorsValues => ({ ...errorsValues, [key]: '' }));
    }
  };

  const onFocusSelect = (errorKey: keyof typeof errors) => {
    resetError(errorKey);
  };

  const regionDisabled =
    !country || (country.id !== '1' && country.id !== 'RU');

  const hasRequiredFieldError = Boolean(
    Object.values(errors).find(item => item === REQUIRED_FIELD),
  );

  const onPressEnterApp = useCallback(() => {
    navigation.push(EScreens.Drawer, { isDoctor: true });
  }, [navigation]);

  useOnInternalError(() => {
    Alert.alert(
      'Ошибка',
      'Не удалось зарегистрировать пользователя, повторите регистрацию позже',
    );

    setIsLoading(false);
    navigation.push(EScreens.Welcome);
  });

  const renderButtons = useCallback(() => {
    return (
      <Container
        style={{
          paddingBottom: insets.bottom,
        }}>
        <NextBtn isLoading={isLoading} onPress={navigateNext}>
          Далее
        </NextBtn>
        <Button onPress={goBack} type="secondary">
          Вернуться назад
        </Button>
      </Container>
    );
  }, [isLoading, goBack, navigateNext, insets]);

  return (
    <>
      <AuthTemplate
        renderHeader={renderHeader}
        ref={scrollRef}
        hasRequiredFieldError={hasRequiredFieldError}
        renderButtons={renderButtons}
        title="Регистрация">
        <CountrySelect
          selectedValue={country?.value || ''}
          onChange={item => {
            setRegion(null);
            setCity(null);
            setCountry(item);
          }}
          error={errors.country}
          onFocus={() => {
            onFocusSelect('country');
          }}
        />
        <Select
          placeholder={'Ваш регион'}
          value={region?.value || ''}
          label={'Регион'}
          items={countriesList[0].regions}
          onChange={item => setRegion(item)}
          disabled={regionDisabled}
          error={!regionDisabled ? errors.region : ''}
          onFocus={() => {
            onFocusSelect('region');
          }}
        />
        <CitySelect
          selectedValue={city?.value || ''}
          onChange={item => {
            setCity(item);
          }}
          error={errors.city}
          country={country?.value || ''}
          regionId={region?.id}
          defaultCities={region?.cities || []}
          onFocus={() => {
            onFocusSelect('city');
          }}
        />
        <CheckboxComponent
          checked={mdConfirmation}
          onChange={setMDConfirmation}
          error={errors.mdConfirmation}>
          Настоящим я подтверждаю, что являюсь действующим специалистом
          здравоохранения
        </CheckboxComponent>
        <CheckboxComponent
          checked={agreeWithMaterial}
          onChange={setAgreeWithMaterial}
          error={errors.agreeWithMaterial}>
          Продолжая регистрацию, Вы осознаете, что приложение содержит
          материалы, предназначенные для специалистов здравоохранения, которые
          носят информационно-справочный характер, и принимаете на себя всю
          ответственность за использование их в клинической практике, равно как
          и за выбор терапии в конкретном клиническом случае
        </CheckboxComponent>
        <PolicyAgreement
          agreed={agreeWithPolicy}
          onChange={setAgreeWithPolicy}
          error={errors.agreeWithPolicy}
        />
      </AuthTemplate>
      <RegistrationSuccessMenu ref={successMenuRef} onPress={onPressEnterApp} />
    </>
  );
};

const NextBtn = styled(Button)`
  margin-bottom: 10px;
  margin-top: 20px;
`;

const Container = styled(View)``;

const CheckboxComponent = styled(Checkbox)`
  margin-bottom: 12px;
`;
