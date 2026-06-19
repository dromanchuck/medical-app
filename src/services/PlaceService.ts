import qs from 'query-string';

import { ICitiesApi, ICountriesApi, ISelectItem } from 'types';

import { BaseService } from './BaseService';

class PlaceApiService extends BaseService {
  public async getCountries(country: string) {
    const body = { name__icontains: country };

    const { data } = await this.get<ICountriesApi[]>(
      `counties?${qs.stringify(body)}`,
    );

    const formatedData = data.map(
      (item: ICountriesApi): ISelectItem => ({
        id: item.id,
        value: item.name,
      }),
    );

    return formatedData;
  }

  public async getCities(country: string, city: string) {
    const body = { country_name: country, name__icontains: city };

    const { data } = await this.get<ICitiesApi[]>(
      `cities?${qs.stringify(body)}`,
    );

    const formatedData = data.map(
      (item: ICitiesApi): ISelectItem => ({
        id: item.id,
        value: item.name,
      }),
    );

    return formatedData;
  }
}

export const placeService = new PlaceApiService();
