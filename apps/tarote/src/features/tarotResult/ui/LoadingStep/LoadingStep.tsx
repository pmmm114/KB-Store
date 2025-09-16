// 🔮 로딩 단계 컴포넌트
// AI가 타로 해석을 생성하는 동안 표시되는 로딩 UI

import { LoadingPage } from '../../../../widgets/LoadingPage/LoadingPage';
import styles from './LoadingStep.module.css';

export const LoadingStep = () => {
  return (
    <div className={styles.loadingContainer}>
      {/* 기존 LoadingPage 위젯 재사용 */}
      <LoadingPage />

      <div className={styles.statusMessage}>
        <h2 className={styles.title}>AI가 타로 카드를 해석하고 있습니다</h2>
        <p className={styles.subtitle}>
          선택하신 카드들과 질문을 바탕으로<br />
          개인화된 해석을 생성하고 있어요
        </p>

        <div className={styles.dots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>

        <p className={styles.waitMessage}>잠시만 기다려주세요...</p>
      </div>
    </div>
  );
};