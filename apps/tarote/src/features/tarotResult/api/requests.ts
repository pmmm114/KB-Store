// 🌐 타로 API 요청 (임시 구현)
// 실제 구현은 별도 PR에서 진행

import { TarotRequestData } from '../lib/urlParser';
import { CreateTarotRequestResponse, TarotRequestStatusResponse } from '../model/types';

export async function createTarotRequest(
  data: TarotRequestData,
  baseUrl: string
): Promise<CreateTarotRequestResponse> {
  // 임시 구현
  return {
    requestId: 'mock-request-id',
    status: 'pending',
    estimatedTime: 30
  };
}

export async function getTarotRequestStatus(
  requestId: string,
  baseUrl: string
): Promise<TarotRequestStatusResponse> {
  // 임시 구현
  return {
    id: requestId,
    status: 'processing',
    createdAt: new Date().toISOString()
  };
}