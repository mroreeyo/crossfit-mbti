'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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

  const bestMatchResult = getResultByType(result.bestMatch);
  const worstMatchResult = getResultByType(result.worstMatch);

  const getBonusText = (answer: string | null) => {
    switch (answer) {
      case 'girl': return "Girl WOD (Fran, Grace...) — 짧지만 잔인하니까";
      case 'hero': return "Hero WOD (Murph, DT...) — 끝이 안 보이니까";
      case 'amrap': return "긴 AMRAP (20분+) — 시계가 안 가니까";
      case 'cardio': return "순수 카디오 — 바벨을 들어야 크로스핏이지";
      default: return null;
    }
  };

  const bonusText = getBonusText(bonusAnswer);

  return (
    <motion.div 
      className="w-full max-w-lg mx-auto bg-dark-card rounded-2xl shadow-2xl overflow-hidden border border-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      ref={resultCardRef}
    >
      <div className="p-6 md:p-8 flex flex-col items-center text-center space-y-6">
        
        {/* Header */}
        <div className="space-y-2">
          <motion.h2 variants={itemVariants} className="text-lg text-gray-400 font-medium">나의 크로스핏 MBTI는...</motion.h2>
          <motion.div variants={itemVariants} className="w-48 h-48 md:w-56 md:h-56 relative mx-auto my-4">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Image
                src={result.characterImage}
                alt={`${result.type} - ${result.nickname}`}
                width={224}
                height={224}
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
          <motion.div variants={itemVariants} className="text-2xl font-semibold text-white">
            &quot;{result.nickname}&quot;
          </motion.div>
        </div>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-gray-300 leading-relaxed">
          {result.description}
        </motion.p>

        <motion.div variants={itemVariants} className="w-full h-px bg-gray-700 my-4" />

        {/* Traits */}
        <motion.div variants={itemVariants} className="w-full text-left space-y-3">
          <h3 className="text-lg font-semibold text-white mb-2">📌 특징</h3>
          <ul className="space-y-2">
            {result.traits.map((trait, index) => (
              <li key={index} className="flex items-start text-gray-300">
                <span className="mr-2" style={{ color: result.color }}>•</span>
                {trait}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Moves */}
        <motion.div variants={itemVariants} className="w-full grid grid-cols-2 gap-4 text-left">
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">💪 잘하는 동작</div>
            <div className="font-semibold text-white">{result.bestMove}</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">😫 싫어하는 동작</div>
            <div className="font-semibold text-white">{result.worstMove}</div>
          </div>
        </motion.div>

        {/* WODs */}
        <motion.div variants={itemVariants} className="w-full grid grid-cols-2 gap-4 text-left">
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">💚 찰떡 WOD</div>
            <div className="font-semibold text-white text-sm">{result.bestWOD}</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">🖤 지옥 WOD</div>
            <div className="font-semibold text-white text-sm">{result.worstWOD}</div>
          </div>
        </motion.div>

        {/* Bonus Answer */}
        {bonusText && (
          <motion.div variants={itemVariants} className="w-full">
            <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 text-left">
              <div className="text-sm text-gray-400 mb-1">🚫 절대 안 하고 싶은 WOD</div>
              <div className="font-semibold text-white">{bonusText}</div>
            </div>
          </motion.div>
        )}

        {/* Matches */}
        <motion.div variants={itemVariants} className="w-full space-y-3">
          <div className="flex items-center justify-between bg-gray-800/30 p-3 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-2">
              <span className="text-xl">💕</span>
              <span className="text-sm text-gray-300">찰떡궁합</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-neon-pink mr-2">{result.bestMatch}</span>
              <span className="text-xs text-gray-400 block">{bestMatchResult?.nickname}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-gray-800/30 p-3 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-2">
              <span className="text-xl">💥</span>
              <span className="text-sm text-gray-300">환장조합</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-gray-400 mr-2">{result.worstMatch}</span>
              <span className="text-xs text-gray-500 block">{worstMatchResult?.nickname}</span>
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div variants={itemVariants} className="w-full py-4">
          <p className="text-lg italic font-serif text-gray-400">
            {result.quote}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full h-px bg-gray-700 my-2" />

        {/* Share Placeholder (Task 8) */}
        <motion.div variants={itemVariants} className="w-full py-2">
          <ShareButtons
            type={result.type}
            nickname={result.nickname}
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
          다시 하기
        </motion.button>

      </div>
    </motion.div>
  );
};

export default ResultCard;
