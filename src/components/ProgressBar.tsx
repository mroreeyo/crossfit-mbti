import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-end mb-2">
        <span className="text-neon-green font-bold text-sm tracking-wider">WOD PROGRESS</span>
        <span className="text-gray-400 text-sm font-mono">
          {current} <span className="text-gray-600">/</span> {total}
        </span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
        <div
          className="h-full bg-neon-green shadow-[0_0_10px_#39FF14] transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
