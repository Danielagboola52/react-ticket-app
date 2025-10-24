import React from 'react';

const Toast = ({ show, message, type }) => {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9999,
      backgroundColor: type === 'success' ? '#d1fae5' : '#fee2e2',
      color: type === 'success' ? '#059669' : '#dc2626',
      fontWeight: '600',
      animation: 'slideIn 0.3s ease-out'
    }}>
      {message}
    </div>
  );
};

export default Toast;