import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// 한글 폰트는 Google Fonts에서 동적으로 fetch
// Noto Sans KR은 크기가 크므로 Google Fonts API에서 서브셋을 가져옴

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

  // 한글 폰트 로드 (Google Fonts에서 Noto Sans KR)
  let fontData: ArrayBuffer | undefined;
  try {
    const fontResponse = await fetch(
      'https://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLTq8H4hfeE.woff'
    );
    fontData = await fontResponse.arrayBuffer();
  } catch {
    // 폰트 로드 실패 시 기본 폰트 사용
  }

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
            backgroundColor: '#0a0a0a',
            color: 'white',
            fontFamily: '"Noto Sans KR", sans-serif',
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 20 }}>🏋️‍♂️</div>
          <div style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 16 }}>
            나의 크로스핏 MBTI는?
          </div>
          <div style={{ fontSize: 24, color: '#9ca3af' }}>
            12가지 질문으로 알아보는 나만의 크로스핏 MBTI
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        ...(fontData
          ? {
              fonts: [
                {
                  name: 'Noto Sans KR',
                  data: fontData,
                  style: 'normal',
                  weight: 700,
                },
              ],
            }
          : {}),
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
          backgroundColor: '#0a0a0a',
          color: 'white',
          fontFamily: '"Noto Sans KR", sans-serif',
          position: 'relative',
        }}
      >
        {/* 배경 장식 */}
        <div
          style={{
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

        <div style={{ fontSize: 100, marginBottom: 20 }}>{data.emoji}</div>
        <div style={{ fontSize: 72, fontWeight: 'bold', color: data.color, marginBottom: 8 }}>
          {type}
        </div>
        <div style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 32 }}>
          &quot;{data.nickname}&quot;
        </div>
        <div style={{ fontSize: 20, color: '#9ca3af' }}>
          나의 크로스핏 MBTI는? | crossfit-mbti.kr
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      ...(fontData
        ? {
            fonts: [
              {
                name: 'Noto Sans KR',
                data: fontData,
                style: 'normal',
                weight: 700,
              },
            ],
          }
        : {}),
    }
  );
}
