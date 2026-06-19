import React, { createContext, ReactNode } from 'react';
import { useQuery } from 'react-query';

import { publicationService } from 'services';
import { IPublicationCategory } from 'types';

export const CategoriesContext = createContext<{
  categories: IPublicationCategory[];
}>({ categories: [] });

interface IProps {
  isDoctor: boolean;
  children: ReactNode;
}

const getCategoriesPromise = (isDoctor: boolean) => {
  return publicationService.getCategories(isDoctor ? 'doc' : 'pat');
};

export const CategoriesProvider = ({ isDoctor, children }: IProps) => {
  const { data } = useQuery('categories', () => getCategoriesPromise(isDoctor));

  return (
    <CategoriesContext.Provider value={{ categories: data || [] }}>
      {children}
    </CategoriesContext.Provider>
  );
};
