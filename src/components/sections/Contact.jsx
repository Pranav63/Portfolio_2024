'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SOCIAL = [
  {
    icon: FaEnvelope,
    label: 'pranav2vis@gmail.com',
    sub: 'Email',
    href: 'mailto:pranav2vis@gmail.com',
  },
  {
    icon: FaLinkedin,
    label: 'linkedin.com/in/pranavarora63',
    sub: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pranavarora63/',
  },
  {
    icon: FaGithub,
    label: 'github.com/Pranav63',
    sub: 'GitHub',
    href: 'https://github.com/Pranav63',
  },
];

const INPUT_STYLE = {
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#C9A84C',
  fontFamily: "'Space Mono', monospace",
  fontSize: '0.88rem',
  width: '100%',
  caretColor: '#C9A84C',
};

const LABEL_STYLE = {
  color: 'rgba(237,232,220,0.3)',
  fontSize: '0.82rem',
  fontFamily: "'Space Mono', monospace",
  minWidth: '72px',
  userSelect: 'none',
  flexShrink: 0,
};

const LINE_STYLE = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 20px',
  borderBottom: '1px solid rgba(201,168,76,0.07)',
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-waypoint" ref={ref}>
      {/* Night sky vignette — this section is dark */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(9,12,24,0.85) 15%, rgba(9,12,24,0.92) 50%, rgba(9,12,24,0.85) 85%, transparent)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.span
          className="label"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          Get in touch
        </motion.span>
        <motion.h2
          className="section-title"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
          style={{ marginBottom: '12px' }}
        >
          Let's Build Something
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
          style={{
            color: 'var(--text-dim)',
            fontSize: '0.95rem',
            marginBottom: '56px',
            maxWidth: '480px',
          }}
        >
          Open to applied AI roles in UAE, collaborations, and interesting
          production AI problems.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>
          {/* Left — social links */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {SOCIAL.map(({ icon: Icon, label, sub, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel"
                whileHover={{ x: 6, borderColor: 'rgba(201,168,76,0.4)' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 22px',
                  textDecoration: 'none',
                  transition: 'border-color 0.25s',
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon style={{ color: '#C9A84C', fontSize: '1rem' }} />
                </div>
                <div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: 'rgba(237,232,220,0.35)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '2px',
                  }}>
                    {sub}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'rgba(237,232,220,0.75)',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {label}
                  </div>
                </div>
                <div style={{
                  marginLeft: 'auto',
                  color: 'rgba(201,168,76,0.3)',
                  fontSize: '0.8rem',
                }}>
                  →
                </div>
              </motion.a>
            ))}

            {/* UAE availability note */}
            <motion.div
              className="glass-panel"
              style={{ padding: '18px 22px', marginTop: '8px' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#27C93F',
                  boxShadow: '0 0 10px rgba(39,201,63,0.6)',
                  flexShrink: 0,
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }} />
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#27C93F',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  Available for UAE roles
                </span>
              </div>
              <p style={{
                fontSize: '0.8rem',
                color: 'rgba(237,232,220,0.45)',
                lineHeight: 1.6,
              }}>
                Based in Singapore · Relocating to Abu Dhabi / Dubai.
                Open to Applied AI, ML Engineering, and Research Engineering roles.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — terminal form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={4}
            className="terminal"
          >
            {/* Terminal bar */}
            <div className="terminal-bar">
              <div className="terminal-dot" style={{ background: '#FF5F56' }} />
              <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <div className="terminal-dot" style={{ background: '#27C93F' }} />
              <span style={{
                marginLeft: '10px',
                fontSize: '0.72rem',
                color: 'rgba(237,232,220,0.3)',
                fontFamily: 'var(--font-mono)',
              }}>
                contact.sh
              </span>
              <span style={{
                marginLeft: 'auto',
                fontSize: '0.65rem',
                color: 'rgba(201,168,76,0.4)',
                fontFamily: 'var(--font-mono)',
              }}>
                pranav@portfolio ~
              </span>
            </div>

            {/* Fields */}
            <div style={LINE_STYLE}>
              <span style={LABEL_STYLE}>$ name</span>
              <input
                required
                type="text"
                value={form.name}
                onChange={set('name')}
                placeholder="Your name"
                style={{ ...INPUT_STYLE, '::placeholder': { color: 'rgba(201,168,76,0.3)' } }}
              />
            </div>
            <div style={LINE_STYLE}>
              <span style={LABEL_STYLE}>$ email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="your@email.com"
                style={INPUT_STYLE}
              />
            </div>
            <div style={{ ...LINE_STYLE, alignItems: 'flex-start', borderBottom: 'none' }}>
              <span style={{ ...LABEL_STYLE, paddingTop: '2px' }}>$ msg</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={set('message')}
                placeholder="Your message..."
                style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.7 }}
              />
            </div>

            {/* Submit */}
            <div style={{
              padding: '16px 20px',
              borderTop: '1px solid rgba(201,168,76,0.08)',
            }}>
              {sent ? (
                <div style={{
                  textAlign: 'center',
                  color: '#27C93F',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  padding: '10px 0',
                }}>
                  ✓ Message sent. I'll get back to you soon.
                </div>
              ) : (
                <>
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(201,168,76,0.35)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: sending ? 'rgba(201,168,76,0.5)' : '#C9A84C',
                      color: '#090C18',
                      border: 'none',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-main)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: sending ? 'not-allowed' : 'pointer',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {sending ? 'Sending...' : '→ Send Message'}
                  </motion.button>
                  {error && (
                    <p style={{
                      textAlign: 'center',
                      marginTop: '10px',
                      fontSize: '0.78rem',
                      color: '#FF5F56',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      Failed to send. Email directly at pranav2vis@gmail.com
                    </p>
                  )}
                </>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}