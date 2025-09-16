// ⚠️ 에러 단계 컴포넌트
// 에러 발생 시 사용자에게 친화적인 에러 메시지와 해결 방법 제시

'use client';

import { useRouter } from 'next/navigation';
import styles from './ErrorStep.module.css';

interface ErrorStepProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorStep = ({ error, onRetry }: ErrorStepProps) => {
  const router = useRouter();

  // 🏠 홈으로 이동
  const handleGoHome = () => {
    router.push('/');
  };

  // 🔄 새로운 리딩 시작
  const handleNewReading = () => {
    router.push('/reading');
  };

  // 📞 에러 타입에 따른 제안사항 결정
  const getSuggestions = () => {
    const errorLower = error.toLowerCase();

    if (errorLower.includes('network') || errorLower.includes('연결') || errorLower.includes('네트워크')) {
      return [
        '인터넷 연결 상태를 확인해주세요',
        '잠시 후 다시 시도해보세요',
        'VPN을 사용 중이라면 비활성화 후 재시도해주세요'
      ];
    }

    if (errorLower.includes('timeout') || errorLower.includes('시간') || errorLower.includes('초과')) {
      return [
        '서버가 일시적으로 바쁠 수 있습니다',
        '잠시 후 다시 시도해주세요',
        '페이지를 새로고침해보세요'
      ];
    }

    if (errorLower.includes('invalid') || errorLower.includes('잘못') || errorLower.includes('올바르지')) {
      return [
        '처음부터 다시 시작해보세요',
        '질문을 다시 작성하고 카드를 선택해주세요',
        '브라우저 캐시를 삭제해보세요'
      ];
    }

    // 기본 제안사항
    return [
      '페이지를 새로고침해보세요',
      '잠시 후 다시 시도해주세요',
      '문제가 지속되면 고객센터로 문의해주세요'
    ];
  };

  const suggestions = getSuggestions();

  return (
    <div className={styles.errorContainer}>
      <div className={styles.content}>
        <div className={styles.icon}>⚠️</div>

        <h1 className={styles.title}>
          문제가 발생했습니다
        </h1>

        <p className={styles.message}>
          타로 해석을 진행하는 중에 오류가 발생했어요.<br />
          아래 방법을 시도해보세요.
        </p>

        {/* 에러 세부사항 (개발 환경에서만 표시) */}
        {process.env.NODE_ENV === 'development' && (
          <div className={styles.errorDetails}>
            {error}
          </div>
        )}

        {/* 해결 제안사항 */}
        <div className={styles.suggestions}>
          <h3 className={styles.suggestionsTitle}>해결 방법</h3>
          <ul className={styles.suggestionsList}>
            {suggestions.map((suggestion, index) => (
              <li key={index} className={styles.suggestionItem}>
                <span className={styles.suggestionIcon}>💡</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        {/* 액션 버튼들 */}
        <div className={styles.actions}>
          {onRetry && (
            <button
              className={styles.primaryButton}
              onClick={onRetry}
              type="button"
            >
              다시 시도하기
            </button>
          )}

          <button
            className={styles.secondaryButton}
            onClick={handleNewReading}
            type="button"
          >
            새로운 리딩 시작
          </button>

          <button
            className={styles.secondaryButton}
            onClick={handleGoHome}
            type="button"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};