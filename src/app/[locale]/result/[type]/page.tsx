import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getResultByType, ALL_MBTI_TYPES } from '@/data/results';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ResultCard from '@/components/ResultCard';
import TypeStats from '@/components/TypeStats';

export function generateStaticParams() {
  return routing.locales.flatMap(locale =>
    ALL_MBTI_TYPES.map(type => ({ locale, type }))
  );
}

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

type Props = {
  params: Promise<{ locale: string; type: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, type } = await params;
  const resolvedType = type.toUpperCase();
  const result = getResultByType(resolvedType);

  const t = await getTranslations({ locale, namespace: 'metadata' });
  const tResults = await getTranslations({ locale, namespace: 'results' });

  if (!result) return { title: t('notFound') };

  const nickname = tResults(`${result.type}.nickname` as never);
  const description = tResults(`${result.type}.description` as never);

  const siteUrl = getSiteUrl();
  const pageUrl = new URL(`/${locale}/result/${encodeURIComponent(result.type)}`, siteUrl).toString();
  const title = t('resultTitle', { type: result.type, nickname });
  const metaDescription = t('resultDescription', { description });
  const shareDescription = t('shareDescription');
  const twitterTitle = t('twitterTitle', { type: result.type, nickname });
  const ogAltText = t('ogAltText', { type: result.type, nickname });

  return {
    title,
    description: metaDescription,
    openGraph: {
      title,
      description: shareDescription,
      url: pageUrl,
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      images: [
        {
          url: `/api/og?type=${encodeURIComponent(result.type)}&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: ogAltText,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: shareDescription,
      images: [`/api/og?type=${encodeURIComponent(result.type)}&locale=${locale}`],
    },
    alternates: {
      languages: {
        'ko': `${siteUrl}/ko/result/${encodeURIComponent(result.type)}`,
        'en': `${siteUrl}/en/result/${encodeURIComponent(result.type)}`,
      },
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const { locale, type } = await params;
  setRequestLocale(locale);

  const result = getResultByType(type.toUpperCase());

  if (!result) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 flex flex-col items-center justify-center">
      <ResultCard result={result} />

      <TypeStats currentType={result.type} />
    </main>
  );
}
