'use client';

import { useTarotReading } from '../../model';
import { CardSelectionContainer } from '../../../cardSelection';
import styles from './SelectStep.module.css';

interface SelectStepProps {
  onPrevAction: () => void;
}

export const SelectStep = ({ onPrevAction }: SelectStepProps) => {
  const { question, selectedCards } = useTarotReading();

  return (
    <div className={styles.selectStep}>
      <div className={styles.header}>
        <button onClick={onPrevAction} className={styles.backButton}>
          ← 질문 수정
        </button>

        <div className={styles.questionSummary}>
          <h2 className={styles.summaryTitle}>당신의 질문</h2>
          <p className={styles.summaryText}>{question}</p>
        </div>
      </div>

      <div className={styles.cardSelection}>
        <h1 className={styles.title}>3장의 카드를 선택하세요</h1>
        <div className={styles.selectionProgress}>
          {selectedCards.length}/3 선택됨
        </div>
        <CardSelectionContainer />
      </div>
    </div>
  );
};
