export interface ICompleteButtonProps {
  /** 선택된 카드 ID 목록 */
  selectedIds: number[];
  /** 선택 완료 핸들러 */
  onComplete?: (selectedIds: number[]) => void;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
}
