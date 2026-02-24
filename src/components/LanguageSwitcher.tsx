'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    // Use replace to preserve state (like Zustand store)
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center p-1 bg-slate-50/90 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm">
      <button
        onClick={() => switchLocale('ko')}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
          locale === 'ko'
            ? 'bg-slate-800 text-white shadow-sm'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
        }`}
        aria-label="Switch to Korean"
      >
        한국어
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
          locale === 'en'
            ? 'bg-slate-800 text-white shadow-sm'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
        }`}
        aria-label="Switch to English"
      >
        English
      </button>
    </div>
  );
}
