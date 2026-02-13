'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/stores/quizStore';
import { questions } from '@/data/questions';
import QuizCard from '@/components/QuizCard';
import BonusQuestion from '@/components/BonusQuestion';
import ProgressBar from '@/components/ProgressBar';
import LoadingAnimation from '@/components/LoadingAnimation';
import { useState, useCallback, useEffect } from 'react';
import { MBTIAxis } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { trackQuestionAnswer, trackQuizComplete } from '@/lib/analytics';
import { saveQuizResult } from '@/lib/supabase';

export default function QuizPage() {
  const router = useRouter();
  const { 
    currentQuestionIndex, 
    answerQuestion, 
    isCompleted, 
    calculateResult, 
    reset,
    setBonusAnswer
  } = useQuizStore();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState<{emoji: string, title: string, subtitle: string} | null>(null);

  // Reset quiz on mount
  useEffect(() => {
    reset();
  }, [reset]);

  // Handle completion state
  useEffect(() => {
    if (isCompleted && !showBonus) {
      setShowBonus(true);
    }
  }, [isCompleted, showBonus]);

  const handleBonusAnswer = useCallback((answerId: string) => {
    setBonusAnswer(answerId);
    setShowLoading(true);
  }, [setBonusAnswer]);

  const handleAnswer = useCallback((selectedType: MBTIAxis) => {
    if (isTransitioning || showFeedback) return;

    trackQuestionAnswer(questions[currentQuestionIndex].id);

    setIsTransitioning(true);
    
    // Add a small delay for visual feedback before moving to next question
    setTimeout(() => {
      answerQuestion({
        questionId: questions[currentQuestionIndex].id,
        selectedType,
      });

      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex === 4 || nextIndex === 8 || nextIndex === 12) {
        const feedbacks = {
          4: { emoji: '🏋️', title: '1라운드 클리어!', subtitle: '벌써 감이 오는데... 당신, 혹시 AMRAP 좋아해요?' },
          8: { emoji: '🔥', title: '2라운드 클리어!', subtitle: '지금까지 보면... 당신 박스에서 꽤 존재감 있는 편?' },
          12: { emoji: '💪', title: '파이널 라운드!', subtitle: '마지막 4문항! 끝까지 가보자고 🔥' },
        };
        setFeedbackData(feedbacks[nextIndex as keyof typeof feedbacks]);
        setShowFeedback(true);
        
        setTimeout(() => {
          setShowFeedback(false);
          setFeedbackData(null);
          setIsTransitioning(false);
        }, 2000);
      } else {
        setIsTransitioning(false);
      }
    }, 300);
  }, [answerQuestion, currentQuestionIndex, isTransitioning, showFeedback]);

  const handleLoadingComplete = useCallback(() => {
    const resultType = calculateResult();
    void saveQuizResult(resultType); // fire-and-forget
    trackQuizComplete(resultType);
    router.push(`/result/${resultType}`);
  }, [calculateResult, router]);

  // If loading state is active (after all questions answered)
  if (showLoading) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />;
  }

  // Safety check for index out of bounds (but allow bonus question to show)
  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion && !showBonus && !isCompleted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-2xl z-10">
        <ProgressBar 
          current={currentQuestionIndex + 1} 
          total={questions.length} 
        />
        
        <div className="mt-8 relative">
          <AnimatePresence mode="wait">
            {showFeedback && feedbackData ? (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center text-center py-12 space-y-6 bg-white rounded-2xl border border-gray-200 shadow-xl"
              >
                <div className="text-6xl animate-bounce">{feedbackData.emoji}</div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">{feedbackData.title}</h2>
                  <p className="text-gray-500">{feedbackData.subtitle}</p>
                </div>
              </motion.div>
            ) : showBonus ? (
              <motion.div
                key="bonus"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <BonusQuestion onAnswer={handleBonusAnswer} />
              </motion.div>
            ) : (
              <motion.div
                key={currentQuestionIndex}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <QuizCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  disabled={isTransitioning}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
