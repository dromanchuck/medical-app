import React, { FC, useCallback, useState } from 'react';

import { useScreenName, useTextInput } from 'hooks';
import { EScreens, TDrawerScreenProps } from 'types';
import { DrugTemplate } from 'molecules';
import { Bullet, Button, Input, TextSection } from 'atoms';
import { Keyboard, Text, View } from 'react-native';
import styled from 'styled-components';
import { useAnimatedRef } from 'react-native-reanimated';
import { bullets } from './bullets';

const getPercentOfDrug = (dose: number) => {
  if (dose >= 0 && dose <= 200) {
    return 0.8;
  }

  if (dose >= 201 && dose <= 399) {
    return 0.7;
  }

  if (dose >= 400) {
    return 0.6;
  }

  return 0;
};

const calculateMorningDose = (dose: number) => {
  return (dose / 20) * getPercentOfDrug(dose);
};

const calculateSupportDose = (dose: number, morningDose: number) => {
  if (morningDose > dose) {
    return 0;
  }

  return (0.9 * (dose - morningDose)) / 320;
};

const MORNING_DOSE_OFFSET = 100;
const SUPPORT_DOSE_OFFSET = 4 * MORNING_DOSE_OFFSET;

export const DrugCalculator: FC<
  TDrawerScreenProps<EScreens.DrugCalculator>
> = () => {
  useScreenName('Калькулятор доз');
  const [morningDose, setMorningDose] = useTextInput();
  const [supportDose, setSupporDose] = useTextInput();

  const [morningResult, setMorningResult] = useState(0);
  const [supportResult, setSupportResult] = useState(0);

  const ref: any = useAnimatedRef();

  const onFocus = useCallback(
    offset => () => {
      ref?.current?.scrollToOffset({ offset });
    },
    [ref],
  );

  const onPressMorningDose = useCallback(() => {
    requestAnimationFrame(() => {
      setMorningResult(calculateMorningDose(Number(morningDose)));
    });

    Keyboard.dismiss();
  }, [morningDose]);

  const onPressSupportDose = useCallback(() => {
    setSupportResult(
      calculateSupportDose(Number(supportDose), Number(morningDose)),
    );

    requestAnimationFrame(() => {
      Keyboard.dismiss();
    });
  }, [morningDose, supportDose]);

  const onPressReset = useCallback(() => {
    setSupportResult(0);
    setMorningResult(0);
  }, [setSupportResult, setMorningResult]);

  return (
    <DrugTemplate ref={ref}>
      <TextSection
        title="Расчет утренней дозы леводопы"
        text={
          morningResult === 0
            ? 'Поздние стадии леводопа-чувствительной болезни Паркинсона с выраженными двигательными флуктуациями и гипер-/дискинсзиями при недостаточной эффективности других противопаркинсонических препаратов.'
            : ''
        }
      />
      {morningResult === 0 ? (
        <Description>
          В период корректировки дозы следует внимательно наблюдать за
          состоянием пациента, особенно в отношении появления или ухудшения
          непроизвольных движений, дискинезий или тошноты.
        </Description>
      ) : null}
      <DoseLabel>
        Введите значение дозы пероральной леводопы для утреннего применения, мг
      </DoseLabel>
      <Input
        value={morningDose}
        onChange={setMorningDose}
        onFocus={onFocus(MORNING_DOSE_OFFSET)}
        keyboardType="number-pad"
        placeholder="Пример дозы: 140 мг"
      />
      <DoseBtn onPress={onPressMorningDose} type="thirdly">
        Рассчитать утренню дозу
      </DoseBtn>

      {morningResult ? (
        <>
          <MorningResult>
            Болюсная доза леводопы в виде интестинального геля Дуодопа®{' '}
            <Result>{morningResult.toFixed(1)} мл</Result>
          </MorningResult>
          <TextSection
            title="Внимание!"
            text="Необходимо добавить еще 2,5-3 мл геля для заполнения объема трубок"
            needTitleMargin={false}
            textStyle={{ marginBottom: 12 }}
          />
          <TextSection
            title="Примечание:"
            text="Процент от утренней дозы пероральной леводопы для расчета утренней болюсной дозы препарата Дуодопа® (ЛКИГ):"
            needTitleMargin={false}
            textStyle={{ marginBottom: 12 }}
          />
          <Bullets>
            {bullets.map(bullet => (
              <Bullet key={bullet.id} id={bullet.id} text={bullet.text} />
            ))}
          </Bullets>
          <TextSection title="Непрерывная поддерживающая доза" text={''} />
          <DoseLabel>
            Введите значение общей суточной дозы леводопы до начала лечения
            препаратом Дуодопа®, мг
          </DoseLabel>
          <Input
            value={supportDose}
            onChange={setSupporDose}
            onFocus={onFocus(SUPPORT_DOSE_OFFSET)}
            keyboardType="number-pad"
            placeholder="Пример дозы: 1640 мг/день"
          />
          <DoseBtn onPress={onPressSupportDose} type="thirdly">
            Расчитать поддерживающую доза
          </DoseBtn>
          {supportResult ? (
            <>
              <MorningResult>
                Поддерживающая доза для пациента составляет:{' '}
                <Result>
                  {supportResult.toFixed(1)}
                  мл/час
                </Result>
              </MorningResult>
              <TextSection
                needTitleMargin={false}
                title="Примечание:"
                text="Уровень индивидуальной непрерывной поддерживающей дозы препарата Дуодопа®, адекватной для каждого пациента, подбирается постепенно с пошаговым увеличением на 0,1 мл/час (2 мг/час). Расчет основан на суточной дозе леводопы до начала лечения препаратом Дуодопа®, из которой предварительно вычитается утренняя доза.
Поддерживающая доза чаще всего не выходит за пределы 1-10 мл/час (20-200 мг леводопы в час) и обычно составляет 2-6 мл/час (40-120 мг леводопы/час)."
              />
              <DoseBtn onPress={onPressReset} type="thirdly">
                Расчитать заново
              </DoseBtn>
            </>
          ) : null}
        </>
      ) : null}
    </DrugTemplate>
  );
};

const Description = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  color: #95989d;
  margin-top: -12px;
  margin-bottom: 24px;
`;

const DoseLabel = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  color: #95989d;
  margin-bottom: 8px;
`;

const DoseBtn = styled(Button)`
  margin-top: 24px;
`;

const MorningResult = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 24px;
  color: #95989d;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const Result = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #22b38c;
`;

const Bullets = styled(View)`
  padding-right: 50px;
  margin-bottom: 32px;
`;
