'use client';

import React, { useEffect, useMemo, useState } from 'react';

interface TypeCount {
  type: string;
  count: number;
}

interface StatsResponse {
  totalParticipants: number;
  distribution: TypeCount[];
  isMock?: boolean;
  updatedAt?: string;
}

interface TypeStatsProps {
  currentType: string;
}

const FALLBACK_TOTAL = 0;

const TypeStats: React.FC<TypeStatsProps> = ({ currentType }) => {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/stats', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch stats');
        const json = (await res.json()) as StatsResponse;
        if (!cancelled) setStats(json);
      } catch {
        if (!cancelled) {
          setStats({
            totalParticipants: FALLBACK_TOTAL,
            distribution: [],
            isMock: true,
          });
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  const top5 = useMemo(() => {
    const dist = stats?.distribution ?? [];
    return [...dist].sort((a, b) => b.count - a.count).slice(0, 5);
  }, [stats]);

  const maxCount = useMemo(() => {
    return top5.reduce((max, item) => Math.max(max, item.count), 0);
  }, [top5]);

  return (
    <section className="w-full max-w-lg mt-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-800">유형별 TOP 5</h3>
        <div className="text-xs text-gray-500">
          총 {stats?.totalParticipants?.toLocaleString?.() ?? FALLBACK_TOTAL.toLocaleString()}명
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <div className="h-3 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 rounded bg-gray-200 animate-pulse" />
        </div>
      ) : top5.length === 0 ? (
        <div className="text-center text-sm text-gray-500 py-4">통계를 불러올 수 없어요.</div>
      ) : (
        <div className="space-y-3">
          {top5.map((item) => {
            const isCurrent = item.type.toUpperCase() === currentType.toUpperCase();
            const widthPct = maxCount > 0 ? Math.round((item.count / maxCount) * 100) : 0;

            return (
              <div
                key={item.type}
                className={
                  isCurrent
                    ? 'rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-2'
                    : 'rounded-lg border border-gray-200 bg-gray-50 p-2'
                }
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={isCurrent ? 'text-sm font-bold text-emerald-600' : 'text-sm font-semibold text-slate-700'}>
                    {item.type}
                    {isCurrent ? <span className="ml-2 text-[11px] text-emerald-600/70">(현재)</span> : null}
                  </div>
                  <div className="text-xs text-gray-500">{item.count.toLocaleString()}명</div>
                </div>

                <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
                  <div
                    className={isCurrent ? 'h-full rounded bg-emerald-500' : 'h-full rounded bg-gray-400'}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TypeStats;
