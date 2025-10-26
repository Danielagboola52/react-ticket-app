import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [totalTickets, setTotalTickets] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);
  const [resolvedTickets, setResolvedTickets] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser();
    loadStats();
  }, []);

  const getCurrentUser = () => {
    const userJSON = localStorage.getItem('ticketapp_current_user');
    if (!userJSON) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userJSON);
    setCurrentUser(user);
    setUserName(user.name || 'User');
  };

  const getUserTicketsKey = (user) => {
    return `tickets_${user.id}`;
  };

  const loadStats = () => {
    const userJSON = localStorage.getItem('ticketapp_current_user');
    if (!userJSON) return;
    
    const user = JSON.parse(userJSON);
    const tickets = JSON.parse(localStorage.getItem(getUserTicketsKey(user)) || '[]');
    
    setTotalTickets(tickets.length);
    setOpenTickets(tickets.filter(t => t.status === 'open').length);
    setResolvedTickets(tickets.filter(t => t.status === 'closed').length);
  };

  const handleLogout = () => {
    localStorage.removeItem('ticketapp_session');
    localStorage.removeItem('ticketapp_current_user');
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="dashboard-page">
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">TicketFlow</div>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <span>{menuOpen ? '✕' : '☰'}</span>
          </button>
          <div className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
            <Link to="/dashboard" className="nav-link active" onClick={closeMenu}>Dashboard</Link>
            <Link to="/tickets" className="nav-link" onClick={closeMenu}>Tickets</Link>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="container">
          <div className="welcome-section">
            <h1 className="page-title">Welcome, {userName}! 👋</h1>
            <p className="page-subtitle">Here's an overview of your tickets</p>
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-icon">📊</div>
              <div className="stat-number">{totalTickets}</div>
              <div className="stat-label">Total Tickets</div>
            </div>

            <div className="stat-box stat-open">
              <div className="stat-icon">🟢</div>
              <div className="stat-number">{openTickets}</div>
              <div className="stat-label">Open Tickets</div>
            </div>

            <div className="stat-box stat-resolved">
              <div className="stat-icon">✅</div>
              <div className="stat-number">{resolvedTickets}</div>
              <div className="stat-label">Resolved Tickets</div>
            </div>
          </div>

          <div className="action-section">
            <h2>Quick Actions</h2>
            <Link to="/tickets" className="btn btn-primary">
              Manage Tickets
            </Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 TicketFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;