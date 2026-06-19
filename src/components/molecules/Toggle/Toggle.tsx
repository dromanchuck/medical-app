import React, { useCallback } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import { SCREEN_WIDTH } from 'services';
import { Button } from 'atoms';

const BUTTON_WIDTH = (SCREEN_WIDTH - 24) / 2;

type TIndex = 0 | 1;

interface IProps {
  activeIndex: TIndex;
  leftTitle: string;
  rightTitle: string;
  onChange: (index: TIndex) => void;
}

export const Toggle = ({
  leftTitle,
  rightTitle,
  onChange,
  activeIndex,
}: IProps) => {
  const onLeftPress = useCallback(() => {
    onChange(0);
  }, [onChange]);

  const onRightPress = useCallback(() => {
    onChange(1);
  }, [onChange]);

  return (
    <Container>
      <LeftButton
        onPress={onLeftPress}
        type={activeIndex === 0 ? 'primary' : 'secondary'}>
        {leftTitle}
      </LeftButton>
      <RightButton
        onPress={onRightPress}
        type={activeIndex === 1 ? 'primary' : 'secondary'}>
        {rightTitle}
      </RightButton>
    </Container>
  );
};

const LeftButton = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: ${BUTTON_WIDTH}px;
`;

const RightButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: ${BUTTON_WIDTH}px;
`;

const Container = styled(View)`
  flex-direction: row;
`;
