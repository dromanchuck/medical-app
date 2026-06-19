import React, { useCallback } from 'react';

import { Toggle } from 'molecules';
import { TFeedbackSection } from 'types';

interface IProps {
  section: TFeedbackSection;
  onChange: (section: TFeedbackSection) => void;
}

export const SectionToggle = ({ section, onChange }: IProps) => {
  const handleOnChange = useCallback(index => {
    if (index === 0) {
      onChange('review');
    }

    if (index === 1) {
      onChange('usefulLinks');
    }
  }, []);

  return (
    <Toggle
      rightTitle="Полезные ссылки"
      leftTitle="Отзыв"
      activeIndex={section === 'review' ? 0 : 1}
      onChange={handleOnChange}
    />
  );
};
