// 서버 컴포넌트 (기본) - FSD 구조에 맞게 단순화
import {
  TarotReadingProvider,
  TarotReadingFlow,
} from '../../features/tarotReading';
import styles from './page.module.css';

export default function ReadingPage() {
  return (
    <main className={styles.readingPage}>
      <div className={styles.stepIndicator}>
        <div className={styles.stepContainer}>
          <div className={styles.step}>
            <span className={styles.stepNumber}>1</span>
            <span className={styles.stepLabel}>질문 입력</span>
          </div>
          <div className={styles.stepDivider} />
          <div className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            <span className={styles.stepLabel}>카드 선택</span>
          </div>
        </div>
      </div>

      <div className={styles.stepContent}>
        {/* FSD 구조에 맞게 step 기반 플로우만 관리 */}
        <TarotReadingProvider>
          <TarotReadingFlow />
        </TarotReadingProvider>
      </div>
    </main>
  );
}
