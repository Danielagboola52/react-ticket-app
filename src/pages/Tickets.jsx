import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const Tickets = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({
    id: null,
    title: '',
    description: '',
    status: '',
    priority: '',
    createdAt: null
  });
  const [errors, setErrors] = useState({});
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser();
    loadTickets();
  }, []);

  const getCurrentUser = () => {
    const userJSON = localStorage.getItem('ticketapp_current_user');
    if (!userJSON) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userJSON);
    setCurrentUser(user);
  };

  const getUserTicketsKey = () => {
    if (!currentUser) return null;
    return `tickets_${currentUser.id}`;
  };

  const loadTickets = () => {
    const userJSON = localStorage.getItem('ticketapp_current_user');
    if (!userJSON) return;
    
    const user = JSON.parse(userJSON);
    const ticketsKey = `tickets_${user.id}`;
    const stored = localStorage.getItem(ticketsKey);
    setTickets(stored ? JSON.parse(stored) : []);
  };

  const saveTickets = (updatedTickets) => {
    if (!currentUser) return;
    const ticketsKey = getUserTicketsKey();
    localStorage.setItem(ticketsKey, JSON.stringify(updatedTickets));
  };

  const openCreateModal = () => {
    setIsEditing(false);
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (ticket) => {
    setIsEditing(true);
    setForm({ ...ticket });
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: '',
      description: '',
      status: '',
      priority: '',
      createdAt: null
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.title || form.title.trim() === '') {
      newErrors.title = 'Title is required';
    }

    if (!form.status) {
      newErrors.status = 'Status is required';
    } else if (!['open', 'in_progress', 'closed'].includes(form.status)) {
      newErrors.status = 'Invalid status selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveTicket = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToastMessage('Please fix the errors in the form', 'error');
      return;
    }

    let updatedTickets;

    if (isEditing) {
      updatedTickets = tickets.map(t => t.id === form.id ? { ...form } : t);
      showToastMessage('Ticket updated successfully!', 'success');
    } else {
      const newTicket = {
        ...form,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        userId: currentUser.id
      };
      updatedTickets = [newTicket, ...tickets];
      showToastMessage('Ticket created successfully!', 'success');
    }

    setTickets(updatedTickets);
    saveTickets(updatedTickets);
    closeModal();
  };

  const confirmDelete = (ticket) => {
    setTicketToDelete(ticket);
    setShowDeleteModal(true);
  };

  const deleteTicket = () => {
    const updatedTickets = tickets.filter(t => t.id !== ticketToDelete.id);
    setTickets(updatedTickets);
    saveTickets(updatedTickets);
    setShowDeleteModal(false);
    showToastMessage('Ticket deleted successfully', 'success');
    setTicketToDelete(null);
  };

  const getStatusLabel = (status) => {
    const labels = {
      open: 'Open',
      in_progress: 'In Progress',
      closed: 'Closed'
    };
    return labels[status] || status;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const showToastMessage = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('ticketapp_session');
    localStorage.removeItem('ticketapp_current_user');
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="tickets-page">
      <Toast show={toast.show} message={toast.message} type={toast.type} />

      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">TicketFlow</div>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <span>{menuOpen ? '✕' : '☰'}</span>
          </button>
          <div className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
            <Link to="/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
            <Link to="/tickets" className="nav-link active" onClick={closeMenu}>Tickets</Link>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </nav>

      <div className="tickets-content">
        <div className="container">
          <div className="header-section">
            <div>
              <h1 className="page-title">Ticket Management</h1>
              <p className="page-subtitle">Create and manage your support tickets</p>
            </div>
            <button onClick={openCreateModal} className="btn btn-primary">
              + New Ticket
            </button>
          </div>

          {tickets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No tickets yet</h3>
              <p>Create your first ticket to get started</p>
              <button onClick={openCreateModal} className="btn btn-primary">Create Ticket</button>
            </div>
          ) : (
            <div className="tickets-grid">
              {tickets.map(ticket => (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-header">
                    <h3 className="ticket-title">{ticket.title}</h3>
                    <span className={`status-badge ${ticket.status}`}>
                      {getStatusLabel(ticket.status)}
                    </span>
                  </div>
                  
                  {ticket.description && (
                    <p className="ticket-description">{ticket.description}</p>
                  )}
                  
                  <div className="ticket-meta">
                    {ticket.priority && (
                      <span className="ticket-priority">
                        Priority: <strong>{ticket.priority}</strong>
                      </span>
                    )}
                    <span className="ticket-date">{formatDate(ticket.createdAt)}</span>
                  </div>

                  <div className="ticket-actions">
                    <button onClick={() => openEditModal(ticket)} className="btn-action btn-edit">
                      ✏️ Edit
                    </button>
                    <button onClick={() => confirmDelete(ticket)} className="btn-action btn-delete">
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isEditing ? 'Edit Ticket' : 'Create New Ticket'}</h2>
              <button onClick={closeModal} className="modal-close">✕</button>
            </div>

            <form onSubmit={saveTicket} className="modal-form">
              <div className="form-group">
                <label htmlFor="title">Title <span className="required">*</span></label>
                <input
                  type="text"
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({...form, title: e.target.value})}
                  placeholder="Enter ticket title"
                  className={errors.title ? 'error' : ''}
                />
                {errors.title && <span className="error-message-inline">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  placeholder="Enter ticket description (optional)"
                  rows="4"
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Status <span className="required">*</span></label>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(e) => setForm({...form, status: e.target.value})}
                    className={errors.status ? 'error' : ''}
                  >
                    <option value="">Select status</option>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  {errors.status && <span className="error-message-inline">{errors.status}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    value={form.priority}
                    onChange={(e) => setForm({...form, priority: e.target.value})}
                  >
                    <option value="">Select priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={closeModal} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Update Ticket' : 'Create Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete Ticket?</h2>
              <button onClick={() => setShowDeleteModal(false)} className="modal-close">✕</button>
            </div>

            <div className="modal-body">
              <p>Are you sure you want to delete <strong>"{ticketToDelete?.title}"</strong>?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={deleteTicket} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 TicketFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Tickets;