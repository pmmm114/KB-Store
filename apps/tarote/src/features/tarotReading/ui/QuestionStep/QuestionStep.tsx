'use client';

import { useState, useEffect } from 'react';
import { useTarotReading } from '../../model';
import styles from './QuestionStep.module.css';

interface QuestionStepProps {
  onNextAction: () => void;
}

export const QuestionStep = ({ onNextAction }: QuestionStepProps) => {
  const { question, setQuestion } = useTarotReading();
  const [localQuestion, setLocalQuestion] = useState(question);

  const isDisabled = !localQuestion.trim();
  const characterCount = localQuestion.length;
  const maxLength = 500;

  useEffect(() => {
    setLocalQuestion(question);
  }, [question]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isDisabled || characterCount > maxLength) return;

    setQuestion(localQuestion);
    onNextAction();
  };

  const handleContentEditableChange = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.textContent || '';

    if (content.length <= maxLength) {
      setLocalQuestion(content);
    }

    if (content.trim() === '') {
      e.currentTarget.innerHTML = '';
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    const text = e.clipboardData.getData('text/plain');
    const target = e.currentTarget;
    const existingText = target.textContent || '';

    const selection = window.getSelection();
    let cursorPosition = existingText.length;

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(target);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      cursorPosition = preCaretRange.toString().length;
    }

    const newText =
      existingText.slice(0, cursorPosition) +
      text +
      existingText.slice(cursorPosition);

    // 글자 수 제한 확인
    if (newText.length > maxLength) {
      return;
    }

    target.innerHTML = '';
    const newTextNode = document.createTextNode(newText);
    target.appendChild(newTextNode);

    const newRange = document.createRange();
    const newSelection = window.getSelection();
    newRange.setStart(newTextNode, cursorPosition + text.length);
    newRange.setEnd(newTextNode, cursorPosition + text.length);
    newSelection?.removeAllRanges();
    newSelection?.addRange(newRange);

    setLocalQuestion(newText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      if (!isDisabled && characterCount <= maxLength) {
        handleSubmit(
          e as React.KeyboardEvent<HTMLDivElement> & React.FormEvent,
        );
      }
      return;
    }
  };

  return (
    <div className={styles.questionStep}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>타로에게 물어보세요</h1>

        <div className={styles.inputContainer}>
          <div
            className={styles.contentEditableInput}
            contentEditable
            onInput={handleContentEditableChange}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            suppressContentEditableWarning
            data-placeholder={
              localQuestion.trim() === ''
                ? '질문을 입력하세요. (Shift+Enter로 줄바꿈)'
                : ''
            }
          />

          <div className={styles.characterCount}>
            <span
              className={characterCount > maxLength ? styles.overLimit : ''}
            >
              {characterCount}/{maxLength}
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.nextButton}
            disabled={isDisabled || characterCount > maxLength}
          >
            카드 선택하기
          </button>
        </div>
      </form>
    </div>
  );
};
