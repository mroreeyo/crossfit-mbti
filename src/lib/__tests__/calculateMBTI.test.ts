import { describe, it, expect } from 'vitest';
import { calculateMBTI } from '../calculateMBTI';
import { Answer } from '@/types';

describe('calculateMBTI', () => {
  it('should return ESTJ when all answers are E, S, T, J (3 each)', () => {
    const answers: Answer[] = [
      { questionId: 1, selectedType: 'E' },
      { questionId: 2, selectedType: 'S' },
      { questionId: 3, selectedType: 'T' },
      { questionId: 4, selectedType: 'J' },
      { questionId: 5, selectedType: 'E' },
      { questionId: 6, selectedType: 'S' },
      { questionId: 7, selectedType: 'T' },
      { questionId: 8, selectedType: 'J' },
      { questionId: 9, selectedType: 'E' },
      { questionId: 10, selectedType: 'S' },
      { questionId: 11, selectedType: 'T' },
      { questionId: 12, selectedType: 'J' },
    ];

    expect(calculateMBTI(answers)).toBe('ESTJ');
  });

  it('should return INFP when all answers are I, N, F, P (3 each)', () => {
    const answers: Answer[] = [
      { questionId: 1, selectedType: 'I' },
      { questionId: 2, selectedType: 'N' },
      { questionId: 3, selectedType: 'F' },
      { questionId: 4, selectedType: 'P' },
      { questionId: 5, selectedType: 'I' },
      { questionId: 6, selectedType: 'N' },
      { questionId: 7, selectedType: 'F' },
      { questionId: 8, selectedType: 'P' },
      { questionId: 9, selectedType: 'I' },
      { questionId: 10, selectedType: 'N' },
      { questionId: 11, selectedType: 'F' },
      { questionId: 12, selectedType: 'P' },
    ];

    expect(calculateMBTI(answers)).toBe('INFP');
  });

  it('should return ENFP with mixed answers (E:2, I:1, N:2, S:1, F:2, T:1, P:2, J:1)', () => {
    const answers: Answer[] = [
      { questionId: 1, selectedType: 'E' },
      { questionId: 2, selectedType: 'N' },
      { questionId: 3, selectedType: 'F' },
      { questionId: 4, selectedType: 'P' },
      { questionId: 5, selectedType: 'E' },
      { questionId: 6, selectedType: 'S' },
      { questionId: 7, selectedType: 'T' },
      { questionId: 8, selectedType: 'J' },
      { questionId: 9, selectedType: 'I' },
      { questionId: 10, selectedType: 'N' },
      { questionId: 11, selectedType: 'F' },
      { questionId: 12, selectedType: 'P' },
    ];

    expect(calculateMBTI(answers)).toBe('ENFP');
  });

  it('should return ESTJ when answers array is empty (all scores 0)', () => {
    const answers: Answer[] = [];

    expect(calculateMBTI(answers)).toBe('ESTJ');
  });
});
