export async function captureResultCard(element: HTMLElement): Promise<void> {
  try {
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
      backgroundColor: '#0a0a0a',
    });

    const link = document.createElement('a');
    link.download = 'crossfit-mbti-result.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Image capture failed:', error);
    throw new Error('이미지 저장에 실패했어요. 스크린샷을 이용해주세요!');
  }
}
