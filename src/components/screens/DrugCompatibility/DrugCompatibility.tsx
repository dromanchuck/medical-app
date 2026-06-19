import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

import { useScreenName } from 'hooks';
import { EScreens, TDrawerScreenProps } from 'types';
import { DrugTemplate } from 'molecules';
import { Button, TextSection } from 'atoms';
import { Accordion } from 'organisms';

import { Bullets } from './Bullets';
import { data } from './data';

export const DrugCompatibility: FC<
  TDrawerScreenProps<EScreens.DrugCalculator>
> = ({ navigation }) => {
  useScreenName('Совместимость препарата');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, [setIsMounted]);

  const navigateToSideEffeects = useCallback(() => {
    navigation.navigate(EScreens.DrugSideEffects);
  }, [navigation]);

  return (
    <DrugTemplate>
      <TextSection
        text="Поздние стадии леводопа-чувствительной болезни Паркинсона с выраженными двигательными флуктуациями и гипер-/дискинезиями при недостаточной эффективности других противопаркинсонических препаратов"
        title="Показания к применению: "
      />
      <AccordionTitle>Взаимодействие с препаратом (МНН)</AccordionTitle>
      {isMounted &&
        data.map(accordion => (
          <Accordion
            key={accordion.id}
            title={accordion.title}
            headerStyle={{ marginTop: 24 }}>
            <Bullets items={accordion.bullets} />
          </Accordion>
        ))}
      <Btn onPress={navigateToSideEffeects} type="thirdly">
        Сообщить о побочных явлениях
      </Btn>
    </DrugTemplate>
  );
};

const AccordionTitle = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 20px;
  color: #262b37;
  margin-top: 8px;
`;

const Btn = styled(Button)`
  margin-top: 24px;
`;
