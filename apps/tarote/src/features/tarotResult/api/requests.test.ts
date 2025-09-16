// 🧪 API 요청 테스트
import { createAIRequest, getRequestStatus, AccessDeniedError, withRetry } from './requests';

// 전역 fetch 모킹
global.fetch = vi.fn();

describe('AI Requests API', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('createAIRequest', () => {
    it('정상적인 AI 요청 생성이 성공해야 함', async () => {
      const mockResponse = {
        requestId: 'test-request-id',
        status: 'pending' as const,
        estimatedTime: 30
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await createAIRequest({
        question: '테스트 질문',
        selectedCards: [1, 15, 42]
      });

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: '테스트 질문',
          selectedCards: [1, 15, 42]
        })
      });
    });

    it('서버 오류 시 적절한 에러를 던져야 함', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({
          error: 'Internal Server Error',
          code: 'INTERNAL_ERROR',
          message: '서버에 문제가 발생했습니다.'
        })
      });

      await expect(createAIRequest({
        question: '테스트',
        selectedCards: [1, 2, 3]
      })).rejects.toThrow('API Error (500): 서버에 문제가 발생했습니다.');
    });

    it('네트워크 오류 시 적절한 메시지를 제공해야 함', async () => {
      (fetch as any).mockRejectedValueOnce(new TypeError('Network error'));

      await expect(createAIRequest({
        question: '테스트',
        selectedCards: [1, 2, 3]
      })).rejects.toThrow('네트워크 연결을 확인해주세요.');
    });
  });

  describe('getRequestStatus', () => {
    it('완료된 요청의 결과를 정상적으로 조회해야 함', async () => {
      const mockResponse = {
        id: 'test-request-id',
        status: 'completed' as const,
        result: {
          overall: '전체적인 해석',
          cardMeanings: [
            { cardId: 1, position: 1, meaning: '카드 의미', symbolism: '상징성' }
          ],
          advice: '조언',
          generatedAt: '2024-01-01T00:00:00Z'
        },
        createdAt: '2024-01-01T00:00:00Z',
        completedAt: '2024-01-01T00:01:00Z'
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getRequestStatus('test-request-id');
      expect(result).toEqual(mockResponse);
    });

    it('비회원 접근 시 AccessDeniedError를 던져야 함', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({
          error: 'Access denied',
          code: 'ACCESS_DENIED',
          message: '결과 확인을 위해 로그인이 필요합니다.'
        })
      });

      await expect(getRequestStatus('test-request-id'))
        .rejects.toThrow(AccessDeniedError);
    });

    it('진행 중인 요청의 상태를 조회해야 함', async () => {
      const mockResponse = {
        id: 'test-request-id',
        status: 'processing' as const,
        progress: 75,
        createdAt: '2024-01-01T00:00:00Z'
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getRequestStatus('test-request-id');
      expect(result.status).toBe('processing');
      expect(result.progress).toBe(75);
    });
  });

  describe('withRetry', () => {
    it('성공할 때까지 재시도해야 함', async () => {
      let attempts = 0;
      const mockFn = vi.fn(async () => {
        attempts++;
        if (attempts < 3) {
          throw new Error('Temporary error');
        }
        return 'success';
      });

      const result = await withRetry(mockFn, 3, 100);
      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(3);
    });

    it('AccessDeniedError는 재시도하지 않아야 함', async () => {
      const mockFn = vi.fn(async () => {
        throw new AccessDeniedError('Access denied');
      });

      await expect(withRetry(mockFn, 3, 100))
        .rejects.toThrow(AccessDeniedError);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('최대 재시도 횟수 초과 시 마지막 에러를 던져야 함', async () => {
      const mockFn = vi.fn(async () => {
        throw new Error('Persistent error');
      });

      await expect(withRetry(mockFn, 2, 100))
        .rejects.toThrow('Persistent error');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
});