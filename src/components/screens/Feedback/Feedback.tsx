import { useScreenName } from 'hooks';
import React, { FC, Ref, useCallback, useRef, useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import BottomSheet from '@gorhom/bottom-sheet';

import { EScreens, TDrawerScreenProps, TFeedbackSection } from 'types';
import { FollowKeyboardScrollView } from 'atoms';
import { SendMessageSuccessMenu } from 'organisms';

import { SectionToggle } from './SectionToggle';
import { SendFeedbackForm } from './SendFeedbackForm';
import { UsefulLinks } from './UsefulLinks';

export const Feedback: FC<TDrawerScreenProps<EScreens.Feedback>> = ({
  route,
}) => {
  useScreenName(
    route?.params?.screenName ? route?.params?.screenName : 'Обратная связь',
  );

  const ref: Ref<typeof BottomSheet> = useRef(null);
  const [section, setSection] = useState<TFeedbackSection>('review');
  const [feedback, setFeedback] = useState('');

  const onChangeSection = useCallback(
    sectionValue => {
      setSection(sectionValue);
    },
    [setSection],
  );

  const onSuccess = useCallback(() => {
    ref?.current?.show();
  }, [ref]);

  return (
    <>
      <FollowKeyboardScrollView isTopInsetEnabled={false}>
        <>
          <Title>Напишите нам!</Title>
          <Description>
            {
              'Ответ может занять некоторое время. \nОн будет отправлен на вашу почту.'
            }
          </Description>
          <SectionToggle section={section} onChange={onChangeSection} />
          {section === 'usefulLinks' ? (
            <UsefulLinks />
          ) : (
            <SendFeedbackForm
              onSuccess={onSuccess}
              feedback={feedback}
              setFeedback={setFeedback}
            />
          )}
        </>
      </FollowKeyboardScrollView>
      <SendMessageSuccessMenu ref={ref} />
    </>
  );
};

const Title = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 36px;
  color: #262b37;
  padding-top: 32px;
`;

const Description = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  color: #95989d;
  padding-top: 12px;
  padding-bottom: 24px;
`;
