import dynamic from 'next/dynamic';
import Hero       from '@/components/sections/Hero';
import About      from '@/components/sections/About';
import Skills     from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects   from '@/components/sections/Projects';
import Contact    from '@/components/sections/Contact';
import Navigation from '@/components/ui/Navigation';

// Canvas MUST be dynamically imported — no SSR for WebGL
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false });

export default function Home() {
  return (
    <>
      <Scene />
      <Navigation />
      <main className="scroll-container">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}