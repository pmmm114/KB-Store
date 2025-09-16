// 🏪 타로 결과 Zustand 스토어
// 타로 해석 요청 및 폴링 상태 관리

import { create } from 'zustand';
import { parseUrlParams, validateUrlParams } from '../lib/urlParser';
import { createTarotRequest, getTarotRequestStatus } from '../api/requests';
import {
  TarotResultState,
  TarotResultStoreConfig,
  AccessDeniedError,
  NetworkError,
  ValidationError,
  RequestStatus
} from './types';

const DEFAULT_CONFIG: TarotResultStoreConfig = {
  pollingIntervalMs: 2000, // 2초마다 폴링
  maxPollingAttempts: 90,  // 최대 3분 (2초 * 90번)
  apiBaseUrl: '/api/tarot'
};

export function createTarotResultStore(config: Partial<TarotResultStoreConfig> = {}) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  return create<TarotResultState>()((set, get) => ({
    // 초기 상태
    initialData: null,
    requestId: null,
    requestStatus: 'idle',
    interpretation: null,
    error: null,
    pollingInterval: null,
    pollingAttempts: 0,
    isLoading: false,

    // URL 파라미터에서 초기화
    initializeFromUrl: async (searchParams: URLSearchParams) => {
      // 로딩 시작
      set({ isLoading: true, error: null, requestStatus: 'idle' });

      try {
        // URL 파라미터 검증
        const validation = validateUrlParams(searchParams);
        if (!validation.isValid) {
          throw new ValidationError(validation.error);
        }

        // 파라미터 파싱
        const parsedData = parseUrlParams(searchParams);
        if (!parsedData) {
          throw new ValidationError('잘못된 요청입니다. 다시 시도해주세요.');
        }

        // 상태 업데이트
        set({
          initialData: parsedData,
          requestStatus: 'pending'
        });

        // API 요청 생성
        const response = await createTarotRequest(parsedData, finalConfig.apiBaseUrl);

        set({
          requestId: response.requestId,
          isLoading: false
        });

        // 폴링 시작
        get().startPolling(response.requestId);

      } catch (error) {
        console.error('초기화 에러:', error);

        let errorMessage = '요청 처리 중 오류가 발생했습니다.';
        let status: RequestStatus = 'failed';

        if (error instanceof ValidationError) {
          errorMessage = error.message;
        } else if (error instanceof AccessDeniedError) {
          errorMessage = error.message;
          status = 'access_denied';
        } else if (error instanceof NetworkError) {
          errorMessage = error.message;
        }

        set({
          error: errorMessage,
          requestStatus: status,
          isLoading: false
        });
      }
    },

    // 폴링 시작
    startPolling: (requestId: string) => {
      // 기존 폴링 중단
      get().stopPolling();

      set({
        requestStatus: 'processing',
        pollingAttempts: 0,
        error: null
      });

      const pollForResult = async () => {
        const state = get();

        try {
          const response = await getTarotRequestStatus(requestId, finalConfig.apiBaseUrl);

          if (response.status === 'completed' && response.result) {
            // 완료된 경우
            set({
              interpretation: response.result,
              requestStatus: 'completed',
              pollingInterval: null
            });
            return; // 폴링 종료
          } else if (response.status === 'failed') {
            // 실패한 경우
            set({
              error: '타로 해석 생성에 실패했습니다. 다시 시도해주세요.',
              requestStatus: 'failed',
              pollingInterval: null
            });
            return; // 폴링 종료
          } else if (response.status === 'processing' || response.status === 'pending') {
            // 아직 처리 중인 경우 - 폴링 계속
            set({ requestStatus: response.status });

            // 다음 폴링 스케줄링
            const interval = setTimeout(pollForResult, finalConfig.pollingIntervalMs);
            set({
              pollingInterval: interval,
              pollingAttempts: state.pollingAttempts + 1
            });
          }

        } catch (error) {
          console.error('폴링 에러:', error);

          const attempts = state.pollingAttempts + 1;

          if (error instanceof AccessDeniedError) {
            // 접근 거부 - 즉시 폴링 중단
            set({
              requestStatus: 'access_denied',
              pollingInterval: null,
              error: error.message
            });
            return;
          } else if (attempts >= finalConfig.maxPollingAttempts) {
            // 최대 재시도 횟수 초과
            set({
              error: '요청 처리 시간이 초과되었습니다. 다시 시도해주세요.',
              requestStatus: 'failed',
              pollingInterval: null
            });
            return;
          } else {
            // 재시도
            const interval = setTimeout(pollForResult, finalConfig.pollingIntervalMs);
            set({
              pollingInterval: interval,
              pollingAttempts: attempts
            });
          }
        }
      };

      // 첫 번째 폴링 시작
      const interval = setTimeout(pollForResult, finalConfig.pollingIntervalMs);
      set({ pollingInterval: interval });
    },

    // 폴링 중단
    stopPolling: () => {
      const state = get();
      if (state.pollingInterval) {
        clearTimeout(state.pollingInterval);
        set({ pollingInterval: null });
      }
    },

    // 상태 초기화
    reset: () => {
      const state = get();

      // 폴링 중단
      if (state.pollingInterval) {
        clearTimeout(state.pollingInterval);
      }

      // 모든 상태 초기화
      set({
        initialData: null,
        requestId: null,
        requestStatus: 'idle',
        interpretation: null,
        error: null,
        pollingInterval: null,
        pollingAttempts: 0,
        isLoading: false
      });
    }
  }));
}

// 기본 스토어 인스턴스 (싱글톤)
export const useTarotResultStore = createTarotResultStore();