// 🧪 URL 파서 테스트
import { parseUrlParams, createUrlParams } from './urlParser';

describe('urlParser', () => {
  describe('parseUrlParams', () => {
    it('올바른 URL params를 정상적으로 파싱해야 함', () => {
      const params = new URLSearchParams({
        q: encodeURIComponent('새로운 직장으로 이직하는 것이 좋을까요?'),
        cards: '1,15,42',
        ts: '1234567890'
      });

      const result = parseUrlParams(params);

      expect(result).toEqual({
        question: '새로운 직장으로 이직하는 것이 좋을까요?',
        selectedCards: [1, 15, 42]
      });
    });

    it('질문이 없으면 null을 반환해야 함', () => {
      const params = new URLSearchParams({
        cards: '1,15,42'
      });

      const result = parseUrlParams(params);
      expect(result).toBeNull();
    });

    it('카드가 없으면 null을 반환해야 함', () => {
      const params = new URLSearchParams({
        q: 'test question'
      });

      const result = parseUrlParams(params);
      expect(result).toBeNull();
    });

    it('카드가 3장이 아니면 null을 반환해야 함', () => {
      const params = new URLSearchParams({
        q: 'test question',
        cards: '1,15' // 2장만
      });

      const result = parseUrlParams(params);
      expect(result).toBeNull();
    });

    it('잘못된 카드 ID가 있으면 null을 반환해야 함', () => {
      const params = new URLSearchParams({
        q: 'test question',
        cards: '1,abc,42' // 숫자가 아닌 값
      });

      const result = parseUrlParams(params);
      expect(result).toBeNull();
    });

    it('범위를 벗어난 카드 ID가 있으면 null을 반환해야 함', () => {
      const params = new URLSearchParams({
        q: 'test question',
        cards: '0,15,79' // 0과 79는 유효 범위 밖
      });

      const result = parseUrlParams(params);
      expect(result).toBeNull();
    });

    it('한글과 특수문자가 포함된 질문을 올바르게 파싱해야 함', () => {
      const complexQuestion = '내 연애는 언제쯤 시작될까? 💕 (진짜 궁금해요!)';
      const params = new URLSearchParams({
        q: encodeURIComponent(complexQuestion),
        cards: '5,23,67'
      });

      const result = parseUrlParams(params);
      expect(result?.question).toBe(complexQuestion);
    });
  });

  describe('createUrlParams', () => {
    it('InitialData를 올바른 URL params로 변환해야 함', () => {
      const data = {
        question: '테스트 질문입니다',
        selectedCards: [10, 20, 30]
      };

      const result = createUrlParams(data);
      const params = new URLSearchParams(result);

      expect(decodeURIComponent(params.get('q')!)).toBe('테스트 질문입니다');
      expect(params.get('cards')).toBe('10,20,30');
      expect(params.has('ts')).toBe(true);
    });
  });
});