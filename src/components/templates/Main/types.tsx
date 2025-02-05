/**
 * NFT 카테고리
 */
type TCategory = 'ALL' | 'ART' | 'GAME';

/**
 * NFT 카드
 */
interface INftCard {
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
  category: Exclude<TCategory, 'ALL'>;
  /**
   * 푸터
   */
  footer: string;
}

/**
 * 추천 NFT 섹션
 */
interface IRecommandSection {
  /**
   * 아이템
   */
  items: Array<INftCard>;
}

/**
 * NFT 카테고리 섹션
 */
interface INftTabSection {
  /**
   * 리스트 아이템
   */
  listItems: Array<Array<INftCard>>;
  /**
   * 탭 아이템
   */
  tabItems: Array<{ [key in TCategory]?: string }>;
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
