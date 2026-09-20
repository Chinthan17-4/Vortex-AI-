import { useState } from 'react';
import VortexLogo from '../components/VortexLogo';

/**
 * Login — Frontend-only login page
 * @param {function} onNavigate - Navigate to another page
 * @param {function} onLogin - Simulate login (sets user data)
 */
function Login({ onNavigate, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only — just navigate to chat
    onLogin({
      name: email.split('@')[0] || 'User',
      email,
      plan: 'Free Plan',
    });
    onNavigate('chat');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <VortexLogo size={56} />
          <h1>VORTEX AI</h1>
          <span>Sign in to your workspace</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="login-email">Email</label>
            <div className="auth-input-wrap">
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <div className="auth-input-wrap">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              <button
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="auth-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <button
              className="forgot-link"
              onClick={() => onNavigate('forgot-password')}
              type="button"
            >
              Forgot password?
            </button>
          </div>

          <button className="auth-submit" type="submit">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          Don&apos;t have an account?{' '}
          <button onClick={() => onNavigate('signup')} type="button">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
