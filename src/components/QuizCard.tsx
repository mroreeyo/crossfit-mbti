'use client';

import React from 'react';
import { Question, MBTIAxis } from '@/types';
import { motion } from 'framer-motion';

interface QuizCardProps {
  question: Question;
  onAnswer: (selectedType: MBTIAxis) => void;
  disabled: boolean;
}

const EMOJI_QUESTIONS: Record<number, { a: string; b: string }> = {
  2: { a: '💪', b: '🧐' },
  6: { a: '😤', b: '😵‍💫' },
};


export default function QuizCard({ question, onAnswer, disabled }: QuizCardProps) {
  const emojiData = EMOJI_QUESTIONS[question.id];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-xl mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 leading-relaxed text-center">
          Q{question.id}. {question.question}
        </h2>

        <div className="space-y-4">
          <motion.button
            onClick={() => onAnswer(question.optionA.type)}
            disabled={disabled}
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            className={`
              w-full text-left p-6 rounded-xl border-2 transition-colors duration-200 group relative overflow-hidden
              ${disabled 
                ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed' 
                : 'border-gray-200 bg-slate-50 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              }
            `}
          >
            <div className="flex items-center gap-4 relative z-10">
              {emojiData ? (
                <span className="text-5xl mr-2">{emojiData.a}</span>
              ) : (
                <span className={`
                  font-bold text-lg
                  ${disabled ? 'text-gray-400' : 'text-emerald-600 group-hover:text-emerald-700 transition-colors'}
                `}>
                  A.
                </span>
              )}
              <span className="text-slate-700 font-medium text-lg leading-snug">
                {question.optionA.text}
              </span>
            </div>
            {/* Hover effect background fill */}
            {!disabled && (
              <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            )}
          </motion.button>

          <motion.button
            onClick={() => onAnswer(question.optionB.type)}
            disabled={disabled}
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            className={`
              w-full text-left p-6 rounded-xl border-2 transition-colors duration-200 group relative overflow-hidden
              ${disabled 
                ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed' 
                : 'border-gray-200 bg-slate-50 hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]'
              }
            `}
          >
            <div className="flex items-center gap-4 relative z-10">
              {emojiData ? (
                <span className="text-5xl mr-2">{emojiData.b}</span>
              ) : (
                <span className={`
                  font-bold text-lg
                  ${disabled ? 'text-gray-400' : 'text-pink-500 group-hover:text-pink-600 transition-colors'}
                `}>
                  B.
                </span>
              )}
              <span className="text-slate-700 font-medium text-lg leading-snug">
                {question.optionB.text}
              </span>
            </div>
            {/* Hover effect background fill */}
            {!disabled && (
              <div className="absolute inset-0 bg-pink-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
