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

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Get users from localStorage
    const usersJSON = localStorage.getItem('ticketapp_users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    // Check if users exist
    if (users.length === 0) {
      setError('No account found. Please sign up first.');
      return;
    }

    // Find user by email
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    // Check password
    if (user.password !== password) {
      setError('Invalid email or password');
      return;
    }

    // Login successful - create session
    const token = 'token_' + user.id + '_' + Date.now();
    localStorage.setItem('ticketapp_session', token);
    localStorage.setItem('ticketapp_current_user', JSON.stringify(user));

    // Redirect to dashboard
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