import { useScreenName } from 'hooks';
import React, { FC } from 'react';

import { EScreens, TDrawerScreenProps } from 'types';
import { AlgorithmsList } from './AlgorithmsList';

export const Algorithms: FC<TDrawerScreenProps<EScreens.Algorithms>> = ({
  navigation,
}) => {
  useScreenName('Алгоритмы');

  return (
    <>
      <AlgorithmsList navigation={navigation} />
    </>
  );
};
