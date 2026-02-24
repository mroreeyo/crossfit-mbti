'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { MBTIResult } from '@/types';
import { getResultByType } from '@/data/results';
import { useQuizStore } from '@/stores/quizStore';
import { motion } from 'framer-motion';
import ShareButtons from '@/components/ShareButtons';
import { trackResultView, trackRetryClick } from '@/lib/analytics';

interface ResultCardProps {
  result: MBTIResult;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const router = useRouter();
  const t = useTranslations('result');
  const tResults = useTranslations('results');
  const tCommon = useTranslations('common');
  const tQuiz = useTranslations('quiz');
  const resetQuiz = useQuizStore((state) => state.reset);
  const bonusAnswer = useQuizStore((state) => state.bonusAnswer);
  const resultCardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    trackResultView(result.type);
  }, [result.type]);

  const handleRetake = () => {
    trackRetryClick();
    resetQuiz();
    router.push('/quiz');
  };

  // Translated display strings
  const nickname = tResults(`${result.type}.nickname` as never);
  const description = tResults(`${result.type}.description` as never);
  const traits = [
    tResults(`${result.type}.traits.0` as never),
    tResults(`${result.type}.traits.1` as never),
    tResults(`${result.type}.traits.2` as never),
  ];
  const bestMove = tResults(`${result.type}.bestMove` as never);
  const worstMove = tResults(`${result.type}.worstMove` as never);
  const bestWOD = tResults(`${result.type}.bestWOD` as never);
  const worstWOD = tResults(`${result.type}.worstWOD` as never);
  const quote = tResults(`${result.type}.quote` as never);

  // Structural data from results.ts
  const bestMatchResult = getResultByType(result.bestMatch);
  const worstMatchResult = getResultByType(result.worstMatch);
  const bestMatchNickname = tResults(`${result.bestMatch}.nickname` as never);
  const worstMatchNickname = tResults(`${result.worstMatch}.nickname` as never);

  const getBonusText = (answer: string | null): string | null => {
    switch (answer) {
      case 'girl': return tQuiz('bonusGirlResult');
      case 'hero': return tQuiz('bonusHeroResult');
      case 'amrap': return tQuiz('bonusAmrapResult');
      case 'cardio': return tQuiz('bonusCardioResult');
      default: return null;
    }
  };

  const bonusText = getBonusText(bonusAnswer);

  return (
    <motion.div 
      className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      ref={resultCardRef}
    >
      <div className="p-6 md:p-8 flex flex-col items-center text-center space-y-6">
        
        {/* Header */}
        <div className="space-y-2">
          <motion.h2 variants={itemVariants} className="text-lg text-gray-500 font-medium">{t('myType')}</motion.h2>
          <motion.div variants={itemVariants} className="w-48 h-48 md:w-56 md:h-56 relative mx-auto my-4">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Image
                src={result.characterImage}
                alt={`${result.type} - ${nickname}`}
                width={224}
                height={224}
                sizes="(max-width: 768px) 192px, 224px"
                className="rounded-2xl shadow-lg object-cover"
                priority
              />
            </motion.div>
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-5xl font-bold tracking-wider"
            style={{ color: result.color }}
          >
            {result.type}
          </motion.h1>
          <motion.div variants={itemVariants} className="text-2xl font-semibold text-slate-900">
            &quot;{nickname}&quot;
          </motion.div>
        </div>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed">
          {description}
        </motion.p>

        <motion.div variants={itemVariants} className="w-full h-px bg-gray-200 my-4" />

        {/* Traits */}
        <motion.div variants={itemVariants} className="w-full text-left space-y-3">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('traits')}</h3>
          <ul className="space-y-2">
            {traits.map((trait, index) => (
              <li key={index} className="flex items-start text-gray-600">
                <span className="mr-2" style={{ color: result.color }}>•</span>
                {trait}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Moves */}
        <motion.div variants={itemVariants} className="w-full grid grid-cols-2 gap-4 text-left">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">{t('bestMove')}</div>
            <div className="font-semibold text-slate-900">{bestMove}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">{t('worstMove')}</div>
            <div className="font-semibold text-slate-900">{worstMove}</div>
          </div>
        </motion.div>

        {/* WODs */}
        <motion.div variants={itemVariants} className="w-full grid grid-cols-2 gap-4 text-left">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">{t('bestWOD')}</div>
            <div className="font-semibold text-slate-900 text-sm">{bestWOD}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">{t('worstWOD')}</div>
            <div className="font-semibold text-slate-900 text-sm">{worstWOD}</div>
          </div>
        </motion.div>

        {/* Bonus Answer */}
        {bonusText && (
          <motion.div variants={itemVariants} className="w-full">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-left">
              <div className="text-sm text-gray-500 mb-1">{t('neverWOD')}</div>
              <div className="font-semibold text-slate-900">{bonusText}</div>
            </div>
          </motion.div>
        )}

        {/* Matches */}
        <motion.div variants={itemVariants} className="w-full space-y-3">
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">💕</span>
              <span className="text-sm text-gray-600">{t('bestMatch')}</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-pink-500 mr-2">{result.bestMatch}</span>
              <span className="text-xs text-gray-500 block">{bestMatchNickname}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">💥</span>
              <span className="text-sm text-gray-600">{t('worstMatch')}</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-gray-500 mr-2">{result.worstMatch}</span>
              <span className="text-xs text-gray-400 block">{worstMatchNickname}</span>
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div variants={itemVariants} className="w-full py-4">
          <p className="text-lg italic font-serif text-gray-500">
            {quote}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full h-px bg-gray-200 my-2" />

        {/* Share Placeholder (Task 8) */}
        <motion.div variants={itemVariants} className="w-full py-2">
          <ShareButtons
            type={result.type}
            nickname={nickname}
            resultCardRef={resultCardRef}
          />
        </motion.div>

        {/* Retake Button */}
        <motion.button
          variants={itemVariants}
          onClick={handleRetake}
          className="w-full py-4 rounded-xl font-bold text-lg transition-transform"
          style={{ 
            backgroundColor: result.color,
            color: '#1a1a1a', // Dark text for contrast on bright colors
            boxShadow: `0 4px 14px 0 ${result.color}66`
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {tCommon('retake')}
        </motion.button>

      </div>
    </motion.div>
  );
};

export default ResultCard;
