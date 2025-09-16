// 🧪 URL 파서 테스트
// URL 파라미터 파싱 및 검증 로직 테스트

import { describe, it, expect } from 'vitest';
import { parseUrlParams, createUrlParams, validateUrlParams } from './urlParser';

describe('parseUrlParams', () => {
  it('유효한 파라미터를 올바르게 파싱해야 함', () => {
    const params = new URLSearchParams('?question=나의%20미래는%20어떨까요&cards=1,15,42');
    const result = parseUrlParams(params);

    expect(result).toEqual({
      question: '나의 미래는 어떨까요',
      selectedCards: [1, 15, 42]
    });
  });

  it('질문이 없으면 null을 반환해야 함', () => {
    const params = new URLSearchParams('?cards=1,15,42');
    const result = parseUrlParams(params);

    expect(result).toBe(null);
  });

  it('카드가 없으면 null을 반환해야 함', () => {
    const params = new URLSearchParams('?question=테스트');
    const result = parseUrlParams(params);

    expect(result).toBe(null);
  });

  it('빈 질문이면 null을 반환해야 함', () => {
    const params = new URLSearchParams('?question=&cards=1,15,42');
    const result = parseUrlParams(params);

    expect(result).toBe(null);
  });

  it('공백만 있는 질문이면 null을 반환해야 함', () => {
    const params = new URLSearchParams('?question=%20%20%20&cards=1,15,42');
    const result = parseUrlParams(params);

    expect(result).toBe(null);
  });

  it('500자를 초과하는 질문이면 null을 반환해야 함', () => {
    const longQuestion = 'a'.repeat(501);
    const params = new URLSearchParams(`?question=${longQuestion}&cards=1,15,42`);
    const result = parseUrlParams(params);

    expect(result).toBe(null);
  });

  it('카드가 3장이 아니면 null을 반환해야 함', () => {
    const params = new URLSearchParams('?question=테스트&cards=1,15');
    const result = parseUrlParams(params);

    expect(result).toBe(null);
  });

  it('중복된 카드가 있으면 null을 반환해야 함', () => {
    const params = new URLSearchParams('?question=테스트&cards=1,1,15');
    const result = parseUrlParams(params);

    expect(result).toBe(null);
  });

  it('유효하지 않은 카드 ID가 있으면 null을 반환해야 함', () => {
    const params = new URLSearchParams('?question=테스트&cards=0,15,42');
    const result = parseUrlParams(params);

    expect(result).toBe(null);
  });

  it('카드 ID가 78을 초과하면 null을 반환해야 함', () => {
    const params = new URLSearchParams('?question=테스트&cards=1,15,79');
    const result = parseUrlParams(params);

    expect(result).toBe(null);
  });

  it('숫자가 아닌 카드 ID가 있으면 null을 반환해야 함', () => {
    const params = new URLSearchParams('?question=테스트&cards=1,abc,42');
    const result = parseUrlParams(params);

    expect(result).toBe(null);
  });
});

describe('createUrlParams', () => {
  it('타로 요청 데이터를 URL 파라미터로 변환해야 함', () => {
    const data = {
      question: '나의 미래는 어떨까요',
      selectedCards: [1, 15, 42]
    };

    const result = createUrlParams(data);

    expect(result).toBe('question=%EB%82%98%EC%9D%98+%EB%AF%B8%EB%9E%98%EB%8A%94+%EC%96%B4%EB%96%A8%EA%B9%8C%EC%9A%94&cards=1%2C15%2C42');

    // 파싱해서 다시 확인
    const params = new URLSearchParams(result);
    const parsed = parseUrlParams(params);
    expect(parsed).toEqual(data);
  });

  it('특수문자가 포함된 질문도 올바르게 인코딩해야 함', () => {
    const data = {
      question: '사랑, 직업 & 미래?',
      selectedCards: [7, 22, 56]
    };

    const result = createUrlParams(data);
    const params = new URLSearchParams(result);
    const parsed = parseUrlParams(params);

    expect(parsed).toEqual(data);
  });
});

describe('validateUrlParams', () => {
  it('유효한 파라미터는 성공 결과를 반환해야 함', () => {
    const params = new URLSearchParams('?question=나의%20미래는%20어떨까요&cards=1,15,42');
    const result = validateUrlParams(params);

    expect(result).toEqual({ isValid: true });
  });

  it('질문이 없으면 적절한 에러 메시지를 반환해야 함', () => {
    const params = new URLSearchParams('?cards=1,15,42');
    const result = validateUrlParams(params);

    expect(result).toEqual({
      isValid: false,
      error: '질문이 누락되었습니다.'
    });
  });

  it('카드가 없으면 적절한 에러 메시지를 반환해야 함', () => {
    const params = new URLSearchParams('?question=테스트');
    const result = validateUrlParams(params);

    expect(result).toEqual({
      isValid: false,
      error: '선택된 카드가 누락되었습니다.'
    });
  });

  it('빈 질문이면 적절한 에러 메시지를 반환해야 함', () => {
    const params = new URLSearchParams('?question=&cards=1,15,42');
    const result = validateUrlParams(params);

    expect(result).toEqual({
      isValid: false,
      error: '질문을 입력해주세요.'
    });
  });

  it('질문이 500자를 초과하면 적절한 에러 메시지를 반환해야 함', () => {
    const longQuestion = 'a'.repeat(501);
    const params = new URLSearchParams(`?question=${longQuestion}&cards=1,15,42`);
    const result = validateUrlParams(params);

    expect(result).toEqual({
      isValid: false,
      error: '질문은 500자 이하로 입력해주세요.'
    });
  });

  it('카드가 3장이 아니면 적절한 에러 메시지를 반환해야 함', () => {
    const params = new URLSearchParams('?question=테스트&cards=1,15');
    const result = validateUrlParams(params);

    expect(result).toEqual({
      isValid: false,
      error: '정확히 3장의 카드를 선택해주세요.'
    });
  });

  it('중복된 카드가 있으면 적절한 에러 메시지를 반환해야 함', () => {
    const params = new URLSearchParams('?question=테스트&cards=1,1,15');
    const result = validateUrlParams(params);

    expect(result).toEqual({
      isValid: false,
      error: '중복된 카드는 선택할 수 없습니다.'
    });
  });

  it('유효하지 않은 카드 ID가 있으면 적절한 에러 메시지를 반환해야 함', () => {
    const params = new URLSearchParams('?question=테스트&cards=0,15,42');
    const result = validateUrlParams(params);

    expect(result).toEqual({
      isValid: false,
      error: '카드 ID는 1-78 범위여야 합니다.'
    });
  });
});