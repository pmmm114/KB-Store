export interface ICard {
  /** 고유 식별자 */
  id: number | string;
}

/**
 * Server Action
 */

/**
 * 타로 분석 함수 타입
 */
export type TAnalyzeTarot = (
  selectedIds: number[],
  question?: string,
) => Promise<void>;

/**
 * Server Action
 */
