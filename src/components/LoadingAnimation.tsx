'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface LoadingAnimationProps {
  onComplete: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const t = useTranslations();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4">
      <div className="relative mb-8">
        {/* Barbell Animation */}
        <motion.div 
          className="text-6xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        >
          {t('common.loadingEmoji')}
        </motion.div>
      </div>
      
      <motion.h2 
        className="text-2xl md:text-3xl font-bold text-center mb-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        {t('quiz.loadingTitle')}
      </motion.h2>
      
      <motion.p 
        className="text-gray-500 text-center max-w-xs mx-auto whitespace-pre-line"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {t('quiz.loadingSubtitle')}
      </motion.p>
    </div>
  );
}
