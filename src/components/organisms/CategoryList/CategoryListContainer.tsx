import React, { ReactNode, useContext } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { EScreens, TDrawerParamList } from 'types';
import { CategoriesContext } from 'context';

import { CategoryList } from './CategoryList';

interface IProps {
  navigation:
    | DrawerNavigationProp<TDrawerParamList, EScreens.Library>
    | DrawerNavigationProp<TDrawerParamList, EScreens.PatientMain>;
  renderHeader?: ReactNode;
  renderFooter?: ReactNode;
}

export const CategoryListContainer = ({
  navigation,
  renderHeader,
  renderFooter,
}: IProps) => {
  const { categories } = useContext(CategoriesContext);

  return (
    <CategoryList
      categories={categories}
      navigation={navigation}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
    />
  );
};
