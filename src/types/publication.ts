export interface IPublicationCategory {
  id: number;
  title: string;
  short_title: string;
  alias: string;
  area_title: string;
  big_icon_url: string;
  small_icon_url: string;
}

export interface IPublicationsRequest {
  category: number[];
  offset?: number;
}

export interface IApiPublicationsRequest {
  limit?: number;
  offset?: number;
  category__in?: number[];
  source?: 'mob';
}

export interface IApiAuthor {
  id: number;
  position: string;
  full_name: string;
  photo_url: string;
  description: string;
}

export interface IPublication {
  id: number;
  title: string;
  publish_date: string;
  thumbnail_url: string;
  total_viewing: number;
  short_title: string;
  area: {
    alias: string;
    title: string;
    short_title: string;
  };
  authors: IApiAuthor[];
  category: IPublicationCategory;
}

export interface IApiPublications {
  results: IPublication[];
  total: number;
}

export interface IFullPublication {
  id: number;
  title: string;
  publish_date: string;
  thumbnail_url: string;
  short_description: string;
  description: string;
  quote_text: string;
  quote_author_position: string;
  quote_author_full_name: string;
  source_name: string;
  source_url: string;
  pdf_url: string;
  total_viewing: number;
  area: {
    alias: string;
    title: string;
    short_title: string;
  };
  authors: IApiAuthor[];
  category: IPublicationCategory;
  recommended_articles: IPublication[];
  short_title: string;
}
