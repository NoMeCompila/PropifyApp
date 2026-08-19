import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-3 w-full max-w-xl px-4 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.92 }}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 26,
              mass: 0.8,
            }}
            className={`pointer-events-auto flex items-center justify-between gap-3.5 py-3.5 px-6 rounded-full border backdrop-blur-md text-white font-semibold text-sm sm:text-[15px] max-w-full tracking-wide shadow-2xl ${
              toast.type === 'success'
                ? 'bg-emerald-600/95 border-emerald-300/30 shadow-[0_10px_35px_rgba(16,185,129,0.45)]'
                : toast.type === 'error'
                ? 'bg-[rgba(239,68,68,0.95)] border-red-300/30 shadow-[0_10px_35px_rgba(239,68,68,0.45)]'
                : 'bg-blue-600/95 border-blue-300/30 shadow-[0_10px_35px_rgba(37,99,235,0.45)]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {toast.type === 'success' && (
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="truncate sm:whitespace-normal leading-snug">{toast.message}</span>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-all shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center focus:outline-none"
              aria-label="Cerrar notificación"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
