// 🌐 타로 API 타입 정의
// API 요청/응답 관련 타입들

export interface TarotRequestData {
  question: string;
  selectedCards: number[];
}

export interface TarotCardMeaning {
  cardId: number;
  position: number;
  meaning: string;
  symbolism: string;
}

export interface TarotInterpretation {
  overall: string;
  cardMeanings: TarotCardMeaning[];
  advice: string;
  generatedAt: string;
}

export type RequestStatus =
  | 'idle'
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'access_denied';

// API 요청/응답 타입들
export interface CreateTarotRequestResponse {
  requestId: string;
  status: 'pending';
  estimatedTime: number;
}

export interface TarotRequestStatusResponse {
  id: string;
  status: RequestStatus;
  progress?: number;
  result?: TarotInterpretation;
  createdAt: string;
  completedAt?: string;
}

// 에러 응답 타입
export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
}

// HTTP 클라이언트 설정
export interface ApiClientConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

// 커스텀 에러 클래스들
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: ApiErrorResponse
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class AccessDeniedError extends ApiError {
  constructor(message: string = '결과 확인을 위해 로그인이 필요합니다.') {
    super(message, 401);
    this.name = 'AccessDeniedError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = '네트워크 연결을 확인해주세요.') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends Error {
  constructor(message: string = '요청 데이터가 올바르지 않습니다.') {
    super(message);
    this.name = 'ValidationError';
  }
}