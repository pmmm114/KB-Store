// 🔮 타로 API 요청 함수들
// 타로 해석 요청 및 상태 확인 API

import { HttpClient } from './client';
import {
  TarotRequestData,
  CreateTarotRequestResponse,
  TarotRequestStatusResponse,
  ApiClientConfig
} from './types';

// HTTP 클라이언트 인스턴스 (싱글톤)
let httpClient: HttpClient | null = null;

/**
 * HTTP 클라이언트 인스턴스 가져오기
 */
function getHttpClient(baseUrl?: string): HttpClient {
  if (!httpClient || (baseUrl && httpClient['config'].baseUrl !== baseUrl)) {
    httpClient = new HttpClient(baseUrl ? { baseUrl } : undefined);
  }
  return httpClient;
}

/**
 * 타로 해석 요청 생성
 * @param data 타로 요청 데이터 (질문 + 선택된 카드)
 * @param baseUrl API 베이스 URL (선택사항)
 * @returns 요청 ID와 예상 처리 시간
 */
export async function createTarotRequest(
  data: TarotRequestData,
  baseUrl?: string
): Promise<CreateTarotRequestResponse> {
  const client = getHttpClient(baseUrl);

  // 요청 데이터 검증
  validateTarotRequestData(data);

  return client.post<CreateTarotRequestResponse>('/requests', {
    question: data.question,
    selectedCards: data.selectedCards,
    timestamp: new Date().toISOString()
  });
}

/**
 * 타로 요청 상태 확인
 * @param requestId 요청 ID
 * @param baseUrl API 베이스 URL (선택사항)
 * @returns 요청 상태 및 결과 (완료된 경우)
 */
export async function getTarotRequestStatus(
  requestId: string,
  baseUrl?: string
): Promise<TarotRequestStatusResponse> {
  const client = getHttpClient(baseUrl);

  if (!requestId || typeof requestId !== 'string') {
    throw new Error('유효한 요청 ID가 필요합니다.');
  }

  return client.get<TarotRequestStatusResponse>(`/requests/${requestId}`);
}

/**
 * 타로 요청 취소
 * @param requestId 요청 ID
 * @param baseUrl API 베이스 URL (선택사항)
 */
export async function cancelTarotRequest(
  requestId: string,
  baseUrl?: string
): Promise<{ success: boolean }> {
  const client = getHttpClient(baseUrl);

  if (!requestId || typeof requestId !== 'string') {
    throw new Error('유효한 요청 ID가 필요합니다.');
  }

  return client.post<{ success: boolean }>(`/requests/${requestId}/cancel`);
}

/**
 * 타로 요청 데이터 검증
 */
function validateTarotRequestData(data: TarotRequestData): void {
  // 질문 검증
  if (!data.question || typeof data.question !== 'string') {
    throw new Error('질문이 필요합니다.');
  }

  const trimmedQuestion = data.question.trim();
  if (!trimmedQuestion) {
    throw new Error('빈 질문은 허용되지 않습니다.');
  }

  if (trimmedQuestion.length > 500) {
    throw new Error('질문은 500자 이하여야 합니다.');
  }

  // 카드 검증
  if (!Array.isArray(data.selectedCards)) {
    throw new Error('선택된 카드는 배열이어야 합니다.');
  }

  if (data.selectedCards.length !== 3) {
    throw new Error('정확히 3장의 카드를 선택해야 합니다.');
  }

  // 카드 ID 유효성 검증
  for (const cardId of data.selectedCards) {
    if (!Number.isInteger(cardId) || cardId < 1 || cardId > 78) {
      throw new Error(`유효하지 않은 카드 ID: ${cardId}. 카드 ID는 1-78 범위여야 합니다.`);
    }
  }

  // 중복 카드 검증
  const uniqueCards = new Set(data.selectedCards);
  if (uniqueCards.size !== 3) {
    throw new Error('중복된 카드는 선택할 수 없습니다.');
  }
}

/**
 * HTTP 클라이언트 설정 업데이트
 */
export function updateApiConfig(config: Partial<ApiClientConfig>): void {
  httpClient = new HttpClient(config);
}

/**
 * HTTP 클라이언트 인스턴스 리셋 (테스트용)
 */
export function resetHttpClient(): void {
  httpClient = null;
}