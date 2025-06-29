import clsx from 'clsx';
import { ChatMessage } from '../../../../entities/message/model/types';

interface Props {
  messages: ChatMessage[];
}

function MessageList({ messages }: Props) {
  return (
    <div className="mb-4 flex-1 space-y-4 overflow-y-auto">
      {messages?.map((msg) => (
        <div
          key={msg.id}
          className={clsx(
            'rounded-lg p-4',
            msg.role === 'user'
              ? 'ml-auto max-w-3xl bg-blue-100'
              : 'mr-auto max-w-3xl bg-gray-100',
          )}
          data-message-author-role={msg.role}
        >
          <div>{msg.role === 'user' ? '사용자' : 'Assistant'}</div>
          <div>{msg.content}</div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
