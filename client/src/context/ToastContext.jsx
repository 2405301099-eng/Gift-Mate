import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 2600);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}
      {/* Toast Notification matching Stitch design */}
      <div 
        id="action-toast"
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-on-surface text-inverse-on-surface font-label-md text-label-md flex items-center gap-2 shadow-xl transition-opacity duration-300 ${
          toast.visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">check_circle</span>
        <span>{toast.message || 'Gift saved to your wishlist!'}</span>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
