'use client';

// 🎭 TarotResult 메인 플로우 컴포넌트
// 요청 상태에 따라 적절한 UI 컴포넌트를 렌더링

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTarotResult } from '../../model/provider';
import { LoadingStep } from '../LoadingStep/LoadingStep';
import { LoginPromptStep } from '../LoginPromptStep/LoginPromptStep';
import { ResultDisplayStep } from '../ResultDisplayStep/ResultDisplayStep';
import { ErrorStep } from '../ErrorStep/ErrorStep';

export const TarotResultFlow = () => {
  const searchParams = useSearchParams();
  const {
    requestStatus,
    error,
    interpretation,
    initializeFromUrl,
    retryPolling
  } = useTarotResult();

  // 🚀 페이지 로드 시 URL params에서 초기화
  useEffect(() => {
    if (searchParams) {
      initializeFromUrl(searchParams);
    }
  }, [searchParams, initializeFromUrl]);

  // 🎨 상태별 컴포넌트 렌더링
  switch (requestStatus) {
    case 'idle':
    case 'creating':
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">요청을 준비하고 있습니다...</p>
          </div>
        </div>
      );

    case 'pending':
    case 'processing':
      return <LoadingStep />;

    case 'access_denied':
      return <LoginPromptStep />;

    case 'completed':
      if (!interpretation) {
        return (
          <ErrorStep
            error="결과를 불러올 수 없습니다."
            onRetry={retryPolling}
          />
        );
      }
      return <ResultDisplayStep interpretation={interpretation} />;

    case 'failed':
      return (
        <ErrorStep
          error={error || '알 수 없는 오류가 발생했습니다.'}
          onRetry={retryPolling}
        />
      );

    default:
      return (
        <ErrorStep
          error="알 수 없는 상태입니다."
          onRetry={retryPolling}
        />
      );
  }
};