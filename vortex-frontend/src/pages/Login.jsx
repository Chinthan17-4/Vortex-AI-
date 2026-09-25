import { useState } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  GithubAuthProvider,
} from 'firebase/auth';
import VortexLogo from '../components/VortexLogo';
import app from '../firebase';

function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onNavigate('chat');
    } catch (error) {
      console.error('Google sign-in failed:', error);
      alert(error.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();

      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("GitHub sign-in failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      onNavigate('chat');
    } catch (error) {
      console.error('Email sign-in failed:', error.code, error.message);
      alert(`${error.code}: ${error.message}`);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo / Heading */}
        <div className="auth-logo">
          <VortexLogo size={56} />
          <h1>VORTEX AI</h1>
          <span>Sign in to your workspace</span>
        </div>

        {/* Google Sign In */}
        {/* Google Sign In */}
        <button
          className="google-auth-button"
          type="button"
          onClick={handleGoogleLogin}
        >
          <svg
            className="google-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.39Z"
            />
            <path
              fill="#34A853"
              d="M12 21.99c2.63 0 4.84-.87 6.45-2.37l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.51A9.74 9.74 0 0 0 12 21.99Z"
            />
            <path
              fill="#FBBC05"
              d="M6.54 14.08A5.85 5.85 0 0 1 6.23 12c0-.72.12-1.42.31-2.08V7.41H3.3A9.99 9.99 0 0 0 2.25 12c0 1.66.4 3.23 1.05 4.59l3.24-2.51Z"
            />
            <path
              fill="#EA4335"
              d="M12 5.89c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.83 2.99 14.63 2 12 2a9.74 9.74 0 0 0-8.7 5.41l3.24 2.51C7.31 7.61 9.46 5.89 12 5.89Z"
            />
          </svg>

          <span className="google-label">Continue with Google</span>
        </button>
        {/* Divider */}
        <button
          className="github-login-btn"
          onClick={handleGithubLogin}
          type="button"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.58 2.35 1.12 2.93.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.3.1-2.71 0 0 .83-.27 2.75 1.05A9.1 9.1 0 0 1 12 7.85c.85 0 1.71.12 2.51.35 1.92-1.32 2.75-1.05 2.75-1.05.54 1.41.2 2.45.1 2.71.63.72 1.02 1.63 1.02 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.48A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
          </svg>
          Continue with GitHub
        </button>
        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* Email / Password */}
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
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Options */}
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

          {/* Email Sign In */}
          <button
            className="auth-submit"
            type="submit"
          >
            Sign In
          </button>

        </form>

        {/* Signup */}
        <div className="auth-footer">
          Don&apos;t have an account?{' '}

          <button
            onClick={() => onNavigate('signup')}
            type="button"
          >
            Sign up
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;