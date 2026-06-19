import React from 'react';
import { useQuery } from 'react-query';

import { homeService } from 'services';

import { Banners } from './Banners';

export const BannersContainer = () => {
  const { data } = useQuery('banners', homeService.getHome.bind(homeService));

  return <Banners items={data?.banners || []} />;
};
