import { Question } from '@/types';

export const questions: Question[] = [
  {
    id: 1,
    question: 'WOD 시작 전, 나는?',
    optionA: { text: '옆 사람이랑 수다 떨며 워밍업', type: 'E' },
    optionB: { text: '혼자 조용히 모빌리티 루틴', type: 'I' },
  },
  {
    id: 2,
    question: '새로운 동작을 배울 때?',
    optionA: { text: '일단 해보고 몸으로 익힘', type: 'S' },
    optionB: { text: '코치 시범을 꼼꼼히 관찰 후 시작', type: 'N' },
  },
  {
    id: 3,
    question: '팀 WOD에서 팀원이 힘들어할 때?',
    optionA: { text: '"파이팅!!" 크게 외쳐줌', type: 'T' },
    optionB: { text: '조용히 옆에서 페이스 맞춰줌', type: 'F' },
  },
  {
    id: 4,
    question: 'WOD 프로그래밍은?',
    optionA: { text: '매일 다른 게 좋아, 변화가 재밌지', type: 'J' },
    optionB: { text: '정해진 프로그램을 꾸준히 따르는 게 좋아', type: 'P' },
  },
  {
    id: 5,
    question: 'PR 갱신했을 때 나는?',
    optionA: { text: '박스 전체에 알림 (소리 지름)', type: 'E' },
    optionB: { text: '조용히 노트에 기록하고 속으로 뿌듯', type: 'I' },
  },
  {
    id: 6,
    question: '오늘의 WOD가 "머프(Murph)"라면?',
    optionA: { text: '"오 드디어! 도전이다!"', type: 'S' },
    optionB: { text: '"왜 하필 오늘…" 멘탈 정리 시작', type: 'N' },
  },
  {
    id: 7,
    question: '크로스핏 장비를 살 때?',
    optionA: { text: '성능/리뷰 꼼꼼히 비교 분석', type: 'T' },
    optionB: { text: '디자인/색상이 마음에 들면 바로 구매', type: 'F' },
  },
  {
    id: 8,
    question: '박스에 늦을 것 같을 때?',
    optionA: { text: '그래도 가야지! 늦어도 감', type: 'J' },
    optionB: { text: '오늘은 패스… 내일 일찍 가자', type: 'P' },
  },
  {
    id: 9,
    question: '쉬는 시간에 주로?',
    optionA: { text: '다른 회원들이랑 얘기하며 회복', type: 'E' },
    optionB: { text: '폰 보면서 혼자 쉼', type: 'I' },
  },
  {
    id: 10,
    question: 'WOD 중 전략은?',
    optionA: { text: '전체 라운드를 미리 계산하고 페이스 조절', type: 'S' },
    optionB: { text: '일단 빠르게 시작하고 나중에 생각', type: 'N' },
  },
  {
    id: 11,
    question: '코치가 폼 교정해줄 때?',
    optionA: { text: '논리적으로 이해돼야 적용함', type: 'T' },
    optionB: { text: '코치 말이면 일단 믿고 따름', type: 'F' },
  },
  {
    id: 12,
    question: '크로스핏 대회 나가자는 제안에?',
    optionA: { text: '일정 잡고 트레이닝 계획 즉시 세움', type: 'J' },
    optionB: { text: '"한번 생각해볼게~" 하고 미룸', type: 'P' },
  },
];
