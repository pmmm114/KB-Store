import { QueryParamsType } from '@/api/client/http-client';

export interface ICardItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

export interface IGetTopBannerReq extends QueryParamsType {
  page: string;
}
export interface IGetTopBannerRes {
  list: Array<ICardItem>;
  nextCursor: string;
}

export interface IGetScrollListReq extends QueryParamsType {
  category: 'BEST' | 'RECOMMEND' | 'NEW';
  page: string;
}
export interface IGetScrollListRes {
  list: Array<ICardItem>;
  nextCursor: string;
}
