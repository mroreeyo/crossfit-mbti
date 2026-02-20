export const ogTypeData: Record<string, { nickname: string; emoji: string; color: string }> = {
  ISTJ: {
    nickname: '기록의 신',
    emoji: '📊',
    color: '#4ECDC4',
  },
  ISFJ: {
    nickname: '박스의 엄마/아빠',
    emoji: '🏠',
    color: '#FF6B9D',
  },
  INFJ: {
    nickname: '크로스핏 철학자',
    emoji: '🧘',
    color: '#C084FC',
  },
  INTJ: {
    nickname: '전략적 프로그래머',
    emoji: '♟️',
    color: '#22D3EE',
  },
  ISTP: {
    nickname: '묵묵한 PR 머신',
    emoji: '🛠️',
    color: '#A3E635',
  },
  ISFP: {
    nickname: '감성 크로스피터',
    emoji: '🎨',
    color: '#FB923C',
  },
  INFP: {
    nickname: '감동 눈물러',
    emoji: '✨',
    color: '#F472B6',
  },
  INTP: {
    nickname: '동작 분석가',
    emoji: '🧪',
    color: '#60A5FA',
  },
  ESTP: {
    nickname: '즉흥 머슬업 도전자',
    emoji: '⚡',
    color: '#EF4444',
  },
  ESFP: {
    nickname: '박스 분위기 메이커',
    emoji: '🥳',
    color: '#FBBF24',
  },
  ENFP: {
    nickname: '열정 오버플로우',
    emoji: '🔥',
    color: '#F97316',
  },
  ENTP: {
    nickname: '규칙 해커',
    emoji: '💡',
    color: '#34D399',
  },
  ESTJ: {
    nickname: 'WOD 타이머 경찰',
    emoji: '👮',
    color: '#6366F1',
  },
  ESFJ: {
    nickname: '단체 WOD 총무',
    emoji: '📋',
    color: '#EC4899',
  },
  ENFJ: {
    nickname: '박스의 코치 (비공식)',
    emoji: '📣',
    color: '#8B5CF6',
  },
  ENTJ: {
    nickname: '크로스핏 대표 CEO',
    emoji: '👔',
    color: '#14B8A6',
  },
};

export const ogTypeDataEn: Record<string, { nickname: string; emoji: string; color: string }> = {
  ISTJ: {
    nickname: 'The Record Keeper',
    emoji: '📊',
    color: '#4ECDC4',
  },
  ISFJ: {
    nickname: 'Box Mom/Dad',
    emoji: '🏠',
    color: '#FF6B9D',
  },
  INFJ: {
    nickname: 'CrossFit Philosopher',
    emoji: '🧘',
    color: '#C084FC',
  },
  INTJ: {
    nickname: 'Strategic Programmer',
    emoji: '♟️',
    color: '#22D3EE',
  },
  ISTP: {
    nickname: 'Silent PR Machine',
    emoji: '🛠️',
    color: '#A3E635',
  },
  ISFP: {
    nickname: 'Aesthetic CrossFitter',
    emoji: '🎨',
    color: '#FB923C',
  },
  INFP: {
    nickname: 'Emotional Cheerleader',
    emoji: '✨',
    color: '#F472B6',
  },
  INTP: {
    nickname: 'Movement Analyst',
    emoji: '🧪',
    color: '#60A5FA',
  },
  ESTP: {
    nickname: 'Spontaneous Muscle-Up Challenger',
    emoji: '⚡',
    color: '#EF4444',
  },
  ESFP: {
    nickname: 'Box Hype Machine',
    emoji: '🥳',
    color: '#FBBF24',
  },
  ENFP: {
    nickname: 'Passion Overflow',
    emoji: '🔥',
    color: '#F97316',
  },
  ENTP: {
    nickname: 'Rule Hacker',
    emoji: '💡',
    color: '#34D399',
  },
  ESTJ: {
    nickname: 'WOD Timer Police',
    emoji: '👮',
    color: '#6366F1',
  },
  ESFJ: {
    nickname: 'Group WOD Organizer',
    emoji: '📋',
    color: '#EC4899',
  },
  ENFJ: {
    nickname: 'Unofficial Box Coach',
    emoji: '📣',
    color: '#8B5CF6',
  },
  ENTJ: {
    nickname: 'CrossFit CEO',
    emoji: '👔',
    color: '#14B8A6',
  },
};

export const ogStrings: Record<string, { title: string; subtitle: string; footer: string }> = {
  ko: {
    title: '나의 크로스핏 MBTI는?',
    subtitle: '16가지 질문으로 알아보는 나만의 크로스핏 MBTI',
    footer: '나의 크로스핏 MBTI는? | crossfit-mbti.vercel.app',
  },
  en: {
    title: "What's Your CrossFit MBTI?",
    subtitle: 'Discover your CrossFit MBTI with 16 questions',
    footer: "What's Your CrossFit MBTI? | crossfit-mbti.vercel.app",
  },
};

export function getOgTypeData(locale: string): Record<string, { nickname: string; emoji: string; color: string }> {
  return locale === 'en' ? ogTypeDataEn : ogTypeData;
}

export function getOgStrings(locale: string): { title: string; subtitle: string; footer: string } {
  return ogStrings[locale] ?? ogStrings.ko;
}
