// 🔗 URL 파라미터 파싱 유틸리티
// /reading 페이지에서 전달받은 질문과 카드 정보를 파싱

import { InitialData } from '../model/types';

/**
 * URL SearchParams에서 초기 데이터를 파싱
 * 형식: /result?q=encoded_question&cards=1,15,42&ts=timestamp
 */
export const parseUrlParams = (searchParams: URLSearchParams): InitialData | null => {
  try {
    const question = searchParams.get('q');
    const cardsParam = searchParams.get('cards');

    if (!question || !cardsParam) {
      console.warn('Missing required URL parameters:', { question: !!question, cards: !!cardsParam });
      return null;
    }

    // 질문 디코딩
    const decodedQuestion = decodeURIComponent(question);

    // 카드 배열 파싱
    const selectedCards = cardsParam.split(',').map(Number);

    // 기본 검증
    if (selectedCards.length !== 3) {
      throw new Error(`Expected 3 cards, got ${selectedCards.length}`);
    }

    if (selectedCards.some(isNaN)) {
      throw new Error('Invalid card IDs found');
    }

    // 카드 ID 유효 범위 검증 (1-78: 표준 타로 덱)
    if (selectedCards.some(id => id < 1 || id > 78)) {
      throw new Error('Card IDs must be between 1 and 78');
    }

    return {
      question: decodedQuestion,
      selectedCards
    };

  } catch (error) {
    console.error('URL params parsing failed:', error);
    return null;
  }
};

/**
 * InitialData를 URL params 문자열로 변환 (디버깅용)
 */
export const createUrlParams = (data: InitialData): string => {
  const params = new URLSearchParams({
    q: encodeURIComponent(data.question),
    cards: data.selectedCards.join(','),
    ts: Date.now().toString() // 캐시 방지용
  });
  return params.toString();
};