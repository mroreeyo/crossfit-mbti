'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface BonusQuestionProps {
  onAnswer: (answerId: string) => void;
}

const BONUS_OPTIONS = [
  { id: 'girl', textKey: 'quiz.bonusGirl' as const },
  { id: 'hero', textKey: 'quiz.bonusHero' as const },
  { id: 'amrap', textKey: 'quiz.bonusAmrap' as const },
  { id: 'cardio', textKey: 'quiz.bonusCardio' as const },
];

export default function BonusQuestion({ onAnswer }: BonusQuestionProps) {
  const t = useTranslations();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-xl mb-8 relative overflow-hidden">
        {/* Bonus Badge */}
        <div className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
          {t('quiz.bonusBadge')}
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 leading-relaxed text-center">
          {t('quiz.bonusQuestion')}
        </h2>

        <div className="space-y-4">
          {BONUS_OPTIONS.map((option) => {
            const text = t(option.textKey);
            const emoji = text.split(' ')[0];
            const label = text.substring(text.indexOf(' ') + 1);
            return (
              <motion.button
                key={option.id}
                onClick={() => onAnswer(option.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-left p-5 rounded-xl border-2 border-gray-200 bg-slate-50 hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all duration-200 group relative overflow-hidden"
              >
                <div className="flex items-center gap-4 relative z-10">
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-slate-700 font-medium text-lg leading-snug group-hover:text-slate-900 transition-colors">
                    {label}
                  </span>
                </div>
                {/* Hover effect background fill */}
                <div className="absolute inset-0 bg-pink-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
