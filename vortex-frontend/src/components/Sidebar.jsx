import { useState } from 'react';
import VortexLogo from './VortexLogo';
import UserProfile from './UserProfile';
import SearchDialog from './SearchDialog';

/**
 * Sidebar — Navigation, chat history, search, and user profile
 */
function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onNavigate,
  currentPage,
  user,
  sidebarOpen,
  onCloseSidebar,
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  // Group chats by their group label
  const groups = {};
  chats.forEach((chat) => {
    const label = chat.group || 'Conversations';
    if (!groups[label]) groups[label] = [];
    groups[label].push(chat);
  });

  const handleNavClick = (page) => {
    onNavigate(page);
    onCloseSidebar();
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={onCloseSidebar} />
      )}

      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand">
              <div className="brand-logo-wrap">
                <VortexLogo size={30} />
              </div>
              <div className="brand-text">
                <h2>VORTEX</h2>
                <span>AI Workspace</span>
              </div>
            </div>

            <div className="sidebar-actions">
              <button
                className="sidebar-icon-btn"
                onClick={() => setSearchOpen(true)}
                type="button"
                aria-label="Search chats"
                title="Search (Ctrl+K)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
          </div>

          <button
            className="new-chat-btn"
            onClick={() => { onNewChat(); onCloseSidebar(); }}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Chat
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <button
            className={`sidebar-nav-item${currentPage === 'chat' ? ' active' : ''}`}
            onClick={() => handleNavClick('chat')}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Chat
          </button>
          <button
            className={`sidebar-nav-item${currentPage === 'settings' ? ' active' : ''}`}
            onClick={() => handleNavClick('settings')}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            Settings
          </button>
        </nav>

        {/* Chat History */}
        <div className="chat-history">
          {Object.entries(groups).map(([label, items]) => (
            <div className="chat-history-group" key={label}>
              <div className="chat-history-label">
                <span>{label}</span>
                <button type="button" aria-label="Toggle group">⌄</button>
              </div>
              {items.map((chat) => (
                <div
                  key={chat.id}
                  className={`chat-item${chat.id === activeChatId ? ' active' : ''}`}
                  onClick={() => { onSelectChat(chat.id); onCloseSidebar(); }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') { onSelectChat(chat.id); onCloseSidebar(); } }}
                >
                  <span className="chat-item-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {chat.title}
                  </span>
                  <button className="chat-item-menu" type="button" aria-label="Chat options" onClick={(e) => e.stopPropagation()}>
                    ⋯
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Upgrade Card */}
        <div className="upgrade-card">
          <div className="upgrade-card-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>Upgrade to Pro</span>
          </div>
          <p>Get premium features, latest models, unlimited usage and more.</p>
          <button className="upgrade-btn" onClick={() => handleNavClick('usage')} type="button">
            ↗ Upgrade to Pro
          </button>
        </div>

        {/* User Profile */}
        <UserProfile user={user} onNavigate={handleNavClick} />
      </aside>

      {/* Search Dialog */}
      {searchOpen && (
        <SearchDialog
          chats={chats}
          onSelect={(id) => { onSelectChat(id); onCloseSidebar(); }}
          onClose={() => setSearchOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;