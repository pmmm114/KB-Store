// 🎯 TarotResult Feature 타입 정의
// URL params에서 받아오는 초기 데이터부터 AI 해석 결과까지 모든 타입 정의

export interface InitialData {
  question: string;
  selectedCards: number[];
}

export type RequestStatus =
  | 'idle'           // 초기 상태
  | 'creating'       // AI 요청 생성 중
  | 'pending'        // AI 처리 대기 중
  | 'processing'     // AI 처리 중
  | 'completed'      // 완료
  | 'access_denied'  // 비회원 접근 제한
  | 'failed';        // 실패

export interface TarotInterpretation {
  overall: string;              // 전체적인 해석
  cardMeanings: CardMeaning[];  // 각 카드별 의미
  advice: string;              // 조언
  generatedAt: string;         // 생성 시간
}

export interface CardMeaning {
  cardId: number;      // 카드 ID
  position: number;    // 위치 (1, 2, 3)
  meaning: string;     // 카드 의미
  symbolism: string;   // 상징성 해석
}

// 🔄 Zustand Store 상태 인터페이스
export interface TarotResultState {
  // 초기 데이터 (URL params에서 파싱)
  initialData: InitialData | null;

  // AI 요청 상태 관리
  requestId: string | null;
  requestStatus: RequestStatus;

  // 결과 데이터
  interpretation: TarotInterpretation | null;

  // 폴링 관리
  pollingInterval: NodeJS.Timeout | null;
  pollingAttempts: number;
  maxPollingAttempts: number;

  // UI 상태
  isLoading: boolean;
  error: string | null;

  // 액션들
  initializeFromUrl: (searchParams: URLSearchParams) => void;
  createAIRequest: () => Promise<void>;
  startPolling: (requestId: string) => void;
  stopPolling: () => void;
  retryPolling: () => void;
  setError: (error: string | null) => void;
  reset: () => void;
}