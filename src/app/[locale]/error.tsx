'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">문제가 발생했어요 😢</h2>
      <p className="text-gray-500 mb-8">잠시 후 다시 시도해주세요.</p>
      <button
        onClick={reset}
        className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-emerald-500/30"
      >
        다시 시도
      </button>
    </div>
  );
}
