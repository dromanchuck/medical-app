import React from 'react';

import * as icons from './icons';

export type TIcon = keyof typeof icons;

interface IProps {
  name: TIcon;
}

export const Icon = ({ name }: IProps) => {
  const IconComponent = icons[name];

  return <IconComponent />;
};
