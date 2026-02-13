'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function QuizError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">퀴즈 중 문제가 발생했어요</h2>
      <p className="text-gray-500 mb-8">처음부터 다시 시작해주세요.</p>
      <Link
        href="/quiz"
        className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-emerald-500/30"
      >
        처음부터 다시
      </Link>
    </div>
  );
}
