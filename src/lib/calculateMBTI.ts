import { Answer, MBTIAxis, Scores } from '@/types';

export function calculateMBTI(answers: Answer[]): string {
  const scores: Scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  answers.forEach((answer) => {
    scores[answer.selectedType] += 1;
  });

  const mbti =
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');

  return mbti;
}
