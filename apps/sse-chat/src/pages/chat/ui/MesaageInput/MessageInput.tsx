import { useState, KeyboardEvent } from 'react';

interface Props {
  onSend: (content: string) => void;
  /**
   * 서버로부터 스트리밍 응답을 수신 중인지 여부
   * true 이면 입력이 비활성화되고 상태 텍스트가 바뀝니다.
   */
  streaming?: boolean;
}

function MessageInput({ onSend, streaming = false }: Props) {
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={streaming || !input.trim()}
          className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          전송
        </button>
      </div>

      {/* 연결 상태 표시 */}
      <div
        role="status"
        aria-live="polite"
        aria-busy={streaming}
        className="mt-2 text-sm text-gray-500"
      >
        {streaming ? '🟢 응답 받는 중...' : '🔴 대기 중'}
      </div>
    </div>
  );
}

export default MessageInput;
