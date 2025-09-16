// 🧪 타로 API 요청 함수 테스트
// createTarotRequest, getTarotRequestStatus 함수 테스트

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  createTarotRequest,
  getTarotRequestStatus,
  cancelTarotRequest,
  resetHttpClient
} from './requests';
import { TarotRequestData } from './types';

// HttpClient 모킹
vi.mock('./client', () => ({
  HttpClient: vi.fn().mockImplementation(() => ({
    post: vi.fn(),
    get: vi.fn()
  }))
}));

import { HttpClient } from './client';

describe('타로 API 요청 함수들', () => {
  let mockHttpClient: any;

  beforeEach(() => {
    mockHttpClient = {
      post: vi.fn(),
      get: vi.fn()
    };
    (HttpClient as any).mockImplementation(() => mockHttpClient);
    resetHttpClient();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('createTarotRequest', () => {
    const validRequestData: TarotRequestData = {
      question: '나의 미래는 어떨까요?',
      selectedCards: [1, 15, 42]
    };

    it('유효한 데이터로 요청 생성이 성공해야 함', async () => {
      const mockResponse = {
        requestId: 'test-123',
        status: 'pending' as const,
        estimatedTime: 30
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await createTarotRequest(validRequestData);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/requests', {
        question: validRequestData.question,
        selectedCards: validRequestData.selectedCards,
        timestamp: expect.any(String)
      });
    });

    it('커스텀 baseUrl을 사용해야 함', async () => {
      const mockResponse = {
        requestId: 'test-123',
        status: 'pending' as const,
        estimatedTime: 30
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      await createTarotRequest(validRequestData, '/custom/api');

      expect(HttpClient).toHaveBeenCalledWith({ baseUrl: '/custom/api' });
    });

    describe('데이터 검증', () => {
      it('질문이 없으면 에러를 던져야 함', async () => {
        const invalidData = { ...validRequestData, question: '' };

        await expect(createTarotRequest(invalidData)).rejects.toThrow('빈 질문은 허용되지 않습니다.');
      });

      it('질문이 500자를 초과하면 에러를 던져야 함', async () => {
        const longQuestion = 'a'.repeat(501);
        const invalidData = { ...validRequestData, question: longQuestion };

        await expect(createTarotRequest(invalidData)).rejects.toThrow('질문은 500자 이하여야 합니다.');
      });

      it('카드가 3장이 아니면 에러를 던져야 함', async () => {
        const invalidData = { ...validRequestData, selectedCards: [1, 2] };

        await expect(createTarotRequest(invalidData)).rejects.toThrow('정확히 3장의 카드를 선택해야 합니다.');
      });

      it('유효하지 않은 카드 ID가 있으면 에러를 던져야 함', async () => {
        const invalidData = { ...validRequestData, selectedCards: [0, 15, 42] };

        await expect(createTarotRequest(invalidData)).rejects.toThrow('유효하지 않은 카드 ID: 0');
      });

      it('중복된 카드가 있으면 에러를 던져야 함', async () => {
        const invalidData = { ...validRequestData, selectedCards: [1, 1, 42] };

        await expect(createTarotRequest(invalidData)).rejects.toThrow('중복된 카드는 선택할 수 없습니다.');
      });

      it('카드 ID가 78을 초과하면 에러를 던져야 함', async () => {
        const invalidData = { ...validRequestData, selectedCards: [1, 15, 79] };

        await expect(createTarotRequest(invalidData)).rejects.toThrow('유효하지 않은 카드 ID: 79');
      });

      it('카드가 배열이 아니면 에러를 던져야 함', async () => {
        const invalidData = { ...validRequestData, selectedCards: 'not-array' as any };

        await expect(createTarotRequest(invalidData)).rejects.toThrow('선택된 카드는 배열이어야 합니다.');
      });
    });
  });

  describe('getTarotRequestStatus', () => {
    it('요청 상태 조회가 성공해야 함', async () => {
      const mockResponse = {
        id: 'test-123',
        status: 'processing' as const,
        progress: 50,
        createdAt: '2024-01-01T12:00:00Z'
      };

      mockHttpClient.get.mockResolvedValueOnce(mockResponse);

      const result = await getTarotRequestStatus('test-123');

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.get).toHaveBeenCalledWith('/requests/test-123');
    });

    it('완료된 요청의 결과를 반환해야 함', async () => {
      const mockResponse = {
        id: 'test-123',
        status: 'completed' as const,
        result: {
          overall: '좋은 결과',
          cardMeanings: [],
          advice: '긍정적으로 생각하세요',
          generatedAt: '2024-01-01T12:01:00Z'
        },
        createdAt: '2024-01-01T12:00:00Z',
        completedAt: '2024-01-01T12:01:00Z'
      };

      mockHttpClient.get.mockResolvedValueOnce(mockResponse);

      const result = await getTarotRequestStatus('test-123');

      expect(result).toEqual(mockResponse);
      expect(result.result).toBeDefined();
    });

    it('커스텀 baseUrl을 사용해야 함', async () => {
      const mockResponse = {
        id: 'test-123',
        status: 'processing' as const,
        createdAt: '2024-01-01T12:00:00Z'
      };

      mockHttpClient.get.mockResolvedValueOnce(mockResponse);

      await getTarotRequestStatus('test-123', '/custom/api');

      expect(HttpClient).toHaveBeenCalledWith({ baseUrl: '/custom/api' });
    });

    it('유효하지 않은 요청 ID로 에러를 던져야 함', async () => {
      await expect(getTarotRequestStatus('')).rejects.toThrow('유효한 요청 ID가 필요합니다.');
      await expect(getTarotRequestStatus(null as any)).rejects.toThrow('유효한 요청 ID가 필요합니다.');
    });
  });

  describe('cancelTarotRequest', () => {
    it('요청 취소가 성공해야 함', async () => {
      const mockResponse = { success: true };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await cancelTarotRequest('test-123');

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/requests/test-123/cancel');
    });

    it('유효하지 않은 요청 ID로 에러를 던져야 함', async () => {
      await expect(cancelTarotRequest('')).rejects.toThrow('유효한 요청 ID가 필요합니다.');
      await expect(cancelTarotRequest(null as any)).rejects.toThrow('유효한 요청 ID가 필요합니다.');
    });
  });

  describe('HTTP 클라이언트 싱글톤', () => {
    it('같은 baseUrl에 대해 같은 클라이언트 인스턴스를 재사용해야 함', async () => {
      mockHttpClient.post.mockResolvedValue({ requestId: 'test' });

      await createTarotRequest(validRequestData, '/api/v1');
      await createTarotRequest(validRequestData, '/api/v1');

      // HttpClient가 한 번만 생성되어야 함
      expect(HttpClient).toHaveBeenCalledTimes(1);
      expect(HttpClient).toHaveBeenCalledWith({ baseUrl: '/api/v1' });
    });

    it('다른 baseUrl에 대해 새로운 클라이언트 인스턴스를 생성해야 함', async () => {
      resetHttpClient(); // 클라이언트 리셋
      mockHttpClient.post.mockResolvedValue({ requestId: 'test' });

      await createTarotRequest(validRequestData, '/api/v1');
      await createTarotRequest(validRequestData, '/api/v2');

      // HttpClient가 두 번 생성되어야 함
      expect(HttpClient).toHaveBeenCalledTimes(2);
      expect(HttpClient).toHaveBeenNthCalledWith(1, { baseUrl: '/api/v1' });
      expect(HttpClient).toHaveBeenNthCalledWith(2, { baseUrl: '/api/v2' });
    });
  });

  const validRequestData: TarotRequestData = {
    question: '나의 미래는 어떨까요?',
    selectedCards: [1, 15, 42]
  };
});