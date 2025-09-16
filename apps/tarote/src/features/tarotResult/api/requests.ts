// 🌐 AI 요청 API 클라이언트
// 비동기 AI 해석 요청 생성 및 상태 조회

import {
  CreateRequestBody,
  CreateRequestResponse,
  RequestStatusResponse,
  ApiErrorResponse
} from './types';

/**
 * AI 해석 요청 생성
 * 비회원도 요청 생성은 가능
 */
export const createAIRequest = async (data: CreateRequestBody): Promise<CreateRequestResponse> => {
  try {
    const response = await fetch('/api/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData: ApiErrorResponse = await response.json();
      throw new Error(`API Error (${response.status}): ${errorData.message}`);
    }

    return await response.json();

  } catch (error) {
    // 네트워크 오류 등
    if (error instanceof TypeError) {
      throw new Error('네트워크 연결을 확인해주세요.');
    }
    throw error;
  }
};

/**
 * AI 요청 상태 및 결과 조회
 * 비회원은 403 에러 발생 (회원 전환 유도)
 */
export const getRequestStatus = async (requestId: string): Promise<RequestStatusResponse> => {
  try {
    const response = await fetch(`/api/requests/${requestId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // 비회원 접근 제한 - 특별 처리
    if (response.status === 403) {
      const errorData: ApiErrorResponse = await response.json();
      throw new AccessDeniedError(errorData.message);
    }

    if (!response.ok) {
      const errorData: ApiErrorResponse = await response.json();
      throw new Error(`API Error (${response.status}): ${errorData.message}`);
    }

    return await response.json();

  } catch (error) {
    // 네트워크 오류 등
    if (error instanceof TypeError) {
      throw new Error('네트워크 연결을 확인해주세요.');
    }
    throw error;
  }
};

/**
 * 비회원 접근 제한 전용 에러 클래스
 * 회원 전환 유도 UI 표시용
 */
export class AccessDeniedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AccessDeniedError';
  }
}

/**
 * 요청 재시도 유틸리티
 * 네트워크 오류 시 자동 재시도
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // AccessDeniedError는 재시도하지 않음
      if (error instanceof AccessDeniedError) {
        throw error;
      }

      // 마지막 시도면 에러 던지기
      if (attempt === maxRetries) {
        break;
      }

      // 지수 백오프로 대기
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError!;
};