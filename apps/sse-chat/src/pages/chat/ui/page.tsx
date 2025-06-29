import { useState } from 'react';
import { ChatMessage } from '../../../entities/message/model/types';
import MessageInput from './MesaageInput/MessageInput';
import MessageList from './MessageList/MessageList';

export function Page() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = (content: string) => {
    if (!content.trim()) return;
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
    };
    // 임시로 즉시 assistant echo 생성
    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `Echo: ${content.trim()}`,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100">
      <main className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
        <MessageInput onSend={handleSend} />
      </main>
    </div>
  );
}
