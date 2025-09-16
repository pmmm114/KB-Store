// 🔮 결과 표시 단계 컴포넌트
// AI가 생성한 타로 해석 결과를 보여주는 UI

'use client';

import { useRouter } from 'next/navigation';
import { TarotInterpretation } from '../../model/types';
import styles from './ResultDisplayStep.module.css';

interface ResultDisplayStepProps {
  interpretation: TarotInterpretation;
}

export const ResultDisplayStep = ({ interpretation }: ResultDisplayStepProps) => {
  const router = useRouter();

  // 🔮 새로운 리딩 시작
  const handleNewReading = () => {
    router.push('/reading');
  };

  // 📱 결과 공유 (향후 구현)
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tarote - 나의 타로 리딩 결과',
          text: '방금 받은 타로 해석 결과를 확인해보세요!',
          url: window.location.href
        });
      } catch (error) {
        // 공유 취소된 경우는 에러로 처리하지 않음
        if ((error as Error).name !== 'AbortError') {
          console.error('공유 실패:', error);
          // 클립보드 복사로 폴백
          fallbackCopyToClipboard();
        }
      }
    } else {
      // 네이티브 공유를 지원하지 않는 환경에서는 클립보드 복사
      fallbackCopyToClipboard();
    }
  };

  // 📋 클립보드 복사 폴백
  const fallbackCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert('결과 링크가 클립보드에 복사되었습니다!');
      })
      .catch(() => {
        console.error('클립보드 복사 실패');
      });
  };

  // 📅 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 헤더 */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>🔮</div>
          <h1 className={styles.title}>
            당신의 타로 해석 결과
          </h1>
          <p className={styles.subtitle}>
            AI가 카드들의 의미를 깊이 분석한 결과입니다
          </p>
        </div>

        {/* 전체 해석 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>✨</span>
            전체적인 해석
          </h2>
          <p className={styles.overallText}>
            {interpretation.overall}
          </p>
        </section>

        {/* 카드별 의미 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🃏</span>
            카드별 의미
          </h2>
          <div className={styles.cardsGrid}>
            {interpretation.cardMeanings.map((card) => (
              <div key={`${card.cardId}-${card.position}`} className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardPosition}>
                    {card.position}
                  </div>
                  <h3 className={styles.cardTitle}>
                    카드 #{card.cardId}
                  </h3>
                </div>
                <p className={styles.cardMeaning}>
                  {card.meaning}
                </p>
                {card.symbolism && (
                  <p className={styles.cardSymbolism}>
                    상징: {card.symbolism}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 조언 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>💡</span>
            조언 및 제안
          </h2>
          <p className={styles.adviceText}>
            {interpretation.advice}
          </p>
        </section>

        {/* 액션 버튼들 */}
        <div className={styles.actions}>
          <button
            className={styles.primaryButton}
            onClick={handleNewReading}
            type="button"
          >
            새로운 리딩 시작하기
          </button>

          <button
            className={styles.secondaryButton}
            onClick={handleShare}
            type="button"
          >
            결과 공유하기
          </button>
        </div>

        {/* 타임스탬프 */}
        <div className={styles.timestamp}>
          해석 생성 시간: {formatDate(interpretation.generatedAt)}
        </div>
      </div>
    </div>
  );
};