import ParticipantCounter from '@/components/ParticipantCounter';
import StartQuizButton from '@/components/StartQuizButton';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Mobile fallback background */}
      <div className="landing-bg-fallback" aria-hidden="true" />
      
      {/* Desktop video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/videos/landing-bg-poster.webp"
        preload="metadata"
        className="landing-video absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/landing-bg.webm" type="video/webm" media="(min-width: 769px)" />
        <source src="/videos/landing-bg.mp4" type="video/mp4" media="(min-width: 769px)" />
      </video>

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 max-w-lg w-full flex flex-col items-center">
        <div className="text-6xl mb-6 animate-fadeInDown">
          <div className="animate-bounceY">
            🏋️‍♂️
          </div>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-white animate-fadeInUp delay-200">
          크로스핏 할 때<br />
          나는 <span className="text-emerald-400">어떤 유형</span>일까?
        </h1>
        
        <p className="text-lg text-gray-200 mb-12 animate-fadeInUp delay-400">
          16가지 질문으로 알아보는<br />
          나만의 크로스핏 MBTI
        </p>
        
        <div className="w-full flex justify-center animate-scaleIn delay-600">
          <StartQuizButton />
        </div>
        
        <div className="mt-8 animate-fadeIn delay-800">
          <ParticipantCounter />
        </div>
      </div>
    </main>
  );
}
