// 🌐 API 관련 타입 정의
// AI 요청 생성부터 결과 조회까지의 API 인터페이스

// AI 요청 생성 API
export interface CreateRequestBody {
  question: string;
  selectedCards: number[];
  userId?: string; // 로그인된 경우 (선택사항)
}

export interface CreateRequestResponse {
  requestId: string;
  status: 'pending';
  estimatedTime: number; // 예상 처리 시간 (초)
}

// 요청 상태 조회 API
export interface RequestStatusResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: {
    overall: string;
    cardMeanings: Array<{
      cardId: number;
      position: number;
      meaning: string;
      symbolism: string;
    }>;
    advice: string;
    generatedAt: string;
  };
  progress?: number; // 처리 진행률 (0-100)
  createdAt: string;
  completedAt?: string;
}

// 에러 응답
export interface ApiErrorResponse {
  error: string;
  code: 'NOT_FOUND' | 'ACCESS_DENIED' | 'INTERNAL_ERROR' | 'RATE_LIMITED';
  message: string;
}