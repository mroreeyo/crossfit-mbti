import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Noto_Sans_KR, Inter } from 'next/font/google';
import KakaoScript from '@/components/KakaoScript';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-inter',
});

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const siteUrl = getSiteUrl();

  return {
    title: t('siteTitle'),
    description: t('siteDescription'),
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: t('siteTitle'),
      description: t('siteDescription'),
      url: siteUrl,
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      images: ['/logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('siteTitle'),
      description: t('siteDescription'),
      images: ['/logo.png'],
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const fontClass = locale === 'ko' ? notoSansKr.className : inter.className;

  return (
    <div className={fontClass}>
      <NextIntlClientProvider messages={messages}>
        <LanguageSwitcher />
        {locale === 'ko' && <KakaoScript />}
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
