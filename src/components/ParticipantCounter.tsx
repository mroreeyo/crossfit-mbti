'use client';

import React, { useEffect, useState } from 'react';

interface ParticipantCounterProps {
  count?: number;
}

export default function ParticipantCounter({ count }: ParticipantCounterProps) {
  const fallbackCount = 0;
  const [participantCount, setParticipantCount] = useState<number>(count ?? fallbackCount);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 외부에서 count를 주입하는 경우 fetch 생략
    if (typeof count === 'number') {
      setParticipantCount(count);
      return;
    }

    const controller = new AbortController();

    async function load(): Promise<void> {
      try {
        const res = await fetch('/api/stats', { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch stats');
        const json = (await res.json()) as { totalParticipants?: unknown };

        if (typeof json.totalParticipants === 'number') {
          setParticipantCount(json.totalParticipants);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load participant count:', error);
        setParticipantCount(fallbackCount);
      }
    }

    void load();
    return () => controller.abort();
  }, [count]);

  return (
    <div className="mt-8 text-sm text-gray-500">
      {participantCount > 0
        ? `👥 ${participantCount.toLocaleString()}명이 참여했어요!`
        : '👥 지금 바로 첫 번째 참여자가 되어보세요!'}
    </div>
  );
}
