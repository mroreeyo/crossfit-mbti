// GA4 gtag 래퍼 함수들
// window.gtag 없으면 console.log fallback (개발 환경/광고차단기)

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else {
    console.log(`[Analytics] ${eventName}`, params || '');
  }
}

export function trackQuizStart(): void {
  trackEvent('quiz_start');
}

export function trackQuestionAnswer(questionId: number): void {
  trackEvent('question_answer', { question_id: questionId });
}

export function trackQuizComplete(mbtiType: string): void {
  trackEvent('quiz_complete', { mbti_type: mbtiType });
}

export function trackResultView(mbtiType: string): void {
  trackEvent('result_view', { mbti_type: mbtiType });
}

export function trackShareClick(platform: string): void {
  trackEvent('share_click', { platform });
}

export function trackRetryClick(): void {
  trackEvent('retry_click');
}

export function trackImageDownload(): void {
  trackEvent('image_download');
}
