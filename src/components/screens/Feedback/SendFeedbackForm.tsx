import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Alert, Keyboard, Text } from 'react-native';

import { Button, ErrorMessage, Input } from 'atoms';
import { validationService, feedbackService } from 'services';

interface IProps {
  feedback: string;
  setFeedback: (feedback: string) => void;
  onSuccess: () => void;
}

export const SendFeedbackForm = ({
  feedback,
  setFeedback,
  onSuccess,
}: IProps) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onPressSend = useCallback(() => {
    Keyboard.dismiss();

    const errorValue = validationService.validateRequired(feedback.trim());
    setError(errorValue);

    if (!errorValue) {
      setIsLoading(true);

      feedbackService
        .sendFeedback(feedback)
        .then(() => {
          setFeedback('');
          onSuccess();
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          Alert.alert(
            'Ошибка',
            'Сообщение не было отправлено, попробуйте еще раз',
          );
        });
    }
  }, [feedback, onSuccess, setFeedback]);

  const onFocus = useCallback(() => {
    setError('');
  }, [setError]);

  return (
    <>
      <FormTitle>Оставьте Ваше сообщение</FormTitle>
      <FormInput
        value={feedback}
        onChange={event => setFeedback(event.nativeEvent.text)}
        multiline
        placeholder="Напишите свое сообщение здесь"
        error={error}
        onFocus={onFocus}
      />
      {error ? (
        <ErrorMessage>Пожалуйста, заполните Ваше сообщение</ErrorMessage>
      ) : null}
      <Btn
        onPress={onPressSend}
        isLoading={isLoading}
        type={error ? 'disabled' : 'primary'}>
        Отправить сообщение
      </Btn>
    </>
  );
};

const FormInput = styled(Input)`
  height: 192px;
  margin-bottom: 12px;
  text-align-vertical: top;
`;

const FormTitle = styled(Text)`
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.154px;
  color: #262b37;
  margin-top: 26px;
  margin-bottom: 23px;
`;

const Btn = styled(Button)``;
