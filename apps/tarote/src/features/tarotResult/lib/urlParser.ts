// 🔗 URL 파라미터 파싱 및 검증
// 타로 리딩 페이지 간 데이터 전달을 위한 URL 파라미터 처리

export interface TarotRequestData {
  question: string;
  selectedCards: number[];
}

/**
 * URL 파라미터에서 타로 요청 데이터를 파싱
 * @param searchParams - URLSearchParams 객체
 * @returns 파싱된 데이터 또는 null (유효하지 않은 경우)
 */
export function parseUrlParams(searchParams: URLSearchParams): TarotRequestData | null {
  const question = searchParams.get('question');
  const cardsParam = searchParams.get('cards');

  // 필수 파라미터 검증
  if (!question || !cardsParam) {
    return null;
  }

  // 질문 유효성 검증
  const trimmedQuestion = question.trim();
  if (!trimmedQuestion || trimmedQuestion.length > 500) {
    return null;
  }

  // 카드 파라미터 파싱
  try {
    const cardIds = cardsParam.split(',').map(id => {
      const num = parseInt(id.trim(), 10);
      if (isNaN(num) || num < 1 || num > 78) {
        throw new Error('Invalid card ID');
      }
      return num;
    });

    // 카드 개수 검증 (정확히 3장)
    if (cardIds.length !== 3) {
      return null;
    }

    // 중복 카드 검증
    const uniqueCards = new Set(cardIds);
    if (uniqueCards.size !== 3) {
      return null;
    }

    return {
      question: trimmedQuestion,
      selectedCards: cardIds
    };
  } catch {
    return null;
  }
}

/**
 * 타로 요청 데이터를 URL 파라미터로 변환
 * @param data - 타로 요청 데이터
 * @returns URL 파라미터 문자열
 */
export function createUrlParams(data: TarotRequestData): string {
  const params = new URLSearchParams();
  params.set('question', data.question);
  params.set('cards', data.selectedCards.join(','));
  return params.toString();
}

/**
 * URL 파라미터 유효성 검증
 * @param searchParams - URLSearchParams 객체
 * @returns 검증 결과와 에러 메시지
 */
export function validateUrlParams(searchParams: URLSearchParams): {
  isValid: boolean;
  error?: string;
} {
  const question = searchParams.get('question');
  const cardsParam = searchParams.get('cards');

  // 필수 파라미터 체크
  if (question === null) {
    return { isValid: false, error: '질문이 누락되었습니다.' };
  }

  if (!cardsParam) {
    return { isValid: false, error: '선택된 카드가 누락되었습니다.' };
  }

  // 질문 유효성 체크
  const trimmedQuestion = question.trim();
  if (!trimmedQuestion) {
    return { isValid: false, error: '질문을 입력해주세요.' };
  }

  if (trimmedQuestion.length > 500) {
    return { isValid: false, error: '질문은 500자 이하로 입력해주세요.' };
  }

  // 카드 파라미터 체크
  try {
    const cardIds = cardsParam.split(',').map(id => {
      const num = parseInt(id.trim(), 10);
      if (isNaN(num)) {
        throw new Error('카드 ID는 숫자여야 합니다.');
      }
      if (num < 1 || num > 78) {
        throw new Error('카드 ID는 1-78 범위여야 합니다.');
      }
      return num;
    });

    if (cardIds.length !== 3) {
      return { isValid: false, error: '정확히 3장의 카드를 선택해주세요.' };
    }

    const uniqueCards = new Set(cardIds);
    if (uniqueCards.size !== 3) {
      return { isValid: false, error: '중복된 카드는 선택할 수 없습니다.' };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : '카드 정보가 올바르지 않습니다.'
    };
  }
}