'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

import { captureResultCard } from '@/lib/imageCapture';
import { isKakaoAvailable, shareToKakao } from '@/lib/kakaoShare';
import { trackImageDownload, trackShareClick } from '@/lib/analytics';
import Toast from '@/components/Toast';

interface ShareButtonsProps {
  type: string;
  nickname: string;
  resultCardRef: React.RefObject<HTMLDivElement>;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ type, nickname, resultCardRef }) => {
  const t = useTranslations();
  const locale = useLocale();
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const siteUrl = useMemo(() => {
    const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (envSiteUrl) return envSiteUrl;
    if (typeof window !== 'undefined') return window.location.origin.trim();
    return '';
  }, []);

  const resultUrl = useMemo(() => {
    if (!siteUrl) return '';
    return `${siteUrl}/${locale}/result/${type}`;
  }, [siteUrl, locale, type]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsToastVisible(false);
  }, []);

  useEffect(() => {
    if (locale !== 'ko') return;

    let attempts = 0;
    const maxAttempts = 10; // ~5s (500ms * 10)

    const check = () => {
      const available = isKakaoAvailable();
      setIsKakaoReady(available);
      return available;
    };

    if (check()) return;

    const intervalId = window.setInterval(() => {
      attempts += 1;
      if (check() || attempts >= maxAttempts) {
        window.clearInterval(intervalId);
      }
    }, 500);

    return () => window.clearInterval(intervalId);
  }, [locale]);

  const handleShareToKakao = useCallback(() => {
    trackShareClick('kakao');
    shareToKakao(type, nickname, siteUrl, locale, {
      title: t('kakao.shareTitle', { type, nickname }),
      description: t('kakao.shareDescription'),
      buttonTitle: t('kakao.buttonTitle'),
    });
  }, [nickname, siteUrl, type, locale, t]);

  const handleShareToX = useCallback(() => {
    trackShareClick('x');
    const text = t('share.xShareText', { type, nickname });
    const url = resultUrl || siteUrl;
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(intentUrl, '_blank', 'noopener,noreferrer');
  }, [nickname, resultUrl, siteUrl, type, t]);

  const handleCopyLink = useCallback(async () => {
    trackShareClick('link');
    const url = resultUrl || siteUrl;
    if (!url) {
      showToast(t('share.linkCopyError'));
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      showToast(t('share.linkCopySuccess'));
    } catch {
      showToast(t('share.copyError'));
    }
  }, [resultUrl, showToast, siteUrl, t]);

  const handleSaveImage = useCallback(async () => {
    trackShareClick('image');
    if (!resultCardRef.current) {
      showToast(t('share.imageSaveError'));
      return;
    }

    try {
      await captureResultCard(resultCardRef.current, t('share.imageCaptureError'));
      trackImageDownload();
      showToast(t('share.imageSaveSuccess'));
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : t('share.imageSaveFailure');
      showToast(message);
    }
  }, [resultCardRef, showToast, t]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {locale === 'ko' && isKakaoReady ? (
          <button
            type="button"
            onClick={handleShareToKakao}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-gray-400 hover:bg-gray-50"
          >
            <span aria-hidden>💬</span>
            <span>{t('share.kakao')}</span>
          </button>
        ) : null}

        <button
          type="button"
          onClick={handleShareToX}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-gray-400 hover:bg-gray-50"
        >
          <span aria-hidden>𝕏</span>
          <span>{t('share.x')}</span>
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-gray-400 hover:bg-gray-50"
        >
          <span aria-hidden>🔗</span>
          <span>{t('share.link')}</span>
        </button>

        <button
          type="button"
          onClick={handleSaveImage}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-gray-400 hover:bg-gray-50"
        >
          <span aria-hidden>📸</span>
          <span>{t('share.image')}</span>
        </button>
      </div>

      <Toast message={toastMessage} isVisible={isToastVisible} onClose={hideToast} />
    </>
  );
};

export default ShareButtons;
