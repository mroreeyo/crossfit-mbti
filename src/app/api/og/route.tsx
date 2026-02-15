import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type')?.toUpperCase() || '';

  // 결과 데이터를 인라인으로 정의 (Edge Runtime에서 모듈 import 제한)
  // 16유형의 nickname, emoji, color만 필요
  const typeData: Record<string, { nickname: string; emoji: string; color: string }> = {
    ISTJ: { nickname: '기록의 신', emoji: '📊', color: '#4ECDC4' },
    ISFJ: { nickname: '박스의 엄마/아빠', emoji: '🏠', color: '#FF6B9D' },
    INFJ: { nickname: '크로스핏 철학자', emoji: '🧘', color: '#C084FC' },
    INTJ: { nickname: '전략적 프로그래머', emoji: '♟️', color: '#22D3EE' },
    ISTP: { nickname: '묵묵한 PR 머신', emoji: '🛠️', color: '#A3E635' },
    ISFP: { nickname: '감성 크로스피터', emoji: '🎨', color: '#FB923C' },
    INFP: { nickname: '감동 눈물러', emoji: '✨', color: '#F472B6' },
    INTP: { nickname: '동작 분석가', emoji: '🧪', color: '#60A5FA' },
    ESTP: { nickname: '즉흥 머슬업 도전자', emoji: '⚡', color: '#EF4444' },
    ESFP: { nickname: '박스 분위기 메이커', emoji: '🥳', color: '#FBBF24' },
    ENFP: { nickname: '열정 오버플로우', emoji: '🔥', color: '#F97316' },
    ENTP: { nickname: '규칙 해커', emoji: '💡', color: '#34D399' },
    ESTJ: { nickname: 'WOD 타이머 경찰', emoji: '👮', color: '#6366F1' },
    ESFJ: { nickname: '단체 WOD 총무', emoji: '📋', color: '#EC4899' },
    ENFJ: { nickname: '박스의 코치 (비공식)', emoji: '📣', color: '#8B5CF6' },
    ENTJ: { nickname: '크로스핏 대표 CEO', emoji: '👔', color: '#14B8A6' },
  };

  const data = typeData[type];

  // 유효하지 않은 유형이면 기본 OG 이미지
  if (!data) {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#f8fafc',
            color: '#1e293b',
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ display: 'flex', fontSize: 80, marginBottom: 20 }}>🏋️‍♂️</div>
          <div style={{ display: 'flex', fontSize: 48, fontWeight: 'bold', marginBottom: 16 }}>
            나의 크로스핏 MBTI는?
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#64748b' }}>
            16가지 질문으로 알아보는 나만의 크로스핏 MBTI
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#f8fafc',
          color: '#1e293b',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* 배경 장식 */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `${data.color}15`,
            filter: 'blur(80px)',
          }}
        />

        <div style={{ display: 'flex', fontSize: 100, marginBottom: 20 }}>{data.emoji}</div>
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 'bold', color: data.color, marginBottom: 8 }}>
          {type}
        </div>
        <div style={{ display: 'flex', fontSize: 36, fontWeight: 'bold', marginBottom: 32 }}>
          &quot;{data.nickname}&quot;
        </div>
        <div style={{ display: 'flex', fontSize: 20, color: '#64748b' }}>
          나의 크로스핏 MBTI는? | crossfit-mbti.vercel.app
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
