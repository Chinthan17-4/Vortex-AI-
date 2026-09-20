import { useState, useRef, useEffect } from 'react';

/**
 * ChatComposer — Premium AI input workspace
 * @param {function} onSend - Callback with message text
 * @param {string} selectedModel - Current model name for display
 * @param {string} initialValue - Pre-fill the composer (e.g. from suggestion card)
 * @param {function} onClearInitial - Clear the initial value after using it
 */
function ChatComposer({ onSend, selectedModel = 'Vortex Fast', initialValue = '', onClearInitial }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  // Handle initial value from suggestion cards
  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
      onClearInitial?.();
      textareaRef.current?.focus();
    }
  }, [initialValue, onClearInitial]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="composer-wrapper">
      <div className="chat-composer">
        <div className="composer-input-area">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Vortex anything…"
            rows={1}
            aria-label="Message input"
          />
        </div>

        <div className="composer-toolbar">
          <div className="composer-tools">
            {/* Attachment */}
            <button className="composer-tool-btn" type="button" aria-label="Attach file" title="Attach file">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>

            {/* Microphone */}
            <button className="composer-tool-btn" type="button" aria-label="Voice input" title="Voice input">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>
          </div>

          <div className="composer-right">
            <span className="composer-model-chip">
              <span className="model-dot" />
              {selectedModel}
            </span>

            <button
              className="send-btn"
              onClick={handleSend}
              disabled={!value.trim()}
              type="button"
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComposer;
