import { useState, useCallback, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import HeartParticles from '@/components/HeartParticles';
import TypewriterText from '@/components/TypewriterText';
import romanticMemory1 from '@/assets/romantic-memory-1.jpg';
import romanticMemory2 from '@/assets/romantic-memory-2.jpg';
import romanticImage3 from '@/assets/romantic image 3.jpg';
import romanticImage4 from '@/assets/romantic-image-4.jpeg';

const TOTAL_SLIDES = 6;

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/src/pages/WhatsApp Audio 2026-02-14 at 12.56.45 AM.mpeg');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const startMusic = useCallback(() => {
    if (!musicPlaying && audioRef.current) {
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  }, [musicPlaying]);

  const nextSlide = useCallback(() => {
    if (transitioning || currentSlide >= TOTAL_SLIDES - 1) return;
    startMusic();
    setTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(prev => prev + 1);
      setSlideKey(prev => prev + 1);
      setTransitioning(false);
    }, 600);
  }, [transitioning, currentSlide, startMusic]);

  const fireConfetti = useCallback(() => {
    const duration = 5000;
    const end = Date.now() + duration;
    const colors = ['#c8647a', '#d4a373', '#e6b8a2', '#ff6b8a', '#ffd700'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors,
      shapes: ['circle'],
      scalar: 1.2,
    });
  }, []);

  const handleYes = useCallback(() => {
    setAnswered(true);
    fireConfetti();
  }, [fireConfetti]);

  const handleNoHover = useCallback(() => {
    if (!noButtonRef.current) return;
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    noButtonRef.current.style.position = 'fixed';
    noButtonRef.current.style.left = `${x}px`;
    noButtonRef.current.style.top = `${y}px`;
    noButtonRef.current.style.transition = 'all 0.3s ease';
  }, []);

  const renderSlide = (index: number) => {
    const isActive = currentSlide === index && !transitioning;

    switch (index) {
      case 0:
        return (
          <div className={`flex flex-col items-center justify-center min-h-screen px-6 ${isActive ? 'slide-active' : ''}`}>
            <div className="glass-card p-8 md:p-14 max-w-2xl text-center">
              <div className="text-5xl mb-6">💕</div>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 shimmer-text">
                <TypewriterText text="A Story Written in the Stars" speed={70} key={slideKey} />
              </h1>
              <div className="romantic-divider" />
              <p className="font-body text-lg md:text-xl text-muted-foreground mt-6 leading-relaxed">
                Every love story is beautiful, but ours is my favorite. 
                Take this journey with me...
              </p>
              <button
                onClick={nextSlide}
                className="mt-10 px-10 py-4 rounded-lg bg-primary text-primary-foreground font-display text-lg tracking-wide glow-button"
              >
                Begin Our Story →
              </button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className={`flex flex-col items-center justify-center min-h-screen px-6 ${isActive ? 'slide-active' : ''}`}>
            <div className="glass-card p-6 md:p-12 max-w-3xl text-center">
              <div className="photo-frame mb-8 float-animation inline-block">
                <img
                  src={romanticMemory1}
                  alt="Our beautiful memory"
                  className="w-72 h-72 md:w-80 md:h-80 object-cover"
                />
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold mb-3 text-foreground">
                <TypewriterText text="From That First Moment..." speed={65} key={slideKey} />
              </h2>
              <div className="romantic-divider" />
              <p className="font-body text-lg text-muted-foreground mt-4 leading-relaxed max-w-lg mx-auto">
                The moment I saw you, I knew my life was about to change forever.
                Your smile lit up every dark corner of my world.
              </p>
              <button
                onClick={nextSlide}
                className="mt-8 px-10 py-4 rounded-lg bg-primary text-primary-foreground font-display text-lg tracking-wide glow-button"
              >
                Continue →
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={`flex flex-col items-center justify-center min-h-screen px-6 ${isActive ? 'slide-active' : ''}`}>
            <div className="glass-card p-6 md:p-12 max-w-3xl text-center">
              <div className="photo-frame mb-8 float-delayed inline-block">
                <img
                  src={romanticMemory2}
                  alt="Another precious memory"
                  className="w-72 h-72 md:w-80 md:h-80 object-cover"
                />
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold mb-3 text-foreground">
                <TypewriterText text="Every Day With You..." speed={65} key={slideKey} />
              </h2>
              <div className="romantic-divider" />
              <p className="font-body text-lg text-muted-foreground mt-4 leading-relaxed max-w-lg mx-auto">
                Is a page in the most beautiful story ever written.
                You are my today and all of my tomorrows.
              </p>
              <button
                onClick={nextSlide}
                className="mt-8 px-10 py-4 rounded-lg bg-primary text-primary-foreground font-display text-lg tracking-wide glow-button"
              >
                One More Thing... →
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`flex flex-col items-center justify-center min-h-screen px-6 ${isActive ? 'slide-active' : ''}`}>
            <div className="glass-card p-6 md:p-12 max-w-3xl text-center">
              <div className="photo-frame mb-8 float-animation inline-block">
                <img
                  src={romanticImage3}
                  alt="Our third precious memory"
                  className="w-72 h-72 md:w-80 md:h-80 object-cover"
                />
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold mb-3 text-foreground">
                <TypewriterText text="That Special Moment..." speed={65} key={slideKey} />
              </h2>
              <div className="romantic-divider" />
              <p className="font-body text-lg text-muted-foreground mt-4 leading-relaxed max-w-lg mx-auto">
                When we shared that magical day together.
                Every moment with you feels like a dream I never want to wake from.
              </p>
              <button
                onClick={nextSlide}
                className="mt-8 px-10 py-4 rounded-lg bg-primary text-primary-foreground font-display text-lg tracking-wide glow-button"
              >
                Another Memory... →
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={`flex flex-col items-center justify-center min-h-screen px-6 ${isActive ? 'slide-active' : ''}`}>
            <div className="glass-card p-6 md:p-12 max-w-3xl text-center">
              <div className="photo-frame mb-8 float-delayed inline-block">
                <img
                  src={romanticImage4}
                  alt="Our fourth beautiful memory"
                  className="w-72 h-72 md:w-80 md:h-80 object-cover"
                />
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold mb-3 text-foreground">
                <TypewriterText text="Our Adventures Together..." speed={65} key={slideKey} />
              </h2>
              <div className="romantic-divider" />
              <p className="font-body text-lg text-muted-foreground mt-4 leading-relaxed max-w-lg mx-auto">
                From our first adventure to every moment we've shared.
                You make every day an unforgettable journey.
              </p>
              <button
                onClick={nextSlide}
                className="mt-8 px-10 py-4 rounded-lg bg-primary text-primary-foreground font-display text-lg tracking-wide glow-button"
              >
                Now For The Big Question... →
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className={`flex flex-col items-center justify-center min-h-screen px-6 ${isActive ? 'slide-active' : ''}`}>
            {!answered ? (
              <div className="glass-card p-8 md:p-14 max-w-2xl text-center">
                <div className="text-6xl mb-6">💍</div>
                <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 shimmer-text">
                  <TypewriterText text="Will You Be Mine Forever?" speed={80} key={slideKey} />
                </h1>
                <div className="romantic-divider" />
                <p className="font-body text-lg text-muted-foreground mt-4 mb-10 leading-relaxed">
                  You are my heart, my soul, my everything.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <button
                    onClick={handleYes}
                    className="px-14 py-5 rounded-lg bg-primary text-primary-foreground font-display text-2xl tracking-wide glow-button"
                  >
                    YES! 💕
                  </button>
                  <button
                    ref={noButtonRef}
                    onMouseEnter={handleNoHover}
                    onTouchStart={handleNoHover}
                    className="px-8 py-3 rounded-lg border border-muted-foreground/30 text-muted-foreground font-body text-base hover:border-transparent transition-all"
                  >
                    No
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-card p-8 md:p-14 max-w-2xl text-center slide-active">
                <div className="text-7xl mb-6">🎉💕</div>
                <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 shimmer-text">
                  You Said Yes!
                </h1>
                <div className="romantic-divider" />
                <p className="font-body text-xl text-muted-foreground mt-6 leading-relaxed">
                  This is the beginning of our forever. 
                  I promise to love you more with every passing day.
                </p>
                <div className="text-4xl mt-8">❤️ Forever & Always ❤️</div>
                <div className="text-4xl mt-8">❤️ Betu ❤️</div>

              </div>
            )}
          </div>
        );

      

      default:
        return null;
    }
  };

  return (
    <div className="romantic-gradient-bg fixed inset-0 overflow-hidden" onClick={startMusic}>
      <HeartParticles />
      <div className="relative z-10 w-full h-full">
        {renderSlide(currentSlide)}
      </div>

      {/* Music indicator */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (audioRef.current) {
            if (musicPlaying) {
              audioRef.current.pause();
              setMusicPlaying(false);
            } else {
              audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
            }
          }
        }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center text-xl hover:scale-110 transition-transform"
      >
        {musicPlaying ? '🎵' : '🔇'}
      </button>

      {/* Slide indicator */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === currentSlide
                ? 'bg-primary w-6'
                : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
