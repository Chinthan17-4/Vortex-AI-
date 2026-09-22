import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import VortexLogo from '../components/VortexLogo';
import app from '../firebase';

function ForgotPassword({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const auth = getAuth(app);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (error) {
      console.error('Password reset failed:', error);
      alert('Unable to send reset email. Please check the email address.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <VortexLogo size={56} />
          <h1>VORTEX AI</h1>
          <span>Reset your password</span>
        </div>

        {sent ? (
          <div className="auth-success">
            <div className="auth-success-icon">✓</div>
            <h3>Check your email</h3>
            <p>
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </p>

            <button
              className="auth-submit"
              onClick={() => onNavigate('login')}
              type="button"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <p
              style={{
                fontSize: 'var(--font-sm)',
                color: 'var(--text-muted)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              Enter the email address associated with your account and we&apos;ll
              send you a link to reset your password.
            </p>

            <div className="auth-field">
              <label htmlFor="reset-email">Email</label>

              <div className="auth-input-wrap">
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <button className="auth-submit" type="submit">
              Send Reset Link
            </button>
          </form>
        )}

        <div className="auth-footer">
          Remember your password?{' '}
          <button
            onClick={() => onNavigate('login')}
            type="button"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;