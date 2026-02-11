import { NextResponse } from 'next/server';

import { supabase } from '@/lib/supabase';

interface TypeCount {
  type: string;
  count: number;
}

interface StatsResponse {
  totalParticipants: number;
  distribution: TypeCount[];
  isMock: boolean;
  updatedAt: string;
}

const ALL_MBTI_TYPES: readonly string[] = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
];

// Mock-first: realistic-ish distribution; total ~= 12,345.
const MOCK_COUNTS: Record<string, number> = {
  ISTJ: 680,
  ISFJ: 790,
  INFJ: 820,
  INTJ: 730,
  ISTP: 640,
  ISFP: 690,
  INFP: 970,
  INTP: 720,
  ESTP: 770,
  ESFP: 760,
  ENFP: 1050,
  ENTP: 880,
  ESTJ: 710,
  ESFJ: 680,
  ENFJ: 740,
  ENTJ: 715,
};

const buildMockStats = (): StatsResponse => {
  const distribution = ALL_MBTI_TYPES.map((type) => ({
    type,
    count: MOCK_COUNTS[type] ?? 0,
  }));
  const totalParticipants = distribution.reduce((sum, item) => sum + item.count, 0);

  return {
    totalParticipants,
    distribution,
    isMock: true,
    updatedAt: new Date().toISOString(),
  };
};

export async function GET() {
  const mock = buildMockStats();

  if (!supabase) {
    return NextResponse.json(mock);
  }

  try {
    const { count, error: countError } = await supabase
      .from('quiz_results')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    const { data, error: dataError } = await supabase
      .from('quiz_results')
      .select('mbti_type');

    if (dataError) throw dataError;

    const byType = new Map<string, number>();
    for (const row of data ?? []) {
      const raw = (row as { mbti_type?: unknown }).mbti_type;
      if (typeof raw !== 'string') continue;
      const normalized = raw.trim().toUpperCase();
      if (!normalized) continue;
      byType.set(normalized, (byType.get(normalized) ?? 0) + 1);
    }

    const distribution: TypeCount[] = ALL_MBTI_TYPES.map((type) => ({
      type,
      count: byType.get(type) ?? 0,
    }));

    const totalParticipants =
      count ?? distribution.reduce((sum, item) => sum + item.count, 0);

    const response: StatsResponse = {
      totalParticipants,
      distribution,
      isMock: false,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Stats API failed; falling back to mock data:', error);
    return NextResponse.json(mock);
  }
}
