export type MBTIAxis = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
export type MBTIType = string; // e.g. "ENFP"

export interface Question {
  id: number;
  question: string;
  optionA: {
    text: string;
    type: Extract<MBTIAxis, 'E' | 'S' | 'T' | 'J'>;
  };
  optionB: {
    text: string;
    type: Extract<MBTIAxis, 'I' | 'N' | 'F' | 'P'>;
  };
}

export interface Answer {
  questionId: number;
  selectedType: MBTIAxis;
}

export interface MBTIResult {
  type: MBTIType;
  nickname: string;
  emoji: string;
  description: string;
  traits: [string, string, string];
  bestMove: string;
  worstMove: string;
  bestMatch: MBTIType;
  worstMatch: MBTIType;
  quote: string;
  characterImage: string;
  color: string;
}

export interface Scores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface QuizStats {
  totalParticipants: number;
  typeDistribution: Record<MBTIType, number>;
}
