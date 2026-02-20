'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { trackQuizStart } from '@/lib/analytics';

export default function StartQuizButton() {
  const t = useTranslations('common');

  return (
    <Link
      href="/quiz"
      className="w-full max-w-xs block"
      onClick={() => trackQuizStart()}
    >
      <div className="w-full bg-emerald-500 text-white font-bold text-xl py-4 rounded-xl shadow-lg hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all duration-300">
        {t('startQuiz')}
      </div>
    </Link>
  );
}
