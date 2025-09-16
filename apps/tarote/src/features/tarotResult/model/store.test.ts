// 🧪 타로 결과 스토어 테스트
// Zustand store의 상태 관리 및 폴링 로직 테스트

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTarotResultStore } from './store';
import { AccessDeniedError, NetworkError, ValidationError } from './types';

// API 모킹
vi.mock('../lib/urlParser', () => ({
  parseUrlParams: vi.fn(),
  validateUrlParams: vi.fn()
}));

vi.mock('../api/requests', () => ({
  createTarotRequest: vi.fn(),
  getTarotRequestStatus: vi.fn()
}));

import { parseUrlParams, validateUrlParams } from '../lib/urlParser';
import { createTarotRequest, getTarotRequestStatus } from '../api/requests';

describe('TarotResultStore', () => {
  let store: ReturnType<typeof createTarotResultStore>;

  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
    store = createTarotResultStore({
      pollingIntervalMs: 100, // 테스트용으로 빠르게 설정
      maxPollingAttempts: 3
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    store.getState().stopPolling();
  });

  describe('초기 상태', () => {
    it('올바른 초기 상태를 가져야 함', () => {
      const state = store.getState();

      expect(state.initialData).toBe(null);
      expect(state.requestId).toBe(null);
      expect(state.requestStatus).toBe('idle');
      expect(state.interpretation).toBe(null);
      expect(state.error).toBe(null);
      expect(state.pollingInterval).toBe(null);
      expect(state.pollingAttempts).toBe(0);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('initializeFromUrl', () => {
    it('유효한 URL 파라미터로 초기화 성공', async () => {
      const searchParams = new URLSearchParams('?question=테스트&cards=1,2,3');
      const mockData = { question: '테스트', selectedCards: [1, 2, 3] };

      // 모킹 설정
      (validateUrlParams as any).mockReturnValue({ isValid: true });
      (parseUrlParams as any).mockReturnValue(mockData);
      (createTarotRequest as any).mockResolvedValue({
        requestId: 'test-123',
        status: 'pending',
        estimatedTime: 30
      });

      // 실행
      await store.getState().initializeFromUrl(searchParams);

      const state = store.getState();
      expect(state.initialData).toEqual(mockData);
      expect(state.requestId).toBe('test-123');
      expect(state.requestStatus).toBe('processing');
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('URL 검증 실패 시 적절한 에러 상태', async () => {
      const searchParams = new URLSearchParams('?question=&cards=1,2');

      (validateUrlParams as any).mockReturnValue({
        isValid: false,
        error: '질문을 입력해주세요.'
      });

      await store.getState().initializeFromUrl(searchParams);

      const state = store.getState();
      expect(state.error).toBe('질문을 입력해주세요.');
      expect(state.requestStatus).toBe('failed');
      expect(state.isLoading).toBe(false);
    });

    it('파싱 실패 시 적절한 에러 상태', async () => {
      const searchParams = new URLSearchParams('?question=테스트&cards=1,2,3');

      (validateUrlParams as any).mockReturnValue({ isValid: true });
      (parseUrlParams as any).mockReturnValue(null);

      await store.getState().initializeFromUrl(searchParams);

      const state = store.getState();
      expect(state.error).toBe('잘못된 요청입니다. 다시 시도해주세요.');
      expect(state.requestStatus).toBe('failed');
    });

    it('API 요청 실패 시 적절한 에러 상태', async () => {
      const searchParams = new URLSearchParams('?question=테스트&cards=1,2,3');
      const mockData = { question: '테스트', selectedCards: [1, 2, 3] };

      (validateUrlParams as any).mockReturnValue({ isValid: true });
      (parseUrlParams as any).mockReturnValue(mockData);
      (createTarotRequest as any).mockRejectedValue(new NetworkError());

      await store.getState().initializeFromUrl(searchParams);

      const state = store.getState();
      expect(state.error).toBe('네트워크 연결을 확인해주세요.');
      expect(state.requestStatus).toBe('failed');
    });

    it('접근 거부 시 적절한 상태 변경', async () => {
      const searchParams = new URLSearchParams('?question=테스트&cards=1,2,3');
      const mockData = { question: '테스트', selectedCards: [1, 2, 3] };

      (validateUrlParams as any).mockReturnValue({ isValid: true });
      (parseUrlParams as any).mockReturnValue(mockData);
      (createTarotRequest as any).mockRejectedValue(new AccessDeniedError());

      await store.getState().initializeFromUrl(searchParams);

      const state = store.getState();
      expect(state.error).toBe('결과 확인을 위해 로그인이 필요합니다.');
      expect(state.requestStatus).toBe('access_denied');
    });
  });

  describe('startPolling', () => {
    it('폴링 시작 시 적절한 상태 설정', () => {
      store.getState().startPolling('test-123');

      const state = store.getState();
      expect(state.requestStatus).toBe('processing');
      expect(state.pollingAttempts).toBe(0);
      expect(state.error).toBe(null);
      expect(state.pollingInterval).not.toBe(null);
    });

    it('완료된 결과를 받으면 폴링 중단', async () => {
      const mockResult = {
        overall: '테스트 해석',
        cardMeanings: [],
        advice: '테스트 조언',
        generatedAt: '2024-01-01T12:00:00Z'
      };

      (getTarotRequestStatus as any).mockResolvedValue({
        id: 'test-123',
        status: 'completed',
        result: mockResult,
        createdAt: '2024-01-01T12:00:00Z',
        completedAt: '2024-01-01T12:01:00Z'
      });

      store.getState().startPolling('test-123');

      // 첫 번째 폴링 실행
      await vi.advanceTimersByTimeAsync(100);

      const state = store.getState();
      expect(state.requestStatus).toBe('completed');
      expect(state.interpretation).toEqual(mockResult);
      expect(state.pollingInterval).toBe(null);
    });

    it('처리 중 상태에서 폴링 계속', async () => {
      (getTarotRequestStatus as any).mockResolvedValue({
        id: 'test-123',
        status: 'processing',
        progress: 50,
        createdAt: '2024-01-01T12:00:00Z'
      });

      store.getState().startPolling('test-123');

      // 첫 번째 폴링 실행
      await vi.advanceTimersByTimeAsync(100);

      const state = store.getState();
      expect(state.requestStatus).toBe('processing');
      expect(state.pollingAttempts).toBe(1);
      expect(state.pollingInterval).not.toBe(null);
    });

    it('실패 상태를 받으면 폴링 중단', async () => {
      (getTarotRequestStatus as any).mockResolvedValue({
        id: 'test-123',
        status: 'failed',
        createdAt: '2024-01-01T12:00:00Z'
      });

      store.getState().startPolling('test-123');

      // 첫 번째 폴링 실행
      await vi.advanceTimersByTimeAsync(100);

      const state = store.getState();
      expect(state.requestStatus).toBe('failed');
      expect(state.error).toBe('타로 해석 생성에 실패했습니다. 다시 시도해주세요.');
      expect(state.pollingInterval).toBe(null);
    });

    it('접근 거부 에러 시 즉시 폴링 중단', async () => {
      (getTarotRequestStatus as any).mockRejectedValue(new AccessDeniedError());

      store.getState().startPolling('test-123');

      // 첫 번째 폴링 실행
      await vi.advanceTimersByTimeAsync(100);

      const state = store.getState();
      expect(state.requestStatus).toBe('access_denied');
      expect(state.error).toBe('결과 확인을 위해 로그인이 필요합니다.');
      expect(state.pollingInterval).toBe(null);
    });

    it('최대 재시도 횟수 초과 시 폴링 중단', async () => {
      (getTarotRequestStatus as any).mockRejectedValue(new NetworkError());

      store.getState().startPolling('test-123');

      // 최대 재시도 횟수까지 실행
      for (let i = 0; i < 3; i++) {
        await vi.advanceTimersByTimeAsync(100);
      }

      const state = store.getState();
      expect(state.requestStatus).toBe('failed');
      expect(state.error).toBe('요청 처리 시간이 초과되었습니다. 다시 시도해주세요.');
      expect(state.pollingInterval).toBe(null);
    });

    it('네트워크 에러 시 재시도', async () => {
      let callCount = 0;
      (getTarotRequestStatus as any).mockImplementation(() => {
        callCount++;
        if (callCount < 3) {
          return Promise.reject(new NetworkError());
        } else {
          return Promise.resolve({
            id: 'test-123',
            status: 'completed',
            result: {
              overall: '성공',
              cardMeanings: [],
              advice: '조언',
              generatedAt: '2024-01-01T12:00:00Z'
            }
          });
        }
      });

      store.getState().startPolling('test-123');

      // 재시도 후 성공할 때까지 실행
      for (let i = 0; i < 3; i++) {
        await vi.advanceTimersByTimeAsync(100);
      }

      const state = store.getState();
      expect(state.requestStatus).toBe('completed');
      expect(state.interpretation?.overall).toBe('성공');
    });
  });

  describe('stopPolling', () => {
    it('폴링을 중단해야 함', () => {
      // 폴링 시작
      store.getState().startPolling('test-123');
      expect(store.getState().pollingInterval).not.toBe(null);

      // 폴링 중단
      store.getState().stopPolling();
      expect(store.getState().pollingInterval).toBe(null);
    });
  });

  describe('reset', () => {
    it('모든 상태를 초기화해야 함', () => {
      // 상태 설정
      store.setState({
        initialData: { question: '테스트', selectedCards: [1, 2, 3] },
        requestId: 'test-123',
        requestStatus: 'completed',
        interpretation: {
          overall: '테스트',
          cardMeanings: [],
          advice: '테스트',
          generatedAt: '2024-01-01T12:00:00Z'
        },
        error: '테스트 에러',
        pollingAttempts: 5,
        isLoading: true
      });

      // 리셋 실행
      store.getState().reset();

      const state = store.getState();
      expect(state.initialData).toBe(null);
      expect(state.requestId).toBe(null);
      expect(state.requestStatus).toBe('idle');
      expect(state.interpretation).toBe(null);
      expect(state.error).toBe(null);
      expect(state.pollingInterval).toBe(null);
      expect(state.pollingAttempts).toBe(0);
      expect(state.isLoading).toBe(false);
    });

    it('폴링이 진행 중일 때 리셋하면 폴링도 중단해야 함', () => {
      // 폴링 시작
      store.getState().startPolling('test-123');
      expect(store.getState().pollingInterval).not.toBe(null);

      // 리셋 실행
      store.getState().reset();

      // 폴링도 중단되어야 함
      expect(store.getState().pollingInterval).toBe(null);
    });
  });

  describe('기존 폴링 중단', () => {
    it('새 폴링 시작 시 기존 폴링을 중단해야 함', () => {
      // 첫 번째 폴링 시작
      store.getState().startPolling('test-1');
      const firstInterval = store.getState().pollingInterval;

      // 두 번째 폴링 시작
      store.getState().startPolling('test-2');
      const secondInterval = store.getState().pollingInterval;

      // 새로운 인터벌이 설정되어야 함
      expect(firstInterval).not.toBe(secondInterval);
      expect(store.getState().pollingInterval).toBe(secondInterval);
    });
  });
});