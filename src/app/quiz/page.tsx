'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/stores/quizStore';
import { questions } from '@/data/questions';
import QuizCard from '@/components/QuizCard';
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
    reset 
  } = useQuizStore();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // Reset quiz on mount
  useEffect(() => {
    reset();
  }, [reset]);

  // Handle completion state
  useEffect(() => {
    if (isCompleted) {
      setShowLoading(true);
    }
  }, [isCompleted]);

  const handleAnswer = useCallback((selectedType: MBTIAxis) => {
    if (isTransitioning) return;

    trackQuestionAnswer(questions[currentQuestionIndex].id);

    setIsTransitioning(true);
    
    // Add a small delay for visual feedback before moving to next question
    setTimeout(() => {
      answerQuestion({
        questionId: questions[currentQuestionIndex].id,
        selectedType,
      });
      setIsTransitioning(false);
    }, 300);
  }, [answerQuestion, currentQuestionIndex, isTransitioning]);

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

  // Safety check for index out of bounds
  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return null; // Or a loading spinner/error state
  }

  return (
    <main className="min-h-screen bg-dark text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-green/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-pink/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-2xl z-10">
        <ProgressBar 
          current={currentQuestionIndex + 1} 
          total={questions.length} 
        />
        
        <div className="mt-8 relative">
          <AnimatePresence mode="wait">
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
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
