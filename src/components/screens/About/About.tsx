import { useScreenName } from 'hooks';
import React, { FC, useCallback } from 'react';
import { Text, View, Image as FastImage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import { EScreens, TDrawerScreenProps } from 'types';
import { openURL, sendEmail } from 'helpers';

export const About: FC<TDrawerScreenProps<EScreens.About>> = () => {
  useScreenName('О приложении');
  const insets = useSafeAreaInsets();

  const onPressSponsorUrl = useCallback(() => {
    openURL('https://skopinpharm.com/');
  }, []);

  const sendMail = useCallback(() => {
    sendEmail('info@medical-app.ru');
  }, []);

  return (
    <ScrollWrapper contentContainerStyle={{ paddingBottom: insets.bottom }}>
      <MainTitle>О Приложении</MainTitle>
      <Description>
        Мобильное приложение «Medical App» содержит справочную и научную
        информацию о болезни Паркинсона, развернутых стадиях болезни Паркинсона,
        возможностях терапии таких пациентов для специалистов здравоохранения,
        пациентов их родных, и лиц, оказывающих помощь и уход за такими
        пациентами, для которых Приложением предусмотрен отдельный раздел.
      </Description>

      <Section>Отказ от ответственности:</Section>
      <Description>
        Внимание! Содержание раздела «Я врач» предназначено исключительно для
        действующих специалистов здравоохранения, основано на действующих
        клинических рекомендациях Минздрава России и научных сообществ и носит
        информационно-справочный характер. Все решения, в том числе связанные с
        терапией, диагностикой и профилактикой болезни Паркинсона и
        сопутствующих заболеваний, являются ответственностью конкретного
        специалиста здравоохранения, принявшего такое решение. Пациенты и их
        родственники или лица, осуществляющие заботу о таких пациентах, должны
        регистрироваться в приложении в разделе «Я пациент» и не должны
        использовать раздел «Я врач», тем более применять на практике какую-либо
        информацию из раздела «Я врач». Самолечение опасно и может нанести
        непоправимый вред Вашему здоровью! Научное содержание данного мобильного
        приложения разработано и адаптировано ведущими российскими экспертами и
        специалистами в области терапии и ведения пациентов с болезнью
        Паркинсона, предназначено исключительно для действующих специалистов
        здравоохранения, основано на клинических рекомендациях Минздрава России
        и научных сообществ и носит информационно-справочный характер. Материалы
        подготовлены и адаптированы под научным руководством{' '}
        <BoldDescription>
          д.м.н., профессора Катуниной Елены Анатольевны
        </BoldDescription>{' '}
        – профессора кафедры неврологии, нейрохирургии и медицинской генетики
        лечебного факультета РНИМУ им.Н.И.Пирогова, Руководителя отдела
        нейродегенеративных заболеваний ФГБУ «Федеральный Центр мозга и
        нейротехнологий», врача высшей категории.
      </Description>

      <Section>
        Мобильное приложение «Medical App» создано при поддержке:
      </Section>
      <ImageWrapper>
        <Image source={require('./sponsor.png')} />
      </ImageWrapper>
      <ImageText>
        СкопинФарм –{' '}
        <ImageUrl onPress={onPressSponsorUrl}>skopinpharm.com</ImageUrl>
      </ImageText>
      <Section>Техническая разработка проекта:</Section>
      <Description>
        Научно-образовательная платформа medical-app.ru АНО ЦСРЗ «Медицинский
        партнер»{`\n+7 985 143 77 51`}{' '}
        <GreenDescription
          suppressHighlighting={true}
          onPress={sendMail}>{`\ninfo@medical-app.ru`}</GreenDescription>
      </Description>
    </ScrollWrapper>
  );
};

const MainTitle = styled(Text)`
  font-family: Raleway;
  font-weight: 800;
  font-size: 24px;
  line-height: 36px;
  color: #262b37;
  padding-top: 32px;
`;

const ScrollWrapper = styled(ScrollView)`
  padding-left: 20px;
  padding-right: 20px;
`;

const Description = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #262b37;
  padding-top: 12px;
`;

const BoldDescription = styled(Description)`
  font-weight: 700;
`;

const GreenDescription = styled(Description)`
  color: #22b38c;
`;

const Section = styled(MainTitle)`
  font-size: 18px;
  line-height: 28px;
`;

const Image = styled(FastImage)`
  width: 253px;
  height: 127px;
`;

const ImageWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  padding-top: 31px;
  padding-bottom: 31px;
  padding-left: 41px;
  padding-right: 41px;
  border: 1px solid #dbe3f1;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const ImageText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #262b37;
`;

const ImageUrl = styled(ImageText)`
  color: #22b38c;
`;
