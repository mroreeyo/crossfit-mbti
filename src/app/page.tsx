'use client';

import Link from 'next/link';
import ParticipantCounter from '@/components/ParticipantCounter';
import { motion } from 'framer-motion';
import { trackQuizStart } from '@/lib/analytics';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center overflow-hidden">
      <div className="max-w-lg w-full flex flex-col items-center">
        <motion.div 
          className="text-6xl mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            🏋️‍♂️
          </motion.div>
        </motion.div>
        
        <motion.h1 
          className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          크로스핏 할 때<br />
          나는 <span className="text-emerald-600">어떤 유형</span>일까?
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-600 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          12가지 질문으로 알아보는<br />
          나만의 크로스핏 MBTI
        </motion.p>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full flex justify-center"
        >
          <Link
            href="/quiz"
            className="w-full max-w-xs block"
            onClick={() => trackQuizStart()}
          >
            <motion.div
              className="w-full bg-neon-green text-black font-bold text-xl py-4 rounded-xl hover:shadow-[0_0_20px_theme('colors.neon.green')] transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              테스트 시작하기
            </motion.div>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8"
        >
          <ParticipantCounter />
        </motion.div>
      </div>
    </main>
  );
}
