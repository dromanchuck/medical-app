import React, { useState } from 'react';

import { Select } from 'molecules';
import { ISelectItem } from 'types';
import { placeService } from 'services';
import { debounce } from 'helpers';

interface IProps {
  selectedValue: string;
  error: string;
  onFocus: () => void;
  onChange: (item: ISelectItem | null) => void;
}

export const CountrySelect = ({
  selectedValue,
  error,
  onChange,
  onFocus,
}: IProps) => {
  const [countries, setCountries] = useState<ISelectItem[]>([]);

  const debouncedSearch = debounce((text: string) => {
    placeService
      .getCountries(text)
      .then((values: ISelectItem[]) => {
        requestAnimationFrame(() => setCountries(values));
      })
      .catch(() => {});
  }, 1000);

  return (
    <Select
      items={countries}
      placeholder={'Ваша страна'}
      label={'Страна'}
      value={selectedValue}
      onFocus={onFocus}
      onChange={onChange}
      error={error}
      fetchOnChangeText={debouncedSearch}
    />
  );
};
