import { useState, useEffect, useRef } from 'react';

/**
 * SearchDialog — Search overlay for chat history
 * @param {Array} chats - All chat objects for searching
 * @param {function} onSelect - Callback when a chat is selected
 * @param {function} onClose - Close the dialog
 */
function SearchDialog({ chats = [], onSelect, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const filtered = query.trim()
    ? chats.filter((c) =>
        c.title.toLowerCase().includes(query.toLowerCase())
      )
    : chats;

  return (
    <div className="search-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="search-dialog" role="dialog" aria-label="Search chats">
        <div className="search-input-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations…"
            aria-label="Search conversations"
          />
        </div>

        <div className="search-results">
          {filtered.length > 0 ? (
            filtered.map((chat) => (
              <button
                key={chat.id}
                className="search-result-item"
                onClick={() => {
                  onSelect(chat.id);
                  onClose();
                }}
                type="button"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="search-result-title">{chat.title}</span>
                <span className="search-result-date">{chat.group}</span>
              </button>
            ))
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--font-sm)' }}>
              No conversations found
            </div>
          )}
        </div>

        <div className="search-hint">
          Press <kbd>Esc</kbd> to close
        </div>
      </div>
    </div>
  );
}

export default SearchDialog;
