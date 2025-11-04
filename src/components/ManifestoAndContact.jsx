import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MANIFESTO = `Siamo il riverbero che attraversa i muri. Nessun silenzio può contenerci.\n\nRompi gli schemi. Indossa la tua voce.`;

function useTypewriter(text, speed = 24) {
  const [out, setOut] = useState('');
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 1000 / speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

export default function ManifestoAndContact() {
  const typed = useTypewriter(MANIFESTO, 30);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative bg-[#060607] text-zinc-100 py-28 overflow-hidden">
      {/* background grid + wind */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage:
          'linear-gradient(rgba(255,180,80,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,180,80,0.06) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black, transparent 70%)',
        animation: 'wind 14s linear infinite'
      }} />
      <style>{`
        @keyframes wind { from { background-position: 0 0, 0 0; } to { background-position: 200px 0, 0 200px; } }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Manifesto */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight"
            >
              Manifesto
            </motion.h2>

            <motion.pre
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1.2 }}
              className="mt-6 text-lg md:text-2xl whitespace-pre-wrap font-semibold leading-relaxed text-zinc-200"
              style={{
                textShadow: '0 0 18px rgba(255,180,80,0.15)'
              }}
            >
              {typed}
            </motion.pre>

            <div className="mt-6 h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-[0_0_30px_rgba(255,180,80,0.5)]" />
          </div>

          {/* Contact Portal */}
          <div className="relative">
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full" style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(255,200,120,0.35), rgba(255,130,60,0.15) 40%, rgba(0,0,0,0.0) 60%)',
                filter: 'blur(8px)'
              }} />
              <div className="absolute inset-0 rounded-[2rem] border border-amber-500/30 bg-black/40 backdrop-blur-md shadow-[inset_0_0_40px_rgba(255,200,120,0.08),0_20px_100px_-30px_rgba(0,0,0,0.8)]" />

              <form onSubmit={onSubmit} className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                <h3 className="text-xl font-bold tracking-wide text-amber-300">Join the Movement</h3>
                <p className="text-sm text-zinc-400 text-center max-w-sm">
                  Entra nel portale. Ricevi drop esclusivi, eventi segreti e anteprime.
                </p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full max-w-sm px-4 py-3 rounded-full bg-zinc-900/80 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold tracking-wide shadow-[0_10px_40px_-10px_rgba(255,180,80,0.6)] hover:opacity-95 transition"
                >
                  Enter
                </button>
                {submitted && (
                  <div className="text-amber-300 text-sm">Grazie, ci vediamo oltre il portale.</div>
                )}
              </form>

              {/* light pulses */}
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] mix-blend-screen" style={{
                background:
                  'conic-gradient(from 0deg at 50% 50%, rgba(255,200,120,0.2), rgba(255,130,60,0.05), rgba(255,200,120,0.2))',
                animation: 'spin 14s linear infinite'
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
