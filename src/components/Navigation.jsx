'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const NAV_ITEMS = [
  { label: 'About',      id: 'about'      },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Contact',    id: 'contact'    },
];

export default function Navigation() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { progress } = useScrollProgress();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const current = NAV_ITEMS.find(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 140 && bottom >= 140;
      });
      setActive(current?.id || '');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: '7px 10px',
        background: scrolled
          ? 'rgba(9,12,24,0.88)'
          : 'rgba(9,12,24,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(201,168,76,0.18)',
        borderRadius: '100px',
        boxShadow: scrolled
          ? '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08)'
          : 'none',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Logo */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          fontFamily: 'var(--font-main)',
          fontWeight: 700,
          fontSize: '0.85rem',
          color: '#C9A84C',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 12px',
          letterSpacing: '0.06em',
          marginRight: '4px',
        }}
      >
        PA
      </motion.button>

      {/* Divider */}
      <div style={{
        width: '1px',
        height: '16px',
        background: 'rgba(201,168,76,0.2)',
        marginRight: '4px',
      }} />

      {/* Nav items */}
      {NAV_ITEMS.map(({ label, id }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              position: 'relative',
              padding: '6px 14px',
              borderRadius: '100px',
              fontFamily: 'var(--font-main)',
              fontSize: '0.8rem',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#090C18' : 'rgba(237,232,220,0.65)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
              userSelect: 'none',
            }}
          >
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#C9A84C',
                    borderRadius: '100px',
                    zIndex: -1,
                  }}
                />
              )}
            </AnimatePresence>
            {label}
          </button>
        );
      })}

      {/* Divider */}
      <div style={{
        width: '1px',
        height: '16px',
        background: 'rgba(201,168,76,0.2)',
        marginLeft: '4px',
      }} />

      {/* Scroll progress ring + Resume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '4px' }}>
        {/* Tiny progress ring */}
        <svg width="20" height="20" style={{ flexShrink: 0 }}>
          <circle
            cx="10" cy="10" r="7"
            fill="none"
            stroke="rgba(201,168,76,0.15)"
            strokeWidth="1.5"
          />
          <circle
            cx="10" cy="10" r="7"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="1.5"
            strokeDasharray={`${2 * Math.PI * 7}`}
            strokeDashoffset={`${2 * Math.PI * 7 * (1 - progress)}`}
            strokeLinecap="round"
            transform="rotate(-90 10 10)"
            style={{ transition: 'stroke-dashoffset 0.1s' }}
          />
        </svg>

        <motion.a
          href="https://drive.google.com/file/d/13eRwg012J-Q5AsMRfyBbHBOHw8MardYu/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, boxShadow: '0 0 16px rgba(201,168,76,0.3)' }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding: '6px 16px',
            background: 'transparent',
            color: '#C9A84C',
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: '100px',
            fontFamily: 'var(--font-main)',
            fontSize: '0.78rem',
            fontWeight: 600,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            letterSpacing: '0.04em',
          }}
        >
          Resume
        </motion.a>
      </div>
    </motion.nav>
  );
}