import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">TicketFlow</div>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <span>{menuOpen ? '✕' : '☰'}</span>
          </button>
          <div className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
            <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
            <Link to="/signup" className="nav-button" onClick={closeMenu}>Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            {/* Decorative Circles */}
            <div className="decorative-circle circle-1"></div>
            <div className="decorative-circle circle-2"></div>
            <div className="decorative-circle circle-3"></div>
            
            <h1 className="hero-title">Manage Your Tickets Effortlessly</h1>
            <p className="hero-description">
              Streamline your support workflow with our powerful ticket management system. 
              Track, organize, and resolve tickets faster than ever before.
            </p>
            
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">Get Started Free</Link>
              <Link to="/login" className="btn btn-secondary">Sign In</Link>
            </div>
          </div>
        </div>
        
        {/* Wave SVG */}
        <div className="wave-container">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,64 C240,20 480,20 720,64 C960,108 1200,108 1440,64 L1440,120 L0,120 Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose TicketFlow?</h2>
          
          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon">📊</div>
              <h3>Real-Time Dashboard</h3>
              <p>Monitor all your tickets at a glance with live statistics and insights.</p>
            </div>
            
            <div className="feature-box">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Create, update, and resolve tickets in seconds with our intuitive interface.</p>
            </div>
            
            <div className="feature-box">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your data is protected with enterprise-grade security measures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="decorative-circle circle-4"></div>
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of teams already using TicketFlow to manage their support tickets.</p>
            <Link to="/signup" className="btn btn-primary btn-large">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>TicketFlow</h3>
              <p>Efficient ticket management made simple.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#">Features</a>
                <a href="#">Pricing</a>
                <a href="#">Security</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Contact</a>
                <a href="#">Support</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 TicketFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;