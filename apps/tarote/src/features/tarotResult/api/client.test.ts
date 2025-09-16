// 🧪 HTTP 클라이언트 테스트
// HttpClient의 에러 처리, 재시도, 타임아웃 로직 테스트

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HttpClient } from './client';
import { ApiError, AccessDeniedError, NetworkError } from './types';

// Fetch 모킹
global.fetch = vi.fn();

describe('HttpClient', () => {
  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient({
      baseUrl: '/api/test',
      timeout: 1000,
      retryAttempts: 2,
      retryDelay: 100
    });
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('성공적인 요청', () => {
    it('GET 요청이 성공해야 함', async () => {
      const mockResponse = { data: 'test' };
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await client.get('/test');

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('/api/test/test', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: expect.any(AbortSignal)
      });
    });

    it('POST 요청이 성공해야 함', async () => {
      const mockData = { question: 'test', cards: [1, 2, 3] };
      const mockResponse = { id: 'test-123' };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await client.post('/test', mockData);

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('/api/test/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockData),
        signal: expect.any(AbortSignal)
      });
    });
  });

  describe('에러 처리', () => {
    it('401 에러시 AccessDeniedError를 던져야 함', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({
          error: 'Unauthorized',
          message: '로그인이 필요합니다',
          statusCode: 401,
          timestamp: '2024-01-01T12:00:00Z'
        })
      });

      await expect(client.get('/test')).rejects.toThrow(AccessDeniedError);
    });

    it('403 에러시 AccessDeniedError를 던져야 함', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({
          error: 'Forbidden',
          message: '접근 권한이 없습니다',
          statusCode: 403,
          timestamp: '2024-01-01T12:00:00Z'
        })
      });

      await expect(client.get('/test')).rejects.toThrow(AccessDeniedError);
    });

    it('500 에러시 ApiError를 던져야 함', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({
          error: 'Internal Server Error',
          message: '서버 오류가 발생했습니다',
          statusCode: 500,
          timestamp: '2024-01-01T12:00:00Z'
        })
      });

      await expect(client.get('/test')).rejects.toThrow(ApiError);
    });

    it('JSON 파싱 실패시 기본 에러 메시지를 사용해야 함', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => {
          throw new Error('Invalid JSON');
        }
      });

      await expect(client.get('/test')).rejects.toThrow(ApiError);
    });
  });

  describe('네트워크 에러 처리', () => {
    it('fetch 에러시 NetworkError를 던져야 함', async () => {
      (fetch as any).mockRejectedValueOnce(new TypeError('fetch error'));

      await expect(client.get('/test')).rejects.toThrow(NetworkError);
    });

    it('타임아웃시 NetworkError를 던져야 함', async () => {
      vi.useFakeTimers();

      (fetch as any).mockImplementationOnce(() =>
        new Promise(resolve => setTimeout(resolve, 2000))
      );

      const promise = client.get('/test');

      // 타임아웃 시간 경과
      vi.advanceTimersByTime(1100);

      await expect(promise).rejects.toThrow(NetworkError);

      vi.useRealTimers();
    }, 10000);
  });

  describe('재시도 로직', () => {
    it('네트워크 에러시 재시도해야 함', async () => {
      let callCount = 0;
      (fetch as any).mockImplementation(() => {
        callCount++;
        if (callCount < 3) {
          return Promise.reject(new TypeError('Network error'));
        } else {
          return Promise.resolve({
            ok: true,
            json: async () => ({ success: true })
          });
        }
      });

      const result = await client.get('/test');

      expect(result).toEqual({ success: true });
      expect(fetch).toHaveBeenCalledTimes(3);
    });

    it('최대 재시도 횟수 초과시 에러를 던져야 함', async () => {
      (fetch as any).mockRejectedValue(new TypeError('Network error'));

      await expect(client.get('/test')).rejects.toThrow(NetworkError);
      expect(fetch).toHaveBeenCalledTimes(3); // 초기 시도 + 2번 재시도
    });

    it('ApiError는 재시도하지 않아야 함', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          error: 'Bad Request',
          message: '잘못된 요청입니다',
          statusCode: 400,
          timestamp: '2024-01-01T12:00:00Z'
        })
      });

      await expect(client.get('/test')).rejects.toThrow(ApiError);
      expect(fetch).toHaveBeenCalledTimes(1); // 재시도 없음
    });

    it('AccessDeniedError는 재시도하지 않아야 함', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({
          error: 'Unauthorized',
          message: '로그인이 필요합니다',
          statusCode: 401,
          timestamp: '2024-01-01T12:00:00Z'
        })
      });

      await expect(client.get('/test')).rejects.toThrow(AccessDeniedError);
      expect(fetch).toHaveBeenCalledTimes(1); // 재시도 없음
    });
  });

  describe('헤더 처리', () => {
    it('커스텀 헤더를 올바르게 설정해야 함', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({})
      });

      await client.get('/test', { 'Authorization': 'Bearer token' });

      expect(fetch).toHaveBeenCalledWith('/api/test/test', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer token',
          'Content-Type': 'application/json'
        },
        signal: expect.any(AbortSignal)
      });
    });
  });
});