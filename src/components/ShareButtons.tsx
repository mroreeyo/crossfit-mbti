'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
    return `${siteUrl}/result/${type}`;
  }, [siteUrl, type]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsToastVisible(false);
  }, []);

  useEffect(() => {
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
  }, []);

  const handleShareToKakao = useCallback(() => {
    trackShareClick('kakao');
    shareToKakao(type, nickname, siteUrl);
  }, [nickname, siteUrl, type]);

  const handleShareToX = useCallback(() => {
    trackShareClick('x');
    const text = `나의 크로스핏 MBTI는 [${type} - ${nickname}]🔥 너는 뭐 나왔어?`;
    const url = resultUrl || siteUrl;
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(intentUrl, '_blank', 'noopener,noreferrer');
  }, [nickname, resultUrl, siteUrl, type]);

  const handleCopyLink = useCallback(async () => {
    trackShareClick('link');
    const url = resultUrl || siteUrl;
    if (!url) {
      showToast('링크를 만들 수 없어요. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      showToast('링크가 복사되었어요! 📋');
    } catch {
      showToast('복사에 실패했어요. 주소창에서 링크를 복사해주세요.');
    }
  }, [resultUrl, showToast, siteUrl]);

  const handleSaveImage = useCallback(async () => {
    trackShareClick('image');
    if (!resultCardRef.current) {
      showToast('이미지를 저장할 수 없어요. 다시 시도해주세요.');
      return;
    }

    try {
      await captureResultCard(resultCardRef.current);
      trackImageDownload();
      showToast('이미지가 저장되었어요! 📸');
    } catch (error) {
      const message = error instanceof Error ? error.message : '이미지 저장에 실패했어요.';
      showToast(message);
    }
  }, [resultCardRef, showToast]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {isKakaoReady ? (
          <button
            type="button"
            onClick={handleShareToKakao}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-gray-400 hover:bg-gray-50"
          >
            <span aria-hidden>💬</span>
            <span>카카오톡</span>
          </button>
        ) : null}

        <button
          type="button"
          onClick={handleShareToX}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-gray-400 hover:bg-gray-50"
        >
          <span aria-hidden>𝕏</span>
          <span>X</span>
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-gray-400 hover:bg-gray-50"
        >
          <span aria-hidden>🔗</span>
          <span>링크</span>
        </button>

        <button
          type="button"
          onClick={handleSaveImage}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-gray-400 hover:bg-gray-50"
        >
          <span aria-hidden>📸</span>
          <span>이미지</span>
        </button>
      </div>

      <Toast message={toastMessage} isVisible={isToastVisible} onClose={hideToast} />
    </>
  );
};

export default ShareButtons;
