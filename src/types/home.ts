import { IBanner } from './banner';

export interface IApiPartner {
  id: number;
  partner_url: string;
  thumbnail_url: string;
}

export interface IApiPopularArea {
  title: string;
  alias: string;
  short_title: string;
}

export interface IApiHome {
  title: string;
  description: string;
  popular_areas: IApiPopularArea[];
  background_url: string;
  partners: IApiPartner[];
  banners: IBanner[];
  originals_title: string;
  originals_description: string;
  originals_video_url: string;
}
