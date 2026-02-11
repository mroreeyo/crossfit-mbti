'use client';

import Script from 'next/script';

type KakaoSdk = {
  isInitialized: () => boolean;
  init: (key: string) => void;
};

export default function KakaoScript() {
  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={() => {
        const kakao = (window as unknown as { Kakao?: KakaoSdk }).Kakao;
        if (!kakao || kakao.isInitialized()) return;

        const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        if (!kakaoKey || kakaoKey === 'mock_kakao_key') return;

        kakao.init(kakaoKey);
      }}
    />
  );
}
