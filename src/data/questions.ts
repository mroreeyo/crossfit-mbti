import { Question } from '@/types';

export const questions: Question[] = [
  {
    id: 1,
    question: '워밍업 시간, 나는?',
    optionA: { text: '옆 사람이랑 어제 WOD 얘기하며 입운동', type: 'E' },
    optionB: { text: '구석에서 혼자 폼롤러랑 대화 중', type: 'I' },
  },
  {
    id: 2,
    question: "코치가 '오늘 스내치 합니다' 했을 때",
    optionA: { text: '일단 바벨 잡고 몸으로 부딪혀봄', type: 'S' },
    optionB: { text: '코치님 궤적 하나하나 뇌에 저장 중', type: 'N' },
  },
  {
    id: 3,
    question: '팀 WOD에서 옆 사람이 죽어갈 때 나는?',
    optionA: { text: '"3라운드 남았어, 여기서 끊지 마!" 논리적으로 독려', type: 'T' },
    optionB: { text: '말없이 옆에서 같이 뛰어줌', type: 'F' },
  },
  {
    id: 4,
    question: '오늘의 WOD가 뭔지 궁금할 때?',
    optionA: { text: '정해진 프로그램을 꾸준히 따르는 게 좋아', type: 'J' },
    optionB: { text: '매일 다른 게 좋아, 변화가 재밌지', type: 'P' },
  },
  {
    id: 5,
    question: '드디어 PR 깼다!! 나는?',
    optionA: { text: '박스 떠나가라 소리 지르고 인스타 박제', type: 'E' },
    optionB: { text: '조용히 칠판에 적고 혼자 흐뭇', type: 'I' },
  },
  {
    id: 6,
    question: "보드에 'Murph' 적혀있는 거 봤을 때",
    optionA: { text: '오히려 좋아, 오늘 제대로 털어보자', type: 'S' },
    optionB: { text: '20라운드... 이걸 언제 다 하지? 시뮬레이션 돌림', type: 'N' },
  },
  {
    id: 7,
    question: '나노 살 때 나는?',
    optionA: { text: '접지력, 쿠셔닝, 리뷰 싹 다 비교', type: 'T' },
    optionB: { text: '색깔 예쁘면 장땡, 일단 결제', type: 'F' },
  },
  {
    id: 8,
    question: '알람 울렸는데 오늘 WOD가 쓰러스터...',
    optionA: { text: '버피 30개 하더라도 일단 박스로 출발', type: 'J' },
    optionB: { text: '이건 신의 계시다, 오늘은 휴식', type: 'P' },
  },
  {
    id: 9,
    question: 'WOD 끝나고 쉬는 시간, 나는?',
    optionA: { text: "누워서 옆 사람이랑 '오늘 진짜 죽을 뻔' 수다", type: 'E' },
    optionB: { text: '구석에서 영혼 가출한 채로 로잉 머신만 봄', type: 'I' },
  },
  {
    id: 10,
    question: 'WOD 시작 10초 전, 내 머릿속은?',
    optionA: { text: '일단 빠르게 시작하고 나중에 생각', type: 'S' },
    optionB: { text: '전체 라운드를 미리 계산하고 페이스 조절', type: 'N' },
  },
  {
    id: 11,
    question: "코치가 '그 자세 아닌데' 할 때",
    optionA: { text: '왜 안 되는지 해부학적으로 이해해야 함', type: 'T' },
    optionB: { text: '코치님 눈빛만 봐도 바로 자세 고침', type: 'F' },
  },
  {
    id: 12,
    question: "같이 운동하던 형이 '로컬 대회 나가자' 할 때",
    optionA: { text: 'D-day 잡고 바로 식단이랑 훈련 계획 짬', type: 'J' },
    optionB: { text: '오 재밌겠다! 근데 일단 오늘 WOD부터 하고', type: 'P' },
  },
];
