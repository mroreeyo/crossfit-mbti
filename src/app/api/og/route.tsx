import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getOgTypeData, getOgStrings } from '@/lib/og-data';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type')?.toUpperCase() || '';
  const locale = searchParams.get('locale') || 'ko';

  const typeData = getOgTypeData(locale);
  const strings = getOgStrings(locale);
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
            {strings.title}
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#64748b' }}>
            {strings.subtitle}
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
          {strings.footer}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
