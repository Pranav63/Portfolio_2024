import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useToast } from '@chakra-ui/react';

const SOCIAL = [
  {
    icon: FaEnvelope,
    label: 'pranav2vis@gmail.com',
    href: 'mailto:pranav2vis@gmail.com',
  },
  {
    icon: FaLinkedin,
    label: 'linkedin.com/in/pranavarora63',
    href: 'https://www.linkedin.com/in/pranavarora63/',
  },
  {
    icon: FaGithub,
    label: 'github.com/Pranav63',
    href: 'https://github.com/Pranav63',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const LINE_STYLE = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 18px',
  borderBottom: '1px solid rgba(0,212,255,0.07)',
};

const LABEL_STYLE = {
  color: 'rgba(226,232,240,0.35)',
  fontSize: '0.85rem',
  fontFamily: "'Space Mono', 'Courier New', monospace",
  minWidth: '80px',
  userSelect: 'none',
};

const INPUT_STYLE = {
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#00D4FF',
  fontFamily: "'Space Mono', 'Courier New', monospace",
  fontSize: '0.9rem',
  width: '100%',
  caretColor: '#00D4FF',
};

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const toast = useToast();

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Send failed');
      toast({
        title: 'Message sent.',
        description: "I'll get back to you soon.",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast({
        title: 'Failed to send.',
        description: 'Please try again or email directly.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section" ref={ref} style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <motion.p
          className="section-label"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          Get in touch
        </motion.p>
        <motion.h2
          className="section-title"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
          style={{ marginBottom: '16px' }}
        >
          Let's Build Something
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={2}
          style={{
            fontSize: '1rem',
            color: 'rgba(226,232,240,0.55)',
            marginBottom: '56px',
            maxWidth: '480px',
          }}
        >
          Open to collaborations, full-time opportunities, and interesting AI projects.
        </motion.p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Left — social links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={3}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {SOCIAL.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card"
                whileHover={{
                  borderColor: 'rgba(0,212,255,0.3)',
                  x: 4,
                  boxShadow: '0 0 24px rgba(0,212,255,0.1)',
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '18px 22px',
                  textDecoration: 'none',
                  transition: 'border-color 0.25s, box-shadow 0.25s',
                }}
              >
                <Icon style={{ color: '#00D4FF', fontSize: '1.1rem', flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.88rem',
                    color: 'rgba(226,232,240,0.75)',
                  }}
                >
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Right — terminal form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={4}
            className="terminal"
          >
            {/* Terminal title bar */}
            <div className="terminal-bar">
              <div className="terminal-dot" style={{ background: '#FF5F56' }} />
              <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <div className="terminal-dot" style={{ background: '#27C93F' }} />
              <span
                style={{
                  marginLeft: '8px',
                  fontSize: '0.75rem',
                  color: 'rgba(226,232,240,0.35)',
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                contact.sh
              </span>
            </div>

            {/* Prompt lines */}
            <div style={LINE_STYLE}>
              <span style={LABEL_STYLE}>$ name</span>
              <input
                required
                type="text"
                value={form.name}
                onChange={set('name')}
                placeholder="Your name"
                style={INPUT_STYLE}
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
                style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.6 }}
              />
            </div>

            <div style={{ padding: '14px 18px', borderTop: '1px solid rgba(0,212,255,0.07)' }}>
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(0,212,255,0.3)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%',
                  padding: '11px',
                  background: '#00D4FF',
                  color: '#050A14',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: sending ? 'not-allowed' : 'pointer',
                  opacity: sending ? 0.7 : 1,
                  letterSpacing: '0.04em',
                }}
              >
                {sending ? 'Sending...' : '→ Send Message'}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
