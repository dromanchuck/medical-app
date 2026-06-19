import React, { useCallback } from 'react';

import { Label } from 'atoms';
import { Toggle } from 'molecules';
import { TGender } from 'types';

interface IProps {
  gender: TGender;
  onChange: (gender: TGender) => void;
}

export const GenderSelection = ({ onChange, gender }: IProps) => {
  const activeIndex = gender === 'man' ? 0 : 1;

  const handleOnChange = useCallback(
    (index: number) => {
      if (index === 0) {
        onChange('man');
      }

      if (index === 1) {
        onChange('woman');
      }
    },
    [onChange],
  );

  return (
    <Label text="Пол">
      <Toggle
        activeIndex={activeIndex}
        onChange={handleOnChange}
        leftTitle="Мужчина"
        rightTitle="Женщина"
      />
    </Label>
  );
};
