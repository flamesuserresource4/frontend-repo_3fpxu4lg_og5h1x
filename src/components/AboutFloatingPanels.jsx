import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AboutFloatingPanels() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-20% 0px -20% 0px', once: true });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.setProperty('--tiltX', `${y * -8}deg`);
      el.style.setProperty('--tiltY', `${x * 10}deg`);
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  const panels = [
    {
      title: 'Libertà',
      text: 'Oltre il rumore. Esprimiti senza filtri. La strada è il tuo palco.'
    },
    {
      title: 'Autenticità',
      text: 'Materiali grezzi, tagli netti, dettagli metallici. Niente compromessi.'
    },
    {
      title: 'Ribellione',
      text: 'Siamo la distorsione dentro il sistema. Moda che suona come un basso profondo.'
    }
  ];

  return (
    <section className="relative w-full bg-[#0a0a0b] text-zinc-200 py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100"
        >
          About the Brand
        </motion.h2>
        <p className="mt-3 text-zinc-400 max-w-2xl">
          Broken Silence fonde moda, musica e libertà d’espressione in un’estetica scura, cinematica e sofisticata.
        </p>

        <div ref={ref} className="mt-12 grid md:grid-cols-3 gap-6" style={{
          transformStyle: 'preserve-3d',
          perspective: '1200px'
        }}>
          {panels.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30, rotateY: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: 0.1 * i }}
              className="relative rounded-xl p-6 bg-gradient-to-br from-zinc-900/70 to-zinc-800/50 border border-zinc-700/40 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)]"
              style={{
                transform:
                  'rotateX(var(--tiltX)) rotateY(var(--tiltY)) translateZ(0px)'
              }}
            >
              <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
                boxShadow: 'inset 0 0 0 1px rgba(255,180,80,0.1)'
              }} />
              <div className="h-32 mb-4 rounded-lg bg-[radial-gradient(circle_at_30%_20%,rgba(255,175,90,0.2),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(210,120,60,0.12),transparent_50%)]" />
              <h3 className="text-xl font-bold text-amber-300 tracking-wide">{p.title}</h3>
              <p className="mt-2 text-zinc-300 leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
