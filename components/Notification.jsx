import React, { useEffect } from "react";

export default function Notification({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      {message}
      <style jsx>{`
        .notification {
          position: fixed;
          top: 1rem;
          right: 1rem;
          background: #1e90ff;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 0 12px rgba(30, 144, 255, 0.7);
          z-index: 2000;
          font-weight: 600;
          user-select: none;
          cursor: default;
          max-width: 300px;
          opacity: 0.95;
        }
        .notification.error {
          background: #ff4c4c;
          box-shadow: 0 0 12px rgba(255, 76, 76, 0.9);
        }
        .notification.success {
          background: #3ad46a;
          box-shadow: 0 0 12px rgba(58, 212, 106, 0.9);
        }
      `}</style>
    </div>
  );
}
