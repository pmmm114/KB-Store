// 🔗 URL 파라미터 파싱 및 검증 (임시 구현)
// 실제 구현은 별도 PR에서 진행

export interface TarotRequestData {
  question: string;
  selectedCards: number[];
}

export function parseUrlParams(searchParams: URLSearchParams): TarotRequestData | null {
  const question = searchParams.get('question');
  const cardsParam = searchParams.get('cards');

  if (!question || !cardsParam) {
    return null;
  }

  try {
    const selectedCards = cardsParam.split(',').map(id => parseInt(id.trim(), 10));
    return { question, selectedCards };
  } catch {
    return null;
  }
}

export function validateUrlParams(searchParams: URLSearchParams): {
  isValid: boolean;
  error?: string;
} {
  const question = searchParams.get('question');
  const cardsParam = searchParams.get('cards');

  if (!question) {
    return { isValid: false, error: '질문이 누락되었습니다.' };
  }

  if (!cardsParam) {
    return { isValid: false, error: '선택된 카드가 누락되었습니다.' };
  }

  return { isValid: true };
}