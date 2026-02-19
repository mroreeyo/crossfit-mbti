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

export function shareToKakao(type: string, nickname: string, siteUrl: string): void {
  if (typeof window === 'undefined' || !window.Kakao) {
    return;
  }

  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY?.trim();
  if (!kakaoKey) return;

  if (window.Kakao.isInitialized()) {
    window.Kakao.cleanup();
  }
  window.Kakao.init(kakaoKey);

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `나의 크로스핏 MBTI: ${type} - ${nickname}`,
      description: '크로스핏 할 때 나는 어떤 유형? 지금 테스트 해보세요!',
      imageUrl: `${siteUrl}/api/og?type=${type}`,
      link: {
        mobileWebUrl: `${siteUrl}/result/${type}`,
        webUrl: `${siteUrl}/result/${type}`,
      },
    },
    buttons: [
      {
        title: '나도 테스트하기',
        link: {
          mobileWebUrl: siteUrl,
          webUrl: siteUrl,
        },
      },
    ],
  });
}
