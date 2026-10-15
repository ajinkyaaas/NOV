import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    login,
    loginDemo,
    signup,
    addToast
  } = useShop();

  const [mode, setMode] = useState(authModalMode || 'register'); // 'register' | 'login' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);

  // Sync mode whenever modal opens or authModalMode updates
  useEffect(() => {
    if (authModalMode) {
      setMode(authModalMode);
    }
  }, [authModalMode, isAuthModalOpen]);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      if (!email || !password) {
        addToast('Please enter both email and password.', 'error');
        return;
      }
      login(email, password);
    } else if (mode === 'register') {
      if (!name || !email || !password) {
        addToast('Please fill in all required fields.', 'error');
        return;
      }
      signup(name, email, password);
    } else if (mode === 'forgot') {
      if (!email) {
        addToast('Please enter your account email address.', 'error');
        return;
      }
      addToast(`Password recovery email sent to ${email}!`, 'success');
      setMode('login');
    }
  };

  const handleSocialLogin = (provider) => {
    login(`${provider.toLowerCase()}.user@novacommerce.com`, 'password123');
    addToast(`Successfully authenticated via ${provider}!`, 'success');
  };

  return (
    <div className="modal-overlay" onClick={closeAuthModal}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '2.5rem 2rem',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={17} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              margin: '0 auto 0.75rem auto',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            <Sparkles size={22} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.35rem' }}>
            {mode === 'register' ? 'Join NovaCommerce' : mode === 'login' ? 'Welcome Back' : 'Reset Password'}
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {mode === 'register'
              ? 'Create your free account and receive a 15% VIP welcome reward'
              : mode === 'login'
              ? 'Access your private concierge, order history & saved wishlists'
              : 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        {/* 1-Click Quick Demo Login Button */}
        {mode !== 'forgot' && (
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              onClick={() => loginDemo('Alex Morgan')}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: '#fbbf24',
                fontSize: '0.88rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <Sparkles size={16} />
              <span>⚡ 1-Click Demo Login (Alex Morgan)</span>
            </button>
          </div>
        )}

        {/* Tabs for Sign Up / Sign In */}
        {mode !== 'forgot' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              background: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              padding: '4px',
              marginBottom: '1.5rem',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <button
              onClick={() => setMode('register')}
              style={{
                padding: '0.6rem',
                borderRadius: 'var(--radius-sm)',
                background: mode === 'register' ? 'var(--bg-card-hover)' : 'transparent',
                color: mode === 'register' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: mode === 'register' ? 700 : 500,
                fontSize: '0.88rem',
                border: mode === 'register' ? '1px solid var(--border-medium)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Sign Up
            </button>
            <button
              onClick={() => setMode('login')}
              style={{
                padding: '0.6rem',
                borderRadius: 'var(--radius-sm)',
                background: mode === 'login' ? 'var(--bg-card-hover)' : 'transparent',
                color: mode === 'login' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: mode === 'login' ? 700 : 500,
                fontSize: '0.88rem',
                border: mode === 'login' ? '1px solid var(--border-medium)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="e.g. Jordan Hayes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                required
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: '15px', height: '15px', accentColor: 'var(--accent-primary)' }}
                />
                <span>Remember me on this browser</span>
              </label>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', marginBottom: '0.85rem' }}
          >
            <span>
              {mode === 'register' ? 'Create Free Account' : mode === 'login' ? 'Sign In to Account' : 'Send Recovery Link'}
            </span>
            <ArrowRight size={17} />
          </button>

          {mode === 'register' && (
            <div style={{ textAlign: 'center', marginBottom: '0.85rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                Sign In here
              </button>
            </div>
          )}

          {mode === 'login' && (
            <div style={{ textAlign: 'center', marginBottom: '0.85rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                Sign Up for free
              </button>
            </div>
          )}
        </form>

        {mode === 'forgot' && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setMode('login')}
              style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Back to Sign In
            </button>
          </div>
        )}

        {/* Social Authentication Options */}
        {mode !== 'forgot' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1rem 0', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <span>OR CONTINUE WITH</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
              {['Google', 'Apple', 'GitHub'].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  onClick={() => handleSocialLogin(provider)}
                  style={{
                    padding: '0.6rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-medium)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  {provider}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
