import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CursorProvider } from './context/CursorContext';
import { LoadingScreen } from './components/UI/LoadingScreen';
import { CustomCursor } from './components/UI/CustomCursor';
import { ScrollProgress } from './components/UI/ScrollProgress';
import { NoiseTexture } from './components/UI/NoiseTexture';
import { Navbar } from './components/Sections/Navbar';
import { Hero } from './components/Sections/Hero';
import { Services } from './components/Sections/Services';
import { About } from './components/Sections/About';
import { Portfolio } from './components/Sections/Portfolio';
import { Pricing } from './components/Sections/Pricing';
import { Contact } from './components/Sections/Contact';
import { Footer } from './components/Sections/Footer';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <CursorProvider>
      {/* Intro Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div className="relative min-h-screen bg-[#F7F7F5] text-[#111111] antialiased overflow-x-hidden selection:bg-[#111111] selection:text-[#F7F7F5]">
        {/* Subtle Background Grain Texture */}
        <NoiseTexture />

        {/* Custom Desktop Cursor */}
        <CustomCursor />

        {/* Viewport Scroll Progress Bar */}
        <ScrollProgress />

        {/* Floating Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          <Hero />
          <Services />
          <About />
          <Portfolio />
          <Pricing />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </CursorProvider>
  );
}

export default App;
