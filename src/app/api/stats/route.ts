import { NextResponse } from 'next/server';

import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

// Mock-first: no fake data when Supabase is not connected.
const MOCK_COUNTS: Record<string, number> = {
  ISTJ: 0,
  ISFJ: 0,
  INFJ: 0,
  INTJ: 0,
  ISTP: 0,
  ISFP: 0,
  INFP: 0,
  INTP: 0,
  ESTP: 0,
  ESFP: 0,
  ENFP: 0,
  ENTP: 0,
  ESTJ: 0,
  ESFJ: 0,
  ENFJ: 0,
  ENTJ: 0,
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

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
};

export async function GET() {
  const mock = buildMockStats();

  if (!supabase) {
    return NextResponse.json(mock, { headers: NO_STORE_HEADERS });
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

    return NextResponse.json(response, { headers: NO_STORE_HEADERS });
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Stats API failed; falling back to mock data:', error);
    return NextResponse.json(mock, { headers: NO_STORE_HEADERS });
  }
}
