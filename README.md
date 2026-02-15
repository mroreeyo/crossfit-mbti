# 🏋️‍♂️ 크로스핏 MBTI 테스트

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=flat-square&logo=vercel)](https://vercel.com/)

> **"크로스핏 할 때, 나는 어떤 유형일까?"**
>
> 16가지 질문으로 알아보는 나만의 크로스핏 MBTI 유형 테스트

🔗 **[지금 테스트하기 → crossfit-mbti.vercel.app](https://crossfit-mbti.vercel.app)**

---

## ✨ 주요 기능

- 🧠 **16문항 MBTI 퀴즈** — E/I, S/N, T/F, J/P 축 기반 정교한 질문 설계
- 🎨 **AI 생성 캐릭터 이미지** — 각 유형별 Midjourney로 제작한 고퀄리티 캐릭터
- 💬 **소셜 공유** — 카카오톡, X(Twitter), 링크 복사
- 🖼️ **동적 OG 이미지** — 유형별 맞춤 공유 이미지 자동 생성
- 📊 **참여자 카운터** — Supabase 연동 실시간 참여 수 집계
- 🎬 **배경 동영상** — 데스크탑 영상 재생 / 모바일 정적 이미지 최적화
- 🎯 **GA4 애널리틱스** — 퀴즈 시작, 답변, 완료, 공유 전 과정 추적

---

## 🏆 16가지 크로스핏 유형

| 유형 | 별명 | 한 줄 소개 |
|:---:|:---|:---|
| **ISTJ** | 📊 기록의 신 | 모든 WOD를 소수점까지 기록하는 인간 데이터베이스 |
| **ISFJ** | 🏠 박스의 엄마/아빠 | 신입 이름 다 외우고, 구급상자 위치 꿰뚫는 수호자 |
| **INFJ** | 🧘 크로스핏 철학자 | 운동을 통해 자아를 성찰하는 고독한 수행자 |
| **INTJ** | ♟️ 전략적 프로그래머 | WOD 효율을 극대화하는 전략 설계자 |
| **ISTP** | 🛠️ 묵묵한 PR 머신 | 말없이 나타나 엄청난 무게 들고 사라지는 장인 |
| **ISFP** | 🎨 감성 크로스피터 | 운동복 코디와 박스 분위기를 중시하는 낭만파 |
| **INFP** | ✨ 감동 눈물러 | 동료의 PR에 본인이 더 감동받는 공감 요정 |
| **INTP** | 🧪 동작 분석가 | 역학적으로 완벽한 자세를 연구하는 이론 전문가 |
| **ESTP** | ⚡ 즉흥 머슬업 도전자 | "일단 해보죠!" 정신으로 무장한 행동파 |
| **ESFP** | 🥳 박스 분위기 메이커 | 모든 행사와 수다의 중심, 핵인싸 |
| **ENFP** | 🔥 열정 오버플로우 | 지치지 않는 텐션으로 에너지를 끌어올리는 비타민 |
| **ENTP** | 💡 규칙 해커 | 효율적인 동작을 끊임없이 연구하는 혁신가 |
| **ESTJ** | 👮 WOD 타이머 경찰 | 노렙은 용납 못 한다! 엄격한 기준의 관리자 |
| **ESFJ** | 📋 단체 WOD 총무 | 회식과 단체복 주문을 도맡는 살림꾼 |
| **ENFJ** | 📣 박스의 코치 (비공식) | 코치님보다 더 열심히 응원하는 열정 리더 |
| **ENTJ** | 👔 크로스핏 대표 CEO | 박스 운영까지 고민하는 야망의 리더 |

---

## 🛠 기술 스택

| 영역 | 기술 |
|:---|:---|
| **프레임워크** | Next.js 14 (App Router) |
| **언어** | TypeScript |
| **스타일링** | Tailwind CSS |
| **상태관리** | Zustand |
| **데이터베이스** | Supabase |
| **애니메이션** | Framer Motion, CSS Keyframes |
| **애널리틱스** | Google Analytics 4 |
| **배포** | Vercel |

---

## 📂 프로젝트 구조

```
src/
├── app/                # Next.js App Router
│   ├── page.tsx             # 랜딩 페이지
│   ├── quiz/                # 퀴즈 페이지
│   ├── result/[type]/       # 결과 페이지 (16가지)
│   └── api/og/              # OG 이미지 생성 API
├── components/         # UI 컴포넌트
├── data/               # 질문 & 결과 데이터
├── lib/                # 유틸리티 (analytics, kakao, supabase)
├── stores/             # Zustand 상태관리
└── types/              # TypeScript 타입 정의
```

---

## 🚀 로컬 실행

```bash
# 1. 클론
git clone https://github.com/mroreeyo/crossfit-mbti.git
cd crossfit-mbti

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정 (.env.local)
cp .env.example .env.local
# 각 값을 실제 키로 변경

# 4. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 🔐 환경 변수

| 변수명 | 설명 |
|:---|:---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 익명 키 |
| `NEXT_PUBLIC_KAKAO_JS_KEY` | 카카오 JavaScript 앱 키 |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 측정 ID |
| `NEXT_PUBLIC_SITE_URL` | 사이트 URL (배포 시) |

---

## 🔧 트러블슈팅

개발 과정에서 만난 주요 이슈와 해결 방법을 기록합니다.

### 1. iOS Safari 배경 동영상 자동재생 안 됨

**증상**: 데스크탑에서는 정상 재생되지만, iPhone Safari에서 배경 동영상이 첫 프레임에서 멈춤

**원인**: iOS Safari는 배터리 절약을 위해 동영상 자동재생에 제한이 있음. CSS `display: none`으로 숨겨진 video 요소는 autoplay가 차단됨

**해결**:
- `LandingBackground` 클라이언트 컴포넌트를 생성하여 `useRef` + `video.play()` 강제 호출
- `touchstart`/`click` 이벤트 리스너를 fallback으로 추가
- `preload="auto"`로 변경하여 즉시 로딩

```tsx
// LandingBackground.tsx
useEffect(() => {
  const video = videoRef.current;
  if (!video) return;
  video.muted = true;
  video.play().catch(() => {});
  document.addEventListener('touchstart', playVideo, { once: true });
}, []);
```

---

### 2. OG 이미지 생성 실패 (content-length: 0)

**증상**: 카카오톡 공유 시 이미지가 표시되지 않음. `/api/og?type=ESFJ` 응답이 빈 이미지 (0 bytes)

**원인**: Google Fonts의 Noto Sans KR 폰트 URL이 404 반환. 폰트 로드 실패 시 `@vercel/og`의 `ImageResponse`가 빈 응답을 생성함

**해결**:
- `@vercel/og` → Next.js 14 내장 `next/og`의 `ImageResponse`로 교체
- 외부 폰트 의존성 완전 제거, 기본 `sans-serif` 폰트 사용
- 모든 `<div>`에 `display: 'flex'` 명시 (next/og 요구사항)

```tsx
// 변경 전
import { ImageResponse } from '@vercel/og';
const fontResponse = await fetch('https://fonts.gstatic.com/...'); // 404!

// 변경 후
import { ImageResponse } from 'next/og';
// 외부 폰트 의존성 제거, fontFamily: 'sans-serif'
```

---

### 3. 카카오톡 공유 에러 (Error Code 4011)

**증상**: 카카오톡 공유 버튼 클릭 시 "요청 실패 - 잘못되었거나 삭제된 앱 키를 사용했습니다" 에러

**원인**: 카카오 개발자 콘솔에서 앱 설정 미완료 (KOE004 에러)

**해결**:
1. 카카오 개발자 콘솔 → 앱 설정 → **플랫폼**에 `https://crossfit-mbti.vercel.app` 도메인 등록
2. **카카오 로그인 활성화** (ON)
3. **Redirect URI** 등록
4. Vercel 환경변수에 `NEXT_PUBLIC_KAKAO_JS_KEY` 추가 후 재배포

---

### 4. Vercel 배포 후 변경사항 미반영

**증상**: `vercel --prod` 실행 후에도 이전 버전이 표시됨

**원인**: Vercel의 Production 도메인과 새 배포 URL이 자동으로 연결되지 않는 경우 발생

**해결**:
```bash
# 강제 재배포
vercel --prod --force

# 새 배포 URL을 production 도메인에 연결
vercel alias [새배포URL] crossfit-mbti.vercel.app
```

---

### 5. 캐릭터 이미지 용량 최적화

**증상**: Midjourney로 생성한 16개 PNG 이미지의 총 용량이 너무 큼

**원인**: 원본 PNG 파일은 각 2~4MB로, 16개 합산 약 50MB

**해결**:
- PNG → WebP 변환으로 **97% 용량 감소**
- Next.js `Image` 컴포넌트 사용 (자동 최적화 + lazy loading)

```bash
# WebP 변환 (cwebp 사용)
for f in *.png; do cwebp -q 80 "$f" -o "${f%.png}.webp"; done
```

---

## 📄 라이선스

MIT License
