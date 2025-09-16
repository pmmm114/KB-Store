// 🔮 타로 결과 기능 타입 정의
// 타로 해석 요청, 응답, 상태 관련 타입들

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

export interface TarotResultState {
  // 초기 데이터
  initialData: TarotRequestData | null;

  // 요청 상태
  requestId: string | null;
  requestStatus: RequestStatus;

  // 결과 데이터
  interpretation: TarotInterpretation | null;

  // 에러 상태
  error: string | null;

  // 폴링 상태
  pollingInterval: NodeJS.Timeout | null;
  pollingAttempts: number;
  isLoading: boolean;

  // 액션들
  initializeFromUrl: (searchParams: URLSearchParams) => Promise<void>;
  startPolling: (requestId: string) => void;
  stopPolling: () => void;
  reset: () => void;
}

export interface TarotResultStoreConfig {
  pollingIntervalMs: number;
  maxPollingAttempts: number;
  apiBaseUrl: string;
}

// API 응답 타입들
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

// API 에러 타입들
export class AccessDeniedError extends Error {
  constructor(message: string = '결과 확인을 위해 로그인이 필요합니다.') {
    super(message);
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