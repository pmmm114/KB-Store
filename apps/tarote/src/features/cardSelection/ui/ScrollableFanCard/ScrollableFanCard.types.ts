import type { ICard } from '../../model/types';

export interface IScrollableFanCardProps {
  /** 렌더링할 카드 리스트 */
  cards: ICard[];
  /** 카드 뒷면 이미지 경로 (기본값: "/cards/CardBacks.png") */
  cardBackSrc?: string;
  /** 선택된 카드 ID 목록 */
  selectedIds?: number[];
  /** 카드 선택 변경 콜백 */
  onSelectionChange?: (selectedIds: number[]) => void;
}
