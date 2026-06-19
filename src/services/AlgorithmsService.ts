import { IAlgorithm, IApiHome } from 'types';

import { BaseService } from './BaseService';

class AlgorithmsService extends BaseService {
  public async getAlgorithms() {
    const { data } = await this.get<IAlgorithm[]>('');

    return data;
  }
}

export const algorithmsService = new AlgorithmsService();
