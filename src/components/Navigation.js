import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const NAV_ITEMS = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

const Navigation = () => {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = NAV_ITEMS.map((n) => n.toLowerCase());
      const current = ids.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 120 && bottom >= 120;
      });
      setActive(current || '');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '8px 12px',
        background: scrolled ? 'rgba(5,10,20,0.85)' : 'rgba(5,10,20,0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,212,255,0.1)',
        borderRadius: '100px',
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Logo mark */}
      <a
        href="#hero"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: '0.85rem',
          color: '#00D4FF',
          textDecoration: 'none',
          letterSpacing: '0.05em',
          padding: '4px 10px',
          marginRight: '6px',
        }}
      >
        PA
      </a>

      <div
        style={{
          width: '1px',
          height: '18px',
          background: 'rgba(255,255,255,0.1)',
          marginRight: '4px',
        }}
      />

      {NAV_ITEMS.map((item) => {
        const isActive = active === item.toLowerCase();
        return (
          <ScrollLink
            key={item}
            to={item.toLowerCase()}
            smooth
            duration={600}
            offset={-80}
            style={{ cursor: 'pointer' }}
          >
            <motion.div
              whileHover={{ color: '#00D4FF' }}
              style={{
                position: 'relative',
                padding: '6px 14px',
                borderRadius: '100px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.82rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#050A14' : 'rgba(226,232,240,0.7)',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'color 0.2s',
              }}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#00D4FF',
                      borderRadius: '100px',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              {item}
            </motion.div>
          </ScrollLink>
        );
      })}

      <div
        style={{
          width: '1px',
          height: '18px',
          background: 'rgba(255,255,255,0.1)',
          marginLeft: '4px',
        }}
      />

      <motion.a
        href="https://drive.google.com/file/d/13eRwg012J-Q5AsMRfyBbHBOHw8MardYu/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, boxShadow: '0 0 16px rgba(0,212,255,0.3)' }}
        whileTap={{ scale: 0.96 }}
        style={{
          padding: '6px 16px',
          background: 'transparent',
          color: '#00D4FF',
          border: '1px solid rgba(0,212,255,0.4)',
          borderRadius: '100px',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.82rem',
          fontWeight: 600,
          textDecoration: 'none',
          marginLeft: '4px',
          whiteSpace: 'nowrap',
        }}
      >
        Resume
      </motion.a>
    </motion.nav>
  );
};

export default Navigation;
