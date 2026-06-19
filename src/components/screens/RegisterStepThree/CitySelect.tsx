import React, { useEffect, useState } from 'react';

import { Select } from 'molecules';
import { ISelectItem } from 'types';
import { placeService } from 'services';
import { debounce } from 'helpers';

interface IProps {
  selectedValue: string;
  error: string;
  regionId?: string;
  country: string;
  defaultCities?: ISelectItem[];
  onFocus: () => void;
  onChange: (item: ISelectItem | null) => void;
}

export const CitySelect = ({
  selectedValue,
  error,
  regionId,
  country,
  defaultCities,
  onFocus,
  onChange,
}: IProps) => {
  const isRussia = country === 'Россия';
  const [cities, setCities] = useState<ISelectItem[]>(defaultCities || []);

  useEffect(() => {
    if (defaultCities) {
      setCities(defaultCities);
    }
  }, [defaultCities]);

  const debouncedSearch = debounce((text: string) => {
    placeService.getCities(country, text).then((values: ISelectItem[]) => {
      requestAnimationFrame(() => setCities(values));
    });
  }, 1000);

  return (
    <Select
      items={cities}
      placeholder={'Ваш город'}
      label={'Город'}
      value={selectedValue}
      onFocus={onFocus}
      onChange={onChange}
      error={error}
      disabled={!country || (isRussia && !regionId)}
      fetchOnChangeText={isRussia ? undefined : debouncedSearch}
    />
  );
};
