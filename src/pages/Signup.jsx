import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate inputs
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Get existing users from localStorage
    const usersJSON = localStorage.getItem('ticketapp_users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    // Check if email already exists
    const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (emailExists) {
      setError('An account with this email already exists. Please login instead.');
      return;
    }

    // Create new user object
    const newUser = {
      id: 'user_' + Date.now(),
      name: name,
      email: email.toLowerCase(),
      password: password, // In production, this should be hashed!
      createdAt: new Date().toISOString()
    };

    // Add new user to users array
    users.push(newUser);

    // Save updated users array to localStorage
    localStorage.setItem('ticketapp_users', JSON.stringify(users));

    // Create session for the new user
    const token = 'token_' + newUser.id + '_' + Date.now();
    localStorage.setItem('ticketapp_session', token);
    localStorage.setItem('ticketapp_current_user', JSON.stringify(newUser));

    setSuccess('Account created successfully! Redirecting...');

    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-box">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join TicketFlow today</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

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
                placeholder="Create a password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Create Account
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="link">Sign in</Link>
          </p>

          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;