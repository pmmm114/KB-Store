import React from 'react';
import styles from './LoadingPage.module.css';

const LoadingPage = () => (
  <div className={styles.loadingPage}>
    <div className={styles.crystalBallWrapper}>
      <div className={styles.crystalBallCore} />
      <div className={styles.crystalBallGlow} />
    </div>
    <div className={styles.loadingText}>로딩 중입니다...</div>
  </div>
);

export default LoadingPage;
