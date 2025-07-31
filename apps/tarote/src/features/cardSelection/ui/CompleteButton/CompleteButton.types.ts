import type { ButtonHTMLAttributes } from 'react';

export interface ICompleteButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 선택된 카드 ID 목록 */
  selectedIds: number[];
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
}
