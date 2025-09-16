// 🔄 TarotResult Feature Zustand Store
// 비동기 AI 처리 상태 관리 및 폴링 시스템

import { createStore } from 'zustand/vanilla';
import { TarotResultState, InitialData, RequestStatus } from './types';
import { parseUrlParams } from '../lib/urlParser';
import { createAIRequest, getRequestStatus, AccessDeniedError } from '../api/requests';

export const createTarotResultStore = (initState?: Partial<TarotResultState>) => {
  return createStore<TarotResultState>((set, get) => ({
    // 초기 상태
    initialData: null,
    requestId: null,
    requestStatus: 'idle',
    interpretation: null,
    pollingInterval: null,
    pollingAttempts: 0,
    maxPollingAttempts: 150, // 5분 (2초 * 150)
    isLoading: false,
    error: null,
    ...initState,

    // 🚀 URL params에서 초기 데이터 설정 및 AI 요청 시작
    initializeFromUrl: (searchParams: URLSearchParams) => {
      const initialData = parseUrlParams(searchParams);

      if (!initialData) {
        set({
          error: '잘못된 요청입니다. 다시 시도해주세요.',
          requestStatus: 'failed'
        });
        return;
      }

      set({
        initialData,
        requestStatus: 'idle',
        error: null
      });

      // 자동으로 AI 요청 생성 시작
      get().createAIRequest();
    },

    // 🔮 AI 해석 요청 생성
    createAIRequest: async () => {
      const { initialData } = get();

      if (!initialData) {
        set({
          error: '요청 데이터가 없습니다.',
          requestStatus: 'failed'
        });
        return;
      }

      set({
        requestStatus: 'creating',
        error: null,
        isLoading: true
      });

      try {
        const response = await createAIRequest({
          question: initialData.question,
          selectedCards: initialData.selectedCards
        });

        set({
          requestId: response.requestId,
          requestStatus: 'pending',
          isLoading: false
        });

        // 폴링 시작
        get().startPolling(response.requestId);

      } catch (error) {
        console.error('AI 요청 생성 실패:', error);
        set({
          error: error instanceof Error ? error.message : 'AI 해석 요청 생성에 실패했습니다.',
          requestStatus: 'failed',
          isLoading: false
        });
      }
    },

    // 🔄 폴링 시작 - 2초마다 상태 확인
    startPolling: (requestId: string) => {
      // 기존 폴링이 있다면 중단
      const { pollingInterval } = get();
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }

      const interval = setInterval(async () => {
        const { pollingAttempts, maxPollingAttempts } = get();

        // 최대 시도 횟수 초과 시 중단
        if (pollingAttempts >= maxPollingAttempts) {
          get().stopPolling();
          set({
            error: '요청 처리 시간이 초과되었습니다. 다시 시도해주세요.',
            requestStatus: 'failed'
          });
          return;
        }

        try {
          const response = await getRequestStatus(requestId);

          // 완료 상태 처리
          if (response.status === 'completed' && response.result) {
            get().stopPolling();
            set({
              requestStatus: 'completed',
              interpretation: {
                overall: response.result.overall,
                cardMeanings: response.result.cardMeanings,
                advice: response.result.advice,
                generatedAt: response.result.generatedAt
              }
            });
            return;
          }

          // 실패 상태 처리
          if (response.status === 'failed') {
            get().stopPolling();
            set({
              error: 'AI 해석 생성에 실패했습니다. 다시 시도해주세요.',
              requestStatus: 'failed'
            });
            return;
          }

          // 진행 상태 업데이트
          set({
            requestStatus: response.status as RequestStatus,
            pollingAttempts: pollingAttempts + 1
          });

        } catch (error) {
          // 비회원 접근 제한 처리
          if (error instanceof AccessDeniedError) {
            get().stopPolling();
            set({ requestStatus: 'access_denied' });
            return;
          }

          // 네트워크 오류 등 - 계속 재시도
          console.warn('폴링 중 오류:', error);
          set({
            pollingAttempts: pollingAttempts + 1
          });

          // 연속 실패가 너무 많으면 중단
          if (pollingAttempts > 10) {
            get().stopPolling();
            set({
              error: '결과 확인 중 오류가 발생했습니다. 페이지를 새로고침해주세요.',
              requestStatus: 'failed'
            });
          }
        }
      }, 2000); // 2초마다 폴링

      set({
        pollingInterval: interval,
        pollingAttempts: 0
      });
    },

    // ⏹️ 폴링 중단
    stopPolling: () => {
      const { pollingInterval } = get();
      if (pollingInterval) {
        clearInterval(pollingInterval);
        set({ pollingInterval: null });
      }
    },

    // 🔄 폴링 재시도
    retryPolling: () => {
      const { requestId } = get();
      if (requestId) {
        set({
          error: null,
          pollingAttempts: 0,
          requestStatus: 'pending'
        });
        get().startPolling(requestId);
      } else {
        // requestId가 없으면 처음부터 다시 시작
        get().createAIRequest();
      }
    },

    // ⚠️ 에러 설정
    setError: (error: string | null) => {
      set({ error });
    },

    // 🔄 상태 초기화
    reset: () => {
      const { pollingInterval } = get();
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }

      set({
        initialData: null,
        requestId: null,
        requestStatus: 'idle',
        interpretation: null,
        pollingInterval: null,
        pollingAttempts: 0,
        isLoading: false,
        error: null
      });
    }
  }));
};