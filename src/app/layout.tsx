import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Script from 'next/script';
import KakaoScript from '@/components/KakaoScript';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
});

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: '나의 크로스핏 MBTI 테스트 | 크로스핏 유형 찾기',
  description:
    '16가지 질문으로 알아보는 나만의 크로스핏 MBTI 유형! 친구와 함께 테스트하고 결과를 공유해보세요.',
  keywords: ['크로스핏', 'MBTI', '테스트', '크로스핏MBTI', 'WOD', '성격유형'],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: '나의 크로스핏 MBTI 테스트',
    description: '16가지 질문으로 알아보는 나만의 크로스핏 MBTI 유형!',
    url: siteUrl,
    type: 'website',
    locale: 'ko_KR',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '나의 크로스핏 MBTI 테스트',
    description: '16가지 질문으로 알아보는 나만의 크로스핏 MBTI 유형!',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.className} bg-slate-50 text-slate-900 antialiased`}>
        {/* GA4 */}
        {process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA_ID !== 'mock_ga_id' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        <KakaoScript />
        {children}
      </body>
    </html>
  );
}
