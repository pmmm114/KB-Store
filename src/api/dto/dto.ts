/**
 * NFT 카테고리
 */
export type TCategory = 'ALL' | 'ART' | 'GAME';

/**
 * NFT 카드 아이템
 */
export interface ICardItem {
  /**
   * 아이디
   */
  id: number;
  /**
   * 제목
   */
  title: string;
  /**
   * 설명
   */
  description: string;
  /**
   * 이미지 URL
   */
  imageUrl?: string;
  /**
   * 카테고리
   */
  category: Omit<TCategory, 'ALL'>;
  /**
   * 푸터
   */
  footer: string;
}

export interface IGetTopBannerReq {
  page: number;
}
export interface IGetTopBannerRes {
  list: Array<ICardItem>;
  nextCursor: string;
  hasNext: boolean;
}

export interface IGetScrollListReq {
  category: TCategory;
  page: number;
}
export interface IGetScrollListRes {
  list: Array<ICardItem>;
  nextCursor: string;
  hasNext: boolean;
}
