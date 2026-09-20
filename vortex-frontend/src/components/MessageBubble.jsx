import { useState } from 'react';
import VortexLogo from './VortexLogo';

/**
 * MessageBubble — Renders a single user or assistant message
 * @param {object} message - { id, role: 'user'|'assistant', content, timestamp, codeBlock? }
 * @param {string} userInitial - First letter of user's name
 */
function MessageBubble({ message, userInitial = 'U' }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyCode = () => {
    if (message.codeBlock) {
      navigator.clipboard.writeText(message.codeBlock.code);
    }
  };

  const formatTime = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message ${message.role}`}>
      <div className="message-avatar">
        {isUser ? (
          <span>{userInitial}</span>
        ) : (
          <VortexLogo size={20} />
        )}
      </div>

      <div className="message-content">
        <div className="message-bubble">
          <p>{message.content}</p>

          {message.codeBlock && (
            <div className="message-code">
              <div className="message-code-header">
                <span className="message-code-lang">{message.codeBlock.language}</span>
                <button
                  className="message-code-copy"
                  onClick={handleCopyCode}
                  type="button"
                  aria-label="Copy code"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </button>
              </div>
              <pre>{message.codeBlock.code}</pre>
            </div>
          )}
        </div>

        <div className="message-timestamp">{formatTime(message.timestamp)}</div>

        <div className="message-actions">
          <button
            className="message-action-btn"
            onClick={handleCopy}
            type="button"
            aria-label="Copy message"
            title={copied ? 'Copied!' : 'Copy'}
          >
            {copied ? '✓' : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
