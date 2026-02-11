import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold text-neon-pink mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        요청하신 페이지가 존재하지 않거나, 잘못된 경로로 접근하셨습니다.
      </p>
      <Link 
        href="/"
        className="px-8 py-3 bg-neon-green text-black font-bold rounded-xl hover:bg-opacity-90 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
