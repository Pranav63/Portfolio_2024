import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SubtleLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setProgress((p) => Math.min(p + Math.random() * 18, 95)),
      120
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050A14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ textAlign: 'center' }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '2rem',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.02em',
            marginBottom: '32px',
          }}
        >
          PA
          <span style={{ color: '#00D4FF' }}>.</span>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: '200px',
            height: '2px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #00D4FF, #7928CA)',
              borderRadius: '2px',
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>

        <div
          style={{
            marginTop: '16px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.72rem',
            color: 'rgba(226,232,240,0.3)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Initializing
        </div>
      </motion.div>
    </div>
  );
};

export default SubtleLoader;
