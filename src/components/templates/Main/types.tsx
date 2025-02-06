import * as ServiceTypes from '@/api/service/types';

/**
 * NFT 카드
 */
type TNftCard = Extract<
  ServiceTypes.ExtractArrayType<ServiceTypes.TGetTopBannerResponse['list']>,
  ServiceTypes.ExtractArrayType<ServiceTypes.TGetScrollListResponse['list']>
>;

type TCategory = ServiceTypes.TGetScrollListParams['category'];

/**
 * 추천 NFT 섹션
 */
interface IRecommandSection {
  /**
   * 데이터 페칭 로딩 여부
   */
  isLoading: boolean;
  /**
   * 아이템
   */
  items: Array<TNftCard>;
  /**
   * 로딩 상태일 때 보여줄 아이템 수
   */
  skeletonItemCount?: number;
}

/**
 * 탭 아이템
 */
export interface ITabItem {
  /**
   * 키
   */
  key: TCategory;
  /**
   * 레이블
   */
  label: string;
}
/**
 * NFT 카테고리 섹션
 */
export interface INftTabSection {
  /**
   * 데이터 페칭 로딩 여부
   */
  isLoading: boolean;

  /**
   * 리스트 아이템
   */
  listItems: Array<Array<TNftCard>>;
  /**
   * 탭 아이템
   */
  tabItems: Array<ITabItem>;
  /**
   * 로딩 상태일 때 보여줄 아이템 수
   */
  skeletonItemCount?: number;
}

/**
 * 메인 템플릿 Props
 */
export interface IMainTemplateProps {
  /**
   * 추천 NFT 아이템
   */
  recommandSection: IRecommandSection;
  /**
   * NFT 카테고리 내부에 들어갈 아이템
   */
  nftTabSection: INftTabSection;
}
