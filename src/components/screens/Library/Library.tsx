import { useScreenName } from 'hooks';
import React, { FC } from 'react';

import { EScreens, TDrawerScreenProps } from 'types';
import { CategoryList } from 'organisms';

export const Library: FC<TDrawerScreenProps<EScreens.Library>> = ({
  navigation,
}) => {
  useScreenName('Библиотека');

  return (
    <>
      <CategoryList navigation={navigation} />
    </>
  );
};
