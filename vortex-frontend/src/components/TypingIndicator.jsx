import VortexLogo from './VortexLogo';

/**
 * TypingIndicator — Animated dots shown when assistant is "thinking"
 */
function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <div className="message-avatar">
        <VortexLogo size={20} />
      </div>
      <div className="typing-bubble">
        <div className="typing-dots">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
        <span className="typing-label">Vortex is thinking…</span>
      </div>
    </div>
  );
}

export default TypingIndicator;
