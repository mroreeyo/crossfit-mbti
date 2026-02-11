'use client';

import React, { useState, useEffect } from 'react';
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

const SLIDER_QUESTIONS: Record<number, { leftLabel: string; leftEmoji: string; rightLabel: string; rightEmoji: string }> = {
  9: { leftLabel: '수다 존', leftEmoji: '🗣️', rightLabel: '혼자 존', rightEmoji: '🎧' },
};

export default function QuizCard({ question, onAnswer, disabled }: QuizCardProps) {
  const [sliderValue, setSliderValue] = useState(50);

  // Reset slider when question changes
  useEffect(() => {
    setSliderValue(50);
  }, [question.id]);

  const handleSliderConfirm = () => {
    // < 50 is Option A (E), >= 50 is Option B (I)
    const selectedType = sliderValue < 50 ? question.optionA.type : question.optionB.type;
    onAnswer(selectedType);
  };

  const emojiData = EMOJI_QUESTIONS[question.id];
  const sliderData = SLIDER_QUESTIONS[question.id];

  if (sliderData) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-dark-card border border-gray-800 rounded-2xl p-6 md:p-10 shadow-2xl mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed text-center">
            Q{question.id}. {question.question}
          </h2>

          <div className="space-y-8 py-4">
            <div className="flex justify-between items-center text-lg font-medium text-gray-300 px-2">
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl">{sliderData.leftEmoji}</span>
                <span>{sliderData.leftLabel}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl">{sliderData.rightEmoji}</span>
                <span>{sliderData.rightLabel}</span>
              </div>
            </div>

            <div className="relative w-full h-12 flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                disabled={disabled}
                className="w-full h-4 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-green hover:accent-neon-pink transition-colors"
              />
            </div>

            <div className="text-center text-gray-400 text-sm">
              {sliderValue < 50 ? question.optionA.text : question.optionB.text}
            </div>

            <motion.button
              onClick={handleSliderConfirm}
              disabled={disabled}
              whileHover={!disabled ? { scale: 1.05 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              className={`
                w-full py-4 rounded-xl font-bold text-lg transition-all duration-200
                ${disabled 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-neon-green text-black hover:bg-neon-pink hover:text-white shadow-lg hover:shadow-neon-pink/50'
                }
              `}
            >
              선택하기
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center gap-4 relative z-10">
              {emojiData ? (
                <span className="text-5xl mr-2">{emojiData.a}</span>
              ) : (
                <span className={`
                  font-bold text-lg
                  ${disabled ? 'text-gray-600' : 'text-neon-green group-hover:text-white transition-colors'}
                `}>
                  A.
                </span>
              )}
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
            <div className="flex items-center gap-4 relative z-10">
              {emojiData ? (
                <span className="text-5xl mr-2">{emojiData.b}</span>
              ) : (
                <span className={`
                  font-bold text-lg
                  ${disabled ? 'text-gray-600' : 'text-neon-pink group-hover:text-white transition-colors'}
                `}>
                  B.
                </span>
              )}
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
