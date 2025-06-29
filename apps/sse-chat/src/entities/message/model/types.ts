import { ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  /**
   * 메시지 내용
   * 문자열, React 요소, 멀티미디어 컴포넌트 등 다양하게 올 수 있다.
   */
  content: ReactNode;
}
