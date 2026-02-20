import { getTranslations, setRequestLocale } from 'next-intl/server';
import ParticipantCounter from '@/components/ParticipantCounter';
import StartQuizButton from '@/components/StartQuizButton';
import LandingBackground from '@/components/LandingBackground';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('landing');
  const commonT = await getTranslations('common');

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center overflow-hidden">
      <LandingBackground />

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 max-w-lg w-full flex flex-col items-center">
        <div className="text-6xl mb-6 animate-fadeInDown">
          <div className="animate-bounceY">
            {commonT('heroEmoji')}
          </div>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-white animate-fadeInUp delay-200">
          {t.rich('heroTitle', {
            highlight: (chunks) => <span className="text-emerald-400">{chunks}</span>,
          })}
        </h1>
        
        <p className="text-lg text-gray-200 mb-12 animate-fadeInUp delay-400">
          {t('heroSubtitle')}
        </p>
        
        <div className="w-full flex justify-center animate-scaleIn delay-600">
          <StartQuizButton />
        </div>
        
        <div className="mt-8 animate-fadeIn delay-800">
          <ParticipantCounter />
        </div>
      </div>
    </main>
  );
}
