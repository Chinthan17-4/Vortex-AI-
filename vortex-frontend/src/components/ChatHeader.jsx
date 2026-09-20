import ModelSelector from './ModelSelector';

/**
 * ChatHeader — Top bar with title, status, model selector, and mobile menu
 * @param {function} onToggleSidebar - Toggle mobile sidebar
 * @param {string} selectedModel - Current model id
 * @param {function} onSelectModel - Model selection callback
 */
function ChatHeader({ onToggleSidebar, selectedModel, onSelectModel }) {
  return (
    <header className="chat-header">
      <div className="chat-header-left">
        <button
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          type="button"
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="chat-header-title">
          <h1>Vortex</h1>
          <div className="chat-header-status">
            <span className="status-dot" />
            <span>Online</span>
          </div>
        </div>
      </div>

      <div className="chat-header-right">
        <ModelSelector
          selectedModel={selectedModel}
          onSelect={onSelectModel}
        />
      </div>
    </header>
  );
}

export default ChatHeader;
