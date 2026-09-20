/**
 * Usage — Frontend-only Plan & Usage page
 * All values are hardcoded placeholders
 */
function Usage({ onNavigate, onToggleSidebar }) {
  return (
    <main className="chat-main">
      <header className="page-header">
        <button className="page-back-btn" onClick={() => onNavigate('chat')} type="button" aria-label="Back to chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1>Plan &amp; Usage</h1>
      </header>

      <div className="usage-page">
        {/* Current Plan */}
        <div className="usage-current-plan">
          <div className="usage-plan-info">
            <h3>Current Plan</h3>
            <span className="usage-plan-badge">Free</span>
            <p>You&apos;re on the free plan. Upgrade to unlock more features and higher limits.</p>
          </div>
          <button className="upgrade-btn" type="button">
            ↗ Upgrade to Pro
          </button>
        </div>

        {/* Usage Meters */}
        <div className="usage-meters">
          <div className="usage-meter">
            <div className="usage-meter-header">
              <span className="usage-meter-label">Messages</span>
              <span className="usage-meter-value">42 / 100 this month</span>
            </div>
            <div className="usage-meter-bar">
              <div className="usage-meter-fill" style={{ width: '42%' }} />
            </div>
          </div>

          <div className="usage-meter">
            <div className="usage-meter-header">
              <span className="usage-meter-label">Storage</span>
              <span className="usage-meter-value">1.2 MB / 50 MB</span>
            </div>
            <div className="usage-meter-bar">
              <div className="usage-meter-fill" style={{ width: '2.4%' }} />
            </div>
          </div>

          <div className="usage-meter">
            <div className="usage-meter-header">
              <span className="usage-meter-label">Document uploads</span>
              <span className="usage-meter-value">0 / 5</span>
            </div>
            <div className="usage-meter-bar">
              <div className="usage-meter-fill" style={{ width: '0%' }} />
            </div>
          </div>
        </div>

        {/* Plan Comparison */}
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, marginBottom: 'var(--space-xl)' }}>Compare Plans</h2>
        <div className="usage-plans">
          {/* Free */}
          <div className="plan-card">
            <div className="plan-card-name">Free</div>
            <div className="plan-card-price">$0<span>/month</span></div>
            <div className="plan-card-desc">Get started with Vortex AI</div>
            <ul className="plan-features">
              <li>100 messages/month</li>
              <li>Vortex Fast model</li>
              <li>50 MB storage</li>
              <li>5 document uploads</li>
              <li>Basic support</li>
            </ul>
            <button className="plan-btn current" type="button">Current Plan</button>
          </div>

          {/* Pro */}
          <div className="plan-card featured">
            <div className="plan-card-name">Pro</div>
            <div className="plan-card-price">$20<span>/month</span></div>
            <div className="plan-card-desc">For power users and professionals</div>
            <ul className="plan-features">
              <li>Unlimited messages</li>
              <li>All models (Fast, Smart, Pro)</li>
              <li>5 GB storage</li>
              <li>Unlimited uploads</li>
              <li>Priority support</li>
              <li>Advanced analytics</li>
            </ul>
            <button className="plan-btn primary" type="button">Upgrade to Pro</button>
          </div>

          {/* Enterprise */}
          <div className="plan-card">
            <div className="plan-card-name">Enterprise</div>
            <div className="plan-card-price">Custom</div>
            <div className="plan-card-desc">For teams and organizations</div>
            <ul className="plan-features">
              <li>Everything in Pro</li>
              <li>Custom model fine-tuning</li>
              <li>Unlimited storage</li>
              <li>SSO &amp; team management</li>
              <li>Dedicated support</li>
              <li>SLA guarantee</li>
            </ul>
            <button className="plan-btn outline" type="button">Contact Sales</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Usage;
