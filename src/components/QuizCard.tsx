'use client';

import React from 'react';
import { Question, MBTIAxis } from '@/types';
import { motion } from 'framer-motion';

interface QuizCardProps {
  question: Question;
  onAnswer: (selectedType: MBTIAxis) => void;
  disabled: boolean;
}

export default function QuizCard({ question, onAnswer, disabled }: QuizCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-dark-card border border-gray-800 rounded-2xl p-6 md:p-10 shadow-2xl mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed text-center">
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
                ? 'border-gray-800 bg-gray-900/50 opacity-50 cursor-not-allowed' 
                : 'border-gray-700 bg-dark-lighter hover:border-neon-green hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]'
              }
            `}
          >
            <div className="flex items-start gap-4 relative z-10">
              <span className={`
                font-bold text-lg
                ${disabled ? 'text-gray-600' : 'text-neon-green group-hover:text-white transition-colors'}
              `}>
                A.
              </span>
              <span className="text-gray-200 font-medium text-lg leading-snug">
                {question.optionA.text}
              </span>
            </div>
            {/* Hover effect background fill */}
            {!disabled && (
              <div className="absolute inset-0 bg-neon-green/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
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
                ? 'border-gray-800 bg-gray-900/50 opacity-50 cursor-not-allowed' 
                : 'border-gray-700 bg-dark-lighter hover:border-neon-pink hover:shadow-[0_0_15px_rgba(255,20,147,0.3)]'
              }
            `}
          >
            <div className="flex items-start gap-4 relative z-10">
              <span className={`
                font-bold text-lg
                ${disabled ? 'text-gray-600' : 'text-neon-pink group-hover:text-white transition-colors'}
              `}>
                B.
              </span>
              <span className="text-gray-200 font-medium text-lg leading-snug">
                {question.optionB.text}
              </span>
            </div>
            {/* Hover effect background fill */}
            {!disabled && (
              <div className="absolute inset-0 bg-neon-pink/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
