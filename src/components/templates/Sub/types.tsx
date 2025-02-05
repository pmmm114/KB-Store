/**
 * 추천 NFT 아이템
 */
interface IRecommendedNft {
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
   * 푸터
   */
  footer: string;
}

interface IRecommandSection {
  /**
   * 아이템
   */
  items: Array<IRecommendedNft>;
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
