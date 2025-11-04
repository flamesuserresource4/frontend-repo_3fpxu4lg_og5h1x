import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

function useAudioEngine() {
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const oscRef = useRef(null);
  const lfoRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  const enable = async () => {
    if (enabled) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const gain = ctx.createGain();
    gain.gain.value = 0.0001; // start silent

    // Deep bass oscillator
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 45; // deep bass

    // LFO for subtle movement
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.2;
    lfoGain.gain.value = 8;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    lfo.start();

    ctxRef.current = ctx;
    gainRef.current = gain;
    oscRef.current = osc;
    lfoRef.current = lfo;
    setEnabled(true);
  };

  const setIntensity = (v) => {
    if (!gainRef.current) return;
    const clamped = Math.max(0, Math.min(1, v));
    // scale to a pleasant range
    const target = 0.02 + clamped * 0.15;
    gainRef.current.gain.linearRampToValueAtTime(target, ctxRef.current.currentTime + 0.1);
  };

  const glitch = () => {
    if (!oscRef.current || !ctxRef.current) return;
    const base = 45;
    const t = ctxRef.current.currentTime;
    // quick frequency bursts
    oscRef.current.frequency.cancelScheduledValues(t);
    oscRef.current.frequency.setValueAtTime(base * 2, t);
    oscRef.current.frequency.exponentialRampToValueAtTime(base, t + 0.08);
  };

  const disable = () => {
    if (ctxRef.current) {
      ctxRef.current.close();
    }
    ctxRef.current = null;
    gainRef.current = null;
    oscRef.current = null;
    lfoRef.current = null;
    setEnabled(false);
  };

  return { enabled, enable, disable, setIntensity, glitch };
}

export default function HeroIntro() {
  const containerRef = useRef(null);
  const { enabled, enable, disable, setIntensity, glitch } = useAudioEngine();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight || 1;
      const intensity = Math.min(1, y / (max * 0.6));
      setIntensity(intensity);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [setIntensity]);

  // Periodic subtle glitches while enabled
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => {
      if (Math.random() < 0.35) glitch();
    }, 1400);
    return () => clearInterval(id);
  }, [enabled, glitch]);

  // Mouse parallax on overlay
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e) => {
      const { clientX: x, clientY: y } = e;
      const cx = x / window.innerWidth - 0.5;
      const cy = y / window.innerHeight - 0.5;
      el.style.setProperty('--rx', `${-cy * 6}deg`);
      el.style.setProperty('--ry', `${cx * 8}deg`);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section className="relative h-screen w-full bg-[#0a0a0b] text-white overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* gradient and noise overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-[#0a0a0b]/30 to-black/80" />

      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center select-none"
          style={{ transform: 'perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry))' }}
        >
          <motion.h1
            className="text-5xl md:text-7xl tracking-widest font-black leading-tight"
            style={{
              textShadow:
                '0 0 24px rgba(255,200,120,0.25), 0 0 6px rgba(255,200,120,0.2)'
            }}
          >
            <span className="bg-gradient-to-r from-zinc-200 to-zinc-100 bg-clip-text text-transparent">
              BROKEN
            </span>
            <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500">
              SILENCE
            </span>
          </motion.h1>
          <motion.p
            className="mt-4 text-sm md:text-base uppercase tracking-[0.3em] text-zinc-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Break the Noise. Wear Your Voice.
          </motion.p>

          <motion.div
            className="mt-8 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {!enabled ? (
              <button
                onClick={enable}
                className="px-5 py-2 rounded-full border border-amber-500/60 bg-black/30 backdrop-blur-sm text-amber-300 hover:bg-amber-500/10 transition-colors"
              >
                Enable Sound
              </button>
            ) : (
              <button
                onClick={disable}
                className="px-5 py-2 rounded-full border border-amber-500/60 bg-black/30 backdrop-blur-sm text-amber-300 hover:bg-amber-500/10 transition-colors"
              >
                Mute
              </button>
            )}
            <span className="text-xs text-zinc-400">Audio reacts to scroll</span>
          </motion.div>
        </motion.div>
      </div>

      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0" style={{
        background:
          'radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)'
      }} />
    </section>
  );
}
