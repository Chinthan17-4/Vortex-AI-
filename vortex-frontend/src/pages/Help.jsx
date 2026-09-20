import { useState } from 'react';
import VortexLogo from '../components/VortexLogo';

/**
 * Help — Help & About page with FAQ accordion
 */
function Help({ onNavigate, onToggleSidebar }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'What is Vortex AI?',
      a: 'Vortex AI is an intelligent AI workspace designed to help you with coding, writing, brainstorming, and everyday tasks. It combines a clean interface with powerful AI models.',
    },
    {
      q: 'Is my data private?',
      a: 'Your conversations are currently stored locally in your browser. We do not send data to third-party services. Future versions will include encrypted cloud storage options.',
    },
    {
      q: 'What models are available?',
      a: 'Vortex AI offers three model tiers: Vortex Fast for quick everyday tasks, Vortex Smart for balanced intelligence and speed, and Vortex Pro for maximum capability on complex tasks.',
    },
    {
      q: 'How do I upgrade my plan?',
      a: 'You can view available plans and upgrade from the Plan & Usage section in your sidebar menu or settings. Pro plans unlock unlimited messages and all model tiers.',
    },
    {
      q: 'Can I use Vortex for coding?',
      a: 'Yes! Vortex is designed to help with code writing, debugging, code review, and technical explanations. Code blocks are rendered with syntax highlighting and a copy button.',
    },
  ];

  return (
    <main className="chat-main">
      <header className="page-header">
        <button className="page-back-btn" onClick={() => onNavigate('chat')} type="button" aria-label="Back to chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1>Help</h1>
      </header>

      <div className="help-page">
        {/* Getting Started */}
        <section className="help-section">
          <h2>Getting Started</h2>
          <p>
            Welcome to Vortex AI! Start a conversation by typing your message in the composer at the bottom of the chat window.
            You can ask questions, get help with code, brainstorm ideas, or just have a conversation.
          </p>
          <p>
            Use the suggestion cards on the welcome screen to quickly start common tasks.
            Your chat history is saved in the sidebar for easy access.
          </p>
        </section>

        {/* How Vortex Works */}
        <section className="help-section">
          <h2>How Vortex Works</h2>
          <p>
            Vortex AI processes your messages through an intelligent response engine.
            Select the model that best fits your task — from quick answers with Vortex Fast to deep analysis with Vortex Pro.
          </p>
          <p>
            The workspace is designed to feel like a professional tool.
            Use keyboard shortcuts, manage multiple conversations, and customize your experience through settings.
          </p>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="help-section">
          <h2>Keyboard Shortcuts</h2>
          <table className="shortcuts-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Shortcut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Send message</td>
                <td><kbd>Enter</kbd></td>
              </tr>
              <tr>
                <td>New line in message</td>
                <td><kbd>Shift</kbd> + <kbd>Enter</kbd></td>
              </tr>
              <tr>
                <td>Search conversations</td>
                <td><kbd>Ctrl</kbd> + <kbd>K</kbd></td>
              </tr>
              <tr>
                <td>New chat</td>
                <td><kbd>Ctrl</kbd> + <kbd>N</kbd></td>
              </tr>
              <tr>
                <td>Close dialog</td>
                <td><kbd>Esc</kbd></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* FAQ */}
        <section className="help-section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i}>
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                type="button"
              >
                {faq.q}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="faq-answer">{faq.a}</div>
            </div>
          ))}
        </section>

        {/* About */}
        <section className="help-section">
          <h2>About Vortex</h2>
          <div className="about-card">
            <VortexLogo size={48} />
            <h3>Vortex AI</h3>
            <p>Version 1.0.0</p>
            <p>An intelligent AI workspace built with React.</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-xs)' }}>
              © 2026 Vortex AI — All rights reserved
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Help;
