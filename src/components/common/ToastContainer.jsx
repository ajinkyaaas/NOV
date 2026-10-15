import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useShop();

  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />;
      case 'warning':
        return <AlertTriangle size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />;
      case 'error':
        return <XCircle size={18} style={{ color: 'var(--accent-rose)', flexShrink: 0 }} />;
      default:
        return <Info size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type || 'info'}`}>
          {getIcon(toast.type)}
          <span style={{ flex: 1, lineHeight: 1.4 }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
