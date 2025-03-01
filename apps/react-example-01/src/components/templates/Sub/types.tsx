import type { TExtendsVirtualScrollerComponentProps } from '@/components/molecules/VirtualScroller/types';
import * as ServiceTypes from '@/api/service/types';

/**
 * NFT 카드
 */
export type TNftCard = Extract<
  ServiceTypes.ExtractArrayType<ServiceTypes.TGetTopBannerResponse['list']>,
  ServiceTypes.ExtractArrayType<ServiceTypes.TGetScrollListResponse['list']>
>;

interface IRecommandSection
  extends Pick<TExtendsVirtualScrollerComponentProps, 'infiniteScrollStatus'> {
  /**
   * 아이템
   */
  items: Array<TNftCard | null>;
}

/**
 * 메인 템플릿 Props
 */
export interface ISubTemplateProps {
  /**
   * 추천 NFT 아이템
   */
  recommandSection: IRecommandSection;
}
