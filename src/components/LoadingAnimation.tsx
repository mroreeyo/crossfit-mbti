'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingAnimationProps {
  onComplete: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
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
          🏋️
        </motion.div>
      </div>
      
      <motion.h2 
        className="text-2xl md:text-3xl font-bold text-center mb-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        WOD 기록 분석 중... 🔥
      </motion.h2>
      
      <motion.p 
        className="text-gray-500 text-center max-w-xs mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        당신의 크로스핏 성향을 계산하고 있습니다.
        <br />
        잠시만 기다려주세요!
      </motion.p>
    </div>
  );
}
