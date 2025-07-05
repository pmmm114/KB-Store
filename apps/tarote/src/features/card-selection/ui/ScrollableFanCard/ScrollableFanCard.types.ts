import type { ICard } from '../../model/types';

export interface IScrollableFanCardProps {
  /** 렌더링할 카드 리스트 */
  cards: ICard[];
  /** 카드 뒷면 이미지 경로 (기본값: "/cards/CardBacks.png") */
  cardBackSrc?: string;
}
