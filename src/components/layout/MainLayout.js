import React, { useEffect, useState } from 'react';
import { useColorMode } from '@chakra-ui/react';
import AnimatedBackground from '../AnimatedBackground';
import Navigation from '../Navigation';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import ScrollToTopButton from '../ScrollToTopButton';
import SubtleLoader from '../SubtleLoader';

const MainLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setColorMode } = useColorMode();

  useEffect(() => {
    // Force dark mode always
    setColorMode('dark');
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [setColorMode]);

  if (isLoading) return <SubtleLoader />;

  return (
    <div style={{ position: 'relative', background: '#050A14', minHeight: '100vh' }}>
      <AnimatedBackground />
      <Navigation />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <ScrollToTopButton />

      {/* Footer */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '32px 24px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.78rem',
          color: 'rgba(226,232,240,0.25)',
          letterSpacing: '0.05em',
        }}
      >
        Designed &amp; Built by Pranav Arora · {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default MainLayout;
