import { create } from 'zustand';
import { Answer, MBTIAxis } from '@/types';
import { calculateMBTI } from '@/lib/calculateMBTI';
import { questions } from '@/data/questions';

export interface QuizStore {
  answers: Answer[];
  currentQuestionIndex: number;
  isCompleted: boolean;
  resultType: string | null;

  answerQuestion: (answer: Answer) => void;
  goToPrevious: () => void;
  reset: () => void;
  calculateResult: () => string;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  answers: [],
  currentQuestionIndex: 0,
  isCompleted: false,
  resultType: null,

  answerQuestion: (answer: Answer) => {
    set((state) => {
      const newAnswers = [...state.answers, answer];
      const newIndex = state.currentQuestionIndex + 1;
      const isCompleted = newIndex === questions.length;

      return {
        answers: newAnswers,
        currentQuestionIndex: newIndex,
        isCompleted,
      };
    });
  },

  goToPrevious: () => {
    set((state) => {
      if (state.currentQuestionIndex > 0) {
        const newAnswers = state.answers.slice(0, -1);
        return {
          answers: newAnswers,
          currentQuestionIndex: state.currentQuestionIndex - 1,
          isCompleted: false,
        };
      }
      return state;
    });
  },

  reset: () => {
    set({
      answers: [],
      currentQuestionIndex: 0,
      isCompleted: false,
      resultType: null,
    });
  },

  calculateResult: () => {
    const state = get();
    const result = calculateMBTI(state.answers);
    set({ resultType: result });
    return result;
  },
}));
