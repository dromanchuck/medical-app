import React, { forwardRef } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

import { BottomMenu } from 'molecules';
import { Button } from 'atoms';

interface IProps {
  onPressLogin: () => void;
  onPressRegister: () => void;
}

export const SendEmailSuccessMenu = forwardRef(
  ({ onPressLogin, onPressRegister }: IProps, ref) => {
    return (
      <BottomMenu
        ref={ref}
        title="Письмо отправлено"
        description="На указанный Вами адрес будет отправлено письмо. Пожалуйста, проверьте Вашу почту и перейдите по указанной в письме ссылке.">
        <Description>
          Для восстановления пароля необходимо подтвердить адрес электронной
          почты и создать новый пароль.
        </Description>
        <Description>
          Если Вы не находите письмо в папке «Входящие», проверьте также папки
          «Спам» и «Промоакции».
        </Description>
        <LoginBtn onPress={onPressLogin}>Войти в аккаунт</LoginBtn>
        <RegisterButton onPress={onPressRegister} type="secondary">
          У меня нет аккаунта
        </RegisterButton>
      </BottomMenu>
    );
  },
);

const Description = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 23px;
  color: #262b37;
  margin-bottom: 12px;
`;

const LoginBtn = styled(Button)`
  margin-top: 44px;
  margin-bottom: 10px;
`;

const RegisterButton = styled(Button)``;
