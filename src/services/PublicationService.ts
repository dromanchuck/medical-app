import qs from 'query-string';

import {
  IPublicationCategory,
  IPublicationsRequest,
  IApiPublicationsRequest,
  IApiPublications,
  IFullPublication,
  TRole,
} from 'types';

import { BaseService } from './BaseService';

class PublicationService extends BaseService {
  public async getCategories(role: TRole) {
    const body = {
      source: 'mob',
      role,
    };

    const { data } = await this.get<IPublicationCategory[]>(
      `article-categories?${qs.stringify(body)}`,
    );

    return data;
  }

  public async getPublications({ category, offset = 1 }: IPublicationsRequest) {
    const body: IApiPublicationsRequest = {
      category__in: category,
      source: 'mob',
      limit: 3,
      offset,
    };

    const {
      data: { results, total },
    } = await this.get<IApiPublications>(
      `articles?${qs.stringify({ ...body })}`,
    );

    return { articles: results, total };
  }

  public async getPublication(id: string) {
    const { data } = await this.get<IFullPublication>(
      `articles/${id}?source=mob`,
    );

    return data;
  }
}

export const publicationService = new PublicationService();
