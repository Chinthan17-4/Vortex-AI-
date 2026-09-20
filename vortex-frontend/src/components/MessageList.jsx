import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

/**
 * MessageList — Scrollable container for conversation messages
 * @param {Array} messages - Array of message objects
 * @param {boolean} isTyping - Whether to show typing indicator
 * @param {string} userInitial - First letter of user's name
 */
function MessageList({ messages = [], isTyping = false, userInitial = 'U' }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          userInitial={userInitial}
        />
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
