import React, { FC, RefObject, useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from 'atoms';
import { FormInput, RegisterCircle, Select, AuthTemplate } from 'molecules';
import { REQUIRED_FIELD, validationService } from 'services';
import { EScreens, ISelectItem, TScreenProps } from 'types';

import { degreeList, specifiesList } from './data';

const renderHeader = () => <RegisterCircle step={2} />;

export const RegisterStepTwo: FC<TScreenProps<EScreens.RegisterStepTwo>> = ({
  navigation,
  route: { params },
}) => {
  const [study, setStudy] = useState('');
  const [position, setPosition] = useState('');
  const [degree, setDegree] = useState<ISelectItem | null>(null);
  const [speciality, setSpeciality] = useState<ISelectItem | null>(null);
  const insets = useSafeAreaInsets();
  const scrollRef: RefObject<any> = useRef(null);

  const [errors, setErrors] = useState({
    study: '',
    speciality: '',
  });

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onFocus = useCallback(
    (index: number) => {
      scrollRef.current.scrollToIndex(index);
    },
    [scrollRef],
  );

  const navigateNext = useCallback(() => {
    const currentErrors = {
      study: validationService.validateRequired(study),
      speciality: validationService.validateRequired(speciality?.value || ''),
    };

    setErrors(state => ({ ...state, ...currentErrors }));

    const isValid = Object.values(currentErrors).every(error => !error);

    if (isValid) {
      navigation.push(EScreens.RegisterStepThree, {
        study,
        speciality: speciality as ISelectItem,
        position,
        degree,
        ...params,
      });
    }
  }, [study, speciality, navigation, degree, params, position]);

  const resetError = (key: keyof typeof errors) => {
    if (errors[key]) {
      setErrors(errorsValues => ({ ...errorsValues, [key]: '' }));
    }
  };

  const hasRequiredFieldError = Boolean(
    Object.values(errors).find(item => item === REQUIRED_FIELD),
  );

  const renderButtons = useCallback(() => {
    return (
      <Container
        style={{
          paddingBottom: insets.bottom,
        }}>
        <NextContainer>
          <NextBtn onPress={navigateNext}>Далее</NextBtn>
        </NextContainer>
        <Button onPress={goBack} type="secondary">
          Вернуться назад
        </Button>
      </Container>
    );
  }, [insets, navigateNext, goBack]);

  return (
    <>
      <AuthTemplate
        renderHeader={renderHeader}
        ref={scrollRef}
        hasRequiredFieldError={hasRequiredFieldError}
        title="Регистрация"
        renderButtons={renderButtons}>
        <Select
          items={specifiesList}
          placeholder={'Ваша специальность'}
          value={speciality?.label || speciality?.value || ''}
          label={'Специальность'}
          onFocus={() => {
            resetError('speciality');
          }}
          onChange={item => setSpeciality(item)}
          error={errors.speciality}
        />

        <FormInput
          placeholder={'Место работы/учебы'}
          value={study}
          label={'Место работы/учебы'}
          onFocus={() => {
            resetError('study');
            onFocus(1);
          }}
          onChange={event => {
            setStudy(event.nativeEvent.text);
          }}
          error={errors.study}
        />
        <FormInput
          isOptional
          placeholder={'Название вашей должности'}
          value={position}
          label={'Должность'}
          onFocus={() => onFocus(2)}
          onChange={event => {
            setPosition(event.nativeEvent.text);
            onFocus(2);
          }}
          maxLength={60}
        />
        <Select
          placeholder={'Ваша ученая степень'}
          value={degree?.label as string}
          label={'Ученая степень'}
          items={degreeList}
          isOptional
          onChange={item => setDegree(item)}
        />
      </AuthTemplate>
    </>
  );
};

const NextBtn = styled(Button)``;

const NextContainer = styled(View)`
  margin-bottom: 10px;
  margin-top: 20px;
`;

const Container = styled(View)``;
