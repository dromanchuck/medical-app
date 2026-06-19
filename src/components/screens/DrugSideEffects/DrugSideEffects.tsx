import React, { FC, Ref, useCallback, useRef, useState } from 'react';
import { Alert, Keyboard, Text } from 'react-native';
import styled from 'styled-components';

import { useScreenName, useTextInput } from 'hooks';
import { EScreens, TDrawerScreenProps } from 'types';
import { DrugTemplate } from 'molecules';
import { Input, TextSection, Button, ErrorMessage } from 'atoms';
import { feedbackService, validationService } from 'services';
import { SendMessageSuccessMenu } from 'organisms';
import BottomSheet from '@gorhom/bottom-sheet';

export const DrugSideEffects: FC<
  TDrawerScreenProps<EScreens.DrugCalculator>
> = ({}) => {
  useScreenName('Побочные явления');
  const [title, onChangeTitle, clearTitle] = useTextInput();
  const [message, onChangeMessage, clearMessage] = useTextInput();
  const [error, setError] = useState({ title: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const ref: Ref<typeof BottomSheet> = useRef(null);

  const onPressSend = useCallback(() => {
    Keyboard.dismiss();

    const error = {
      title: validationService.validateRequired(title.trim()),
      message: validationService.validateRequired(title.trim()),
    };

    setError(error);
    const isValid = Object.values(error).every(item => item === '');

    if (isValid) {
      setIsLoading(true);

      feedbackService
        .sendFeedback(message, title)
        .then(() => {
          ref?.current?.show();
          setIsLoading(false);
          clearTitle();
          clearMessage();
        })
        .catch(() => {
          setIsLoading(false);

          Alert.alert(
            'Ошибка',
            'Сообщение не было отправлено, попробуйте еще раз',
          );
        });
    }
  }, [title, message]);

  const onFocus = useCallback(
    (key: keyof typeof error) => () => {
      setError(error => ({ ...error, [key]: '' }));
    },
    [setError],
  );

  const hasErrors = Object.values(error).some(item => item);

  return (
    <>
      <DrugTemplate>
        <TextSection
          title="Сообщить о нежелательных побочных явлениях"
          text="Если вы столкнулись с нежелательными побочными явлениями у препарата данного производителя, опишите их ниже"
        />
        <Label>Нежелательное явление</Label>
        <Theme
          value={title}
          onChange={onChangeTitle}
          placeholder="Напишите тему вашего сообщения"
          error={error.title}
          onFocus={onFocus('title')}
        />
        <Label>Описание</Label>
        <Message
          value={message}
          onChange={onChangeMessage}
          placeholder="Напишите свое сообщения здесь"
          multiline
          error={error.message}
          onFocus={onFocus('message')}
        />
        {hasErrors ? (
          <ErrorMessage>Пожалуйста, заполните Ваше сообщение</ErrorMessage>
        ) : null}

        <Btn type="thirdly" onPress={onPressSend} isLoading={isLoading}>
          Отправить сообщение
        </Btn>
      </DrugTemplate>
      <SendMessageSuccessMenu ref={ref} />
    </>
  );
};

const Label = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.154px;
  color: #262b37;
  margin-bottom: 8px;
`;

const Theme = styled(Input)`
  margin-bottom: 20px;
`;

const Message = styled(Input)`
  height: 192px;
  text-align-vertical: top;
  margin-bottom: 24px;
`;

const Btn = styled(Button)`
  margin-top: 8px;
`;
