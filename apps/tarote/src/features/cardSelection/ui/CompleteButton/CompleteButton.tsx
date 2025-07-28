'use client';

import { CARD_SELECT_LIMIT } from '../../model/const';

import styles from './CompleteButton.module.css';
import * as T from './CompleteButton.types';

export const CompleteButton = ({
  selectedIds,
  ...rest
}: T.ICompleteButtonProps) => {
  const isDisabled = selectedIds.length !== CARD_SELECT_LIMIT;

  return (
    <button
      type="button"
      className={styles.completeButton}
      disabled={isDisabled}
      {...rest}
    >
      선택완료
    </button>
  );
};
