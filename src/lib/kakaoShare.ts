declare global {
  interface Window {
    Kakao: any;
  }
}

export function isKakaoAvailable(): boolean {
  return (
    typeof window !== 'undefined' &&
    !!window.Kakao &&
    typeof window.Kakao.isInitialized === 'function' &&
    window.Kakao.isInitialized()
  );
}

interface KakaoShareStrings {
  title: string;
  description: string;
  buttonTitle: string;
}

export function shareToKakao(
  type: string,
  nickname: string,
  siteUrl: string,
  locale: string,
  strings: KakaoShareStrings,
): void {
  if (typeof window === 'undefined' || !window.Kakao) {
    return;
  }

  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY?.trim();
  const normalizedSiteUrl = siteUrl.trim();
  if (!kakaoKey) return;
  if (!normalizedSiteUrl) return;

  if (window.Kakao.isInitialized()) {
    window.Kakao.cleanup();
  }
  window.Kakao.init(kakaoKey);

  const resultPath = `${normalizedSiteUrl}/${locale}/result/${type}`;
  const homePath = `${normalizedSiteUrl}/${locale}`;

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: strings.title,
      description: strings.description,
      imageUrl: `${normalizedSiteUrl}/api/og?type=${type}&locale=${locale}`,
      link: {
        mobileWebUrl: resultPath,
        webUrl: resultPath,
      },
    },
    buttons: [
      {
        title: strings.buttonTitle,
        link: {
          mobileWebUrl: homePath,
          webUrl: homePath,
        },
      },
    ],
  });
}
