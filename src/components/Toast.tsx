'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (!isVisible) return;
    const timeoutId = window.setTimeout(onClose, 2000);
    return () => window.clearTimeout(timeoutId);
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4"
        >
          <div className="max-w-[92vw] rounded-xl border border-emerald-500/60 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur">
            {message}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Toast;
