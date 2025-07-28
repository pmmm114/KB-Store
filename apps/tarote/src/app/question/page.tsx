'use client';
import styles from './page.module.css';
import { useRef, useState } from 'react';

/**
 * 질문 입력 페이지
 *
 * TODO:
 * 1. contentEditable 기능개선 필요
 * 2. 질문 제출 로직
 * 3. client page 분리 작업
 * 4. content state 관리 개선필요
 */
export default function QuestionPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [question, setQuestion] = useState('');

  const _isDisabledQuestionSubmitButton = !question.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // form의 기본 동작(페이지 이동) 방지

    if (_isDisabledQuestionSubmitButton) return;

    // TODO: 질문 제출
    console.log('질문 제출:', question);

    // 여기서 원하는 로직 실행
    // 예: API 호출, 상태 업데이트, 다른 페이지로 이동 등
  };

  const handleContentEditableChange = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.textContent || '';

    setQuestion(content);
    if (content.trim() === '') {
      e.currentTarget.innerHTML = '';
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    // 순수 텍스트만 추출
    const text = e.clipboardData.getData('text/plain');

    // 기존 텍스트와 붙여넣기 텍스트를 합쳐서 하나의 TextNode로 관리
    const target = e.currentTarget;
    const existingText = target.textContent || '';

    // 커서 위치 계산
    const selection = window.getSelection();
    let cursorPosition = existingText.length; // 기본값: 텍스트 끝

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(target);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      cursorPosition = preCaretRange.toString().length;
    }

    // 새로운 텍스트 생성 (기존 텍스트 + 붙여넣기 텍스트)
    const newText =
      existingText.slice(0, cursorPosition) +
      text +
      existingText.slice(cursorPosition);

    // 모든 기존 노드 삭제하고 하나의 새로운 TextNode 생성
    target.innerHTML = '';
    const newTextNode = document.createTextNode(newText);
    target.appendChild(newTextNode);

    // 커서를 붙여넣기된 텍스트 뒤로 이동
    const newRange = document.createRange();
    const newSelection = window.getSelection();
    newRange.setStart(newTextNode, cursorPosition + text.length);
    newRange.setEnd(newTextNode, cursorPosition + text.length);
    newSelection?.removeAllRanges();
    newSelection?.addRange(newRange);

    // 상태 업데이트
    setQuestion(newText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Enter 키 동작 완전 차단
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  return (
    <main className={styles.questionPage}>
      <form
        ref={formRef}
        className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 py-16"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          타로에게 물어보세요
        </h1>
        <div
          className={`${styles.contentEditableInput} max-h-32 w-full resize-none overflow-y-auto rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg focus:ring-2 focus:ring-blue-200 focus:outline-none`}
          contentEditable
          onInput={handleContentEditableChange}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          suppressContentEditableWarning
          data-placeholder={question.trim() === '' ? '질문을 입력하세요.' : ''}
          style={{ minHeight: '48px' }}
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={_isDisabledQuestionSubmitButton}
        >
          다음
        </button>
      </form>
    </main>
  );
}
