import { useState } from 'react';

/**
 * Settings — Full settings page with sectioned layout
 * All settings use local frontend state only
 */
function Settings({
  onNavigate,
  onToggleSidebar,
  theme,
  onThemeChange,
  onClearHistory,
  soundEnabled,
  onSoundChange,
}) {
  const [settings, setSettings] = useState({
    language: 'en',
    enterToSend: true,
    autoScroll: true,
    saveHistory: true,
    showTimestamps: true,
    responseStyle: 'balanced',
    emailNotifications: false,
  });

  const [clearConfirm, setClearConfirm] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <main className="chat-main">
      <header className="page-header">
        <button
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          type="button"
          aria-label="Open menu"
          style={{ display: 'none' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <button className="page-back-btn" onClick={() => onNavigate('chat')} type="button" aria-label="Back to chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1>Settings</h1>
      </header>

      <div className="settings-page">
        {/* General */}
        <section className="settings-section">
          <h3 className="settings-section-title">General</h3>

          <div className="settings-row">
            <div className="settings-label">
              <span>Language</span>
              <p>Select your preferred language</p>
            </div>
            <select
              className="settings-select"
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="kan">Kannada</option>
              <option value="tn">Tamil</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div className="settings-row">
            <div className="settings-label">
              <span>Enter to send</span>
              <p>Press Enter to send messages, Shift+Enter for new line</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => onSoundChange(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="settings-row">
            <div className="settings-label">
              <span>Auto-scroll</span>
              <p>Automatically scroll to new messages</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.autoScroll}
                onChange={(e) => updateSetting('autoScroll', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </section>

        {/* Appearance */}
        <section className="settings-section">
          <h3 className="settings-section-title">Appearance</h3>

          <div className="settings-row">
            <div className="settings-label">
              <span>Theme</span>
              <p>Choose your preferred visual theme</p>
            </div>
            <select
              className="settings-select"
              value={theme}
              onChange={(e) => onThemeChange(e.target.value)}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </section>

        {/* Chat */}
        <section className="settings-section">
          <h3 className="settings-section-title">Chat</h3>

          <div className="settings-row">
            <div className="settings-label">
              <span>Save chat history</span>
              <p>Keep conversation history for later reference</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.saveHistory}
                onChange={(e) => updateSetting('saveHistory', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="settings-row">
            <div className="settings-label">
              <span>Show timestamps</span>
              <p>Display time below each message</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.showTimestamps}
                onChange={(e) => updateSetting('showTimestamps', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="settings-row">
            <div className="settings-label">
              <span>Response style</span>
              <p>How detailed should Vortex responses be</p>
            </div>
            <select
              className="settings-select"
              value={settings.responseStyle}
              onChange={(e) => updateSetting('responseStyle', e.target.value)}
            >
              <option value="concise">Concise</option>
              <option value="balanced">Balanced</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>
        </section>

        {/* Notifications */}
        <section className="settings-section">
          <h3 className="settings-section-title">Notifications</h3>

          <div className="settings-row">
            <div className="settings-label">
              <span>Email notifications</span>
              <p>Receive updates and news via email</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="settings-row">
            <div className="settings-label">
              <span>Sound</span>
              <p>Play a sound for new messages</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => updateSetting('soundEnabled', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </section>

        {/* Privacy */}
        <section className="settings-section">
          <h3 className="settings-section-title">Privacy</h3>

          <div className="settings-row">
            <div className="settings-label">
              <span>Conversation data</span>
              <p>Your conversations are stored locally in the browser</p>
            </div>
          </div>

          <div className="settings-row">
            <div className="settings-label">
              <span>Clear all chats</span>
              <p>Permanently delete all conversation history</p>
            </div>
            {clearConfirm ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="settings-btn danger"
                  onClick={() => {
                    onClearHistory();
                    setClearConfirm(false);
                  }}
                  type="button"
                >
                  Confirm
                </button>
                <button className="settings-btn" onClick={() => setClearConfirm(false)} type="button">
                  Cancel
                </button>
              </div>
            ) : (
              <button className="settings-btn danger" onClick={() => setClearConfirm(true)} type="button">
                Clear History
              </button>
            )}
          </div>
        </section>

        {/* About */}
        <section className="settings-section">
          <h3 className="settings-section-title">About</h3>
          <div className="settings-version">
            <strong>Vortex AI</strong><br />
            Version 1.0.0<br />
            Built with React + Vite<br />
            © 2026 Vortex AI
          </div>
        </section>
      </div>
    </main>
  );
}

export default Settings;
