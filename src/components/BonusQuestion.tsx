'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BonusQuestionProps {
  onAnswer: (answerId: string) => void;
}

const BONUS_QUESTION = {
  question: '🎁 보너스! 절대 안 하고 싶은 WOD는?',
  options: [
    { id: 'girl', text: '🏋️ Girl WOD (Fran, Grace...)', label: 'Girl WOD' },
    { id: 'hero', text: '🎖️ Hero WOD (Murph, DT...)', label: 'Hero WOD' },
    { id: 'amrap', text: '⏱️ 긴 AMRAP (20분 이상)', label: '긴 AMRAP' },
    { id: 'cardio', text: '🏃 순수 카디오 (러닝/로잉만)', label: '순수 카디오' },
  ],
};

export default function BonusQuestion({ onAnswer }: BonusQuestionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-dark-card border border-gray-800 rounded-2xl p-6 md:p-10 shadow-2xl mb-8 relative overflow-hidden">
        {/* Bonus Badge */}
        <div className="absolute top-4 right-4 bg-neon-pink text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
          BONUS!
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed text-center">
          {BONUS_QUESTION.question}
        </h2>

        <div className="space-y-4">
          {BONUS_QUESTION.options.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => onAnswer(option.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left p-5 rounded-xl border-2 border-gray-700 bg-dark-lighter hover:border-neon-pink hover:shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all duration-200 group relative overflow-hidden"
            >
              <div className="flex items-center gap-4 relative z-10">
                <span className="text-2xl">{option.text.split(' ')[0]}</span>
                <span className="text-gray-200 font-medium text-lg leading-snug group-hover:text-white transition-colors">
                  {option.text.substring(option.text.indexOf(' ') + 1)}
                </span>
              </div>
              {/* Hover effect background fill */}
              <div className="absolute inset-0 bg-neon-pink/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
