// 🔮 로그인 유도 단계 컴포넌트
// 비회원 사용자에게 회원가입을 유도하는 UI

'use client';

import { useRouter } from 'next/navigation';
import styles from './LoginPromptStep.module.css';

export const LoginPromptStep = () => {
  const router = useRouter();

  const handleLogin = () => {
    // TODO: 실제 로그인 페이지로 이동 (현재 URL params 유지)
    const currentUrl = new URL(window.location.href);
    const loginUrl = `/login?returnUrl=${encodeURIComponent(currentUrl.pathname + currentUrl.search)}`;
    router.push(loginUrl);
  };

  const handleSignup = () => {
    // TODO: 실제 회원가입 페이지로 이동 (현재 URL params 유지)
    const currentUrl = new URL(window.location.href);
    const signupUrl = `/signup?returnUrl=${encodeURIComponent(currentUrl.pathname + currentUrl.search)}`;
    router.push(signupUrl);
  };

  return (
    <div className={styles.promptContainer}>
      <div className={styles.content}>
        <div className={styles.icon}>🔮</div>

        <h1 className={styles.title}>
          타로 해석이 완성되었습니다!
        </h1>

        <p className={styles.subtitle}>
          AI가 당신의 질문에 대한 깊은 통찰을 준비했어요.<br />
          결과를 확인하려면 로그인이 필요합니다.
        </p>

        <div className={styles.benefits}>
          <h3 className={styles.benefitsTitle}>회원 혜택</h3>
          <ul className={styles.benefitsList}>
            <li className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✨</span>
              개인화된 AI 타로 해석 결과 확인
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.benefitIcon}>📚</span>
              이전 타로 리딩 히스토리 저장
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.benefitIcon}>🔄</span>
              언제든지 과거 해석 재확인 가능
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.benefitIcon}>💫</span>
              무제한 타로 리딩 이용
            </li>
          </ul>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.primaryButton}
            onClick={handleSignup}
            type="button"
          >
            회원가입하고 결과 보기
          </button>

          <button
            className={styles.secondaryButton}
            onClick={handleLogin}
            type="button"
          >
            이미 회원이에요
          </button>
        </div>
      </div>
    </div>
  );
};