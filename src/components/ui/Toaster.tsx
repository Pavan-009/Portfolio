import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const toastTypeStyles = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: <CheckCircle className="h-5 w-5 text-green-400" />,
    title: 'text-green-800',
    message: 'text-green-700',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: <AlertCircle className="h-5 w-5 text-red-400" />,
    title: 'text-red-800',
    message: 'text-red-700',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: <Info className="h-5 w-5 text-blue-400" />,
    title: 'text-blue-800',
    message: 'text-blue-700',
  },
};

// Store to manage toasts globally
type ToastStore = {
  toasts: Toast[];
  add: (type: ToastType, message: string) => void;
  remove: (id: string) => void;
};

export const toastStore: ToastStore = {
  toasts: [],
  add(type, message) {
    const id = Date.now().toString();
    this.toasts = [...this.toasts, { id, type, message }];
    // Auto-remove after 5 seconds
    setTimeout(() => this.remove(id), 5000);
    // Notify subscribers
    window.dispatchEvent(new CustomEvent('toast-update'));
  },
  remove(id) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    // Notify subscribers
    window.dispatchEvent(new CustomEvent('toast-update'));
  },
};

// Helper functions to add toasts
export const toast = {
  success: (message: string) => toastStore.add('success', message),
  error: (message: string) => toastStore.add('error', message),
  info: (message: string) => toastStore.add('info', message),
};

// Individual Toast component
const Toast = ({ toast, onClose }: ToastProps) => {
  const { type, message, id } = toast;
  const styles = toastTypeStyles[type];
  
  // Auto-close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 5000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`max-w-sm w-full ${styles.bg} border ${styles.border} rounded-lg shadow-lg pointer-events-auto`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{styles.icon}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className={`text-sm font-medium ${styles.message}`}>{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => onClose(id)}
              className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Toaster component that displays all toasts
export const Toaster = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleUpdate = () => {
      setToasts([...toastStore.toasts]);
    };

    // Initial load
    setToasts([...toastStore.toasts]);

    // Subscribe to changes
    window.addEventListener('toast-update', handleUpdate);
    return () => window.removeEventListener('toast-update', handleUpdate);
  }, []);

  return (
    <div className="w-full fixed top-4 right-4 z-50 flex flex-col items-center space-y-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={toastStore.remove.bind(toastStore)} />
        ))}
      </AnimatePresence>
    </div>
  );
};