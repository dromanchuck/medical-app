import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import { useScreenName } from 'hooks';
import { EScreens, TDrawerScreenProps } from 'types';
import { DrugTemplate } from 'molecules';
import { TextSection } from 'atoms';

import { data } from './data';
import { NavButton } from './NavButton';

const [firstPart, secondPart] = data;

export const Drug: FC<TDrawerScreenProps<EScreens.Drug>> = ({ navigation }) => {
  useScreenName('Лекарственное средство');

  const navigateToCalculator = useCallback(() => {
    navigation.navigate(EScreens.DrugCalculator);
  }, [navigation]);

  const navigateToCompatibility = useCallback(() => {
    navigation.navigate(EScreens.DrugCompatibility);
  }, [navigation]);

  const navigateToSideEffect = useCallback(() => {
    navigation.navigate(EScreens.DrugSideEffects);
  }, [navigation]);

  return (
    <DrugTemplate imageUrl={require('./duodopaLogo.png')}>
      {firstPart.map(item => {
        return <TextSection key={item.id} {...item} />;
      })}
      <Buttons>
        <NavButton
          name="Калькулятор дозировок"
          icon="drugsCalc"
          onPress={navigateToCalculator}
        />
        <NavButton
          name="Совместимость препарата"
          icon="compatibility"
          onPress={navigateToCompatibility}
        />
        <NavButton
          name="Сообщить побочном явлении"
          icon="sideEffects"
          onPress={navigateToSideEffect}
        />
      </Buttons>
      {secondPart.map(item => {
        return <TextSection key={item.id} {...item} />;
      })}
    </DrugTemplate>
  );
};

const Buttons = styled(View)`
  margin-bottom: 32px;
`;
