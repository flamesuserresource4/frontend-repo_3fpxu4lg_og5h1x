import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function Hotspot({ x, y, label }) {
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      <div className="group relative">
        <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse shadow-[0_0_20px_4px_rgba(255,180,80,0.4)]" />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="px-3 py-1 rounded bg-black/70 border border-amber-500/30 text-xs text-amber-200 backdrop-blur-sm whitespace-nowrap">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

function RotatingItem({ name, metal = 'copper' }) {
  const ref = useRef(null);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let raf;
    const loop = () => {
      setAngle((a) => (a + 0.2) % 360);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const metalGradient =
    metal === 'gold'
      ? 'linear-gradient(135deg, #5c471c, #a07a2f 20%, #f0c766 40%, #d2993c 60%, #6b5223 80%)'
      : 'linear-gradient(135deg, #3b2a26, #804b3a 20%, #b87357 40%, #6a3a2f 60%, #2b1c17 80%)';

  return (
    <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-zinc-700/40 bg-zinc-900/40">
      {/* Faux 3D mannequin-like object */}
      <div
        ref={ref}
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1200px'
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '60%',
            height: '70%',
            transform: `rotateY(${angle}deg)`
          }}
        >
          <div
            className="w-full h-full rounded-[40%]"
            style={{
              background: metalGradient,
              boxShadow:
                'inset 0 0 40px rgba(255,255,255,0.08), inset 0 0 120px rgba(255,200,120,0.08), 0 40px 120px -40px rgba(0,0,0,0.8)'
            }}
          />
        </div>
      </div>

      {/* dynamic lights */}
      <div className="absolute -top-10 left-1/4 w-40 h-40 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, rgba(255,210,130,0.6), transparent)' }} />
      <div className="absolute -bottom-16 right-1/5 w-56 h-56 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, rgba(180,120,90,0.5), transparent)' }} />

      <Hotspot x={38} y={28} label="Dettagli in metallo" />
      <Hotspot x={62} y={56} label="Taglio oversized" />

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/0 to-transparent">
        <div className="flex items-center justify-between">
          <span className="text-zinc-100 font-semibold tracking-wide">{name}</span>
          <span className="text-amber-300 text-sm">Preview</span>
        </div>
      </div>
    </div>
  );
}

export default function CollectionShowcase() {
  return (
    <section className="relative bg-[#0a0a0b] text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight"
        >
          Collection Preview
        </motion.h2>
        <p className="mt-3 text-zinc-400 max-w-2xl">
          Modelli 3D astratti con riflessi metallici e hotspot informativi.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <RotatingItem name="Hooded Shell // 01" metal="gold" />
          <RotatingItem name="Utility Jacket // 02" metal="copper" />
          <RotatingItem name="Raw-Cut Tee // 03" metal="gold" />
        </div>
      </div>
    </section>
  );
}
