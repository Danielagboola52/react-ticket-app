import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const token = 'demo_token_' + Date.now();
    localStorage.setItem('ticketapp_session', token);
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-box">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Sign In
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account?{' '}
            <Link to="/signup" className="link">Sign up</Link>
          </p>

          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;