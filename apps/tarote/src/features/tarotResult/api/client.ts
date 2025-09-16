// 🌐 HTTP 클라이언트
// 타로 API 요청을 위한 HTTP 클라이언트 구현

import {
  ApiClientConfig,
  ApiError,
  AccessDeniedError,
  NetworkError,
  ApiErrorResponse
} from './types';

const DEFAULT_CONFIG: ApiClientConfig = {
  baseUrl: '/api/tarot',
  timeout: 10000, // 10초
  retryAttempts: 3,
  retryDelay: 1000 // 1초
};

export class HttpClient {
  private config: ApiClientConfig;

  constructor(config: Partial<ApiClientConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * HTTP 요청 실행
   */
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;

    const requestOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    return this.executeWithRetry(() => this.executeRequest<T>(url, requestOptions));
  }

  /**
   * GET 요청
   */
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...(headers && { headers })
    });
  }

  /**
   * POST 요청
   */
  async post<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      ...(headers && { headers }),
      body: data ? JSON.stringify(data) : undefined
    });
  }

  /**
   * 실제 HTTP 요청 실행
   */
  private async executeRequest<T>(url: string, options: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw this.normalizeError(error);
    }
  }

  /**
   * 에러 응답 처리
   */
  private async handleErrorResponse(response: Response): Promise<never> {
    let errorResponse: ApiErrorResponse;

    try {
      errorResponse = await response.json();
    } catch {
      errorResponse = {
        error: 'Unknown Error',
        message: `HTTP ${response.status} ${response.statusText}`,
        statusCode: response.status,
        timestamp: new Date().toISOString()
      };
    }

    // 접근 거부 에러
    if (response.status === 401 || response.status === 403) {
      throw new AccessDeniedError(errorResponse.message);
    }

    // 일반 API 에러
    throw new ApiError(
      errorResponse.message || `HTTP ${response.status}`,
      response.status,
      errorResponse
    );
  }

  /**
   * 에러 정규화
   */
  private normalizeError(error: any): Error {
    // AbortError (타임아웃)
    if (error.name === 'AbortError') {
      return new NetworkError('요청이 타임아웃되었습니다.');
    }

    // 네트워크 에러
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return new NetworkError('네트워크 연결을 확인해주세요.');
    }

    // 이미 정규화된 에러
    if (error instanceof ApiError || error instanceof AccessDeniedError || error instanceof NetworkError) {
      return error;
    }

    // 기타 에러
    return new NetworkError(error.message || '알 수 없는 오류가 발생했습니다.');
  }

  /**
   * 재시도 로직과 함께 요청 실행
   */
  private async executeWithRetry<T>(
    requestFn: () => Promise<T>
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= this.config.retryAttempts; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error as Error;

        // 재시도하지 않을 에러들
        if (
          error instanceof AccessDeniedError ||
          error instanceof ApiError
        ) {
          throw error;
        }

        // 마지막 시도인 경우
        if (attempt === this.config.retryAttempts) {
          throw error;
        }

        // 재시도 전 대기
        await this.delay(this.config.retryDelay * (attempt + 1));
      }
    }

    throw lastError!;
  }

  /**
   * 지연 함수
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}