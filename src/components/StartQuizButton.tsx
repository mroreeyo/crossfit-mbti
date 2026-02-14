'use client';

import Link from 'next/link';
import { trackQuizStart } from '@/lib/analytics';

export default function StartQuizButton() {
  return (
    <Link
      href="/quiz"
      className="w-full max-w-xs block"
      onClick={() => trackQuizStart()}
    >
      <div className="w-full bg-emerald-500 text-white font-bold text-xl py-4 rounded-xl shadow-lg hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all duration-300">
        테스트 시작하기
      </div>
    </Link>
  );
}
