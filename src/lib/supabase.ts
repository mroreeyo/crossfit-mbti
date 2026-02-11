import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Mock 모드 감지
const isMockMode =
  !supabaseUrl ||
  supabaseUrl === 'mock_supabase_url' ||
  !supabaseAnonKey ||
  supabaseAnonKey === 'mock_supabase_key';

// Supabase 클라이언트 (mock 모드에서는 null)
export const supabase = isMockMode ? null : createClient(supabaseUrl, supabaseAnonKey);

export { isMockMode };

// 결과 저장 (fire-and-forget)
export async function saveQuizResult(mbtiType: string): Promise<void> {
  if (!supabase) {
    console.log('[Mock] Quiz result saved:', mbtiType);
    return;
  }

  try {
    await supabase.from('quiz_results').insert({ mbti_type: mbtiType });
  } catch (error) {
    console.error('Failed to save quiz result:', error);
  }
}
