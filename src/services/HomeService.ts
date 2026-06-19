import { IApiHome } from 'types';

import { BaseService } from './BaseService';

class HomeService extends BaseService {
  public async getHome() {
    const { data } = await this.get<IApiHome>('home?source=mob');

    return data;
  }
}

export const homeService = new HomeService();
