import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getResultByType, ALL_MBTI_TYPES } from '@/data/results';
import ResultCard from '@/components/ResultCard';
import TypeStats from '@/components/TypeStats';

export function generateStaticParams() {
  return ALL_MBTI_TYPES.map((type) => ({ type }));
}

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export function generateMetadata({ params }: { params: { type: string } }): Metadata {
  const resolvedType = params.type.toUpperCase();
  const result = getResultByType(resolvedType);
  if (!result) return { title: '결과를 찾을 수 없습니다' };

  const siteUrl = getSiteUrl();
  const pageUrl = new URL(`/result/${encodeURIComponent(result.type)}`, siteUrl).toString();
  const title = `나의 크로스핏 MBTI: ${result.type} - ${result.nickname} 🔥`;
  const description = `크로스핏 할 때 나는 어떤 유형? ${result.description}`;
  const shareDescription = '크로스핏 할 때 나는 어떤 유형? 지금 테스트 해보세요!';
  const twitterTitle = `나의 크로스핏 MBTI: ${result.type} - ${result.nickname}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description: shareDescription,
      url: pageUrl,
      type: 'website',
      images: [
        {
          url: `/api/og?type=${encodeURIComponent(result.type)}`,
          width: 1200,
          height: 630,
          alt: `${result.type} - ${result.nickname}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: shareDescription,
      images: [`/api/og?type=${encodeURIComponent(result.type)}`],
    },
  };
}

export default function ResultPage({ params }: { params: { type: string } }) {
  const result = getResultByType(params.type.toUpperCase());

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
