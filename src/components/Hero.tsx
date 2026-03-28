"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ChevronDown,
  Building2,
  Maximize2,
  Layers,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState({ area: 0, levels: 0, buildable: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 0.8]);

  // Animated counters
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount({
        area: Math.round(501 * eased),
        levels: Math.round(5 * eased),
        buildable: Math.round(1794 * eased),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="inicio" ref={ref} className="relative min-h-[140vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <div className="absolute inset-0 bg-navy-950">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(212,160,23,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.3) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_rgba(212,160,23,0.08)_0%,_transparent_60%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-transparent to-navy-950/90" />
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-navy-950 pointer-events-none"
        />

        {/* Content — carefully spaced for all screens */}
        <motion.div
          style={{ opacity }}
          className="relative h-full flex flex-col justify-center items-center text-center px-4 pt-16 pb-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass px-4 py-2 rounded-full mb-5 sm:mb-6 flex items-center gap-2"
          >
            <Sparkles size={12} className="text-gold-400 shrink-0" />
            <span className="text-gold-400 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
              Oportunidad de inversión — Escandón, CDMX
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 leading-[0.95]"
          >
            <span className="text-white">Mártires de la</span>
            <br />
            <span className="gradient-text">Conquista 122</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-navy-300 text-sm sm:text-base max-w-md mb-6 sm:mb-8 px-4"
          >
            Terreno de 501 m² con potencial para construir hasta 1,794 m² en el
            corazón de Escandón
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-5 sm:gap-8 mb-6 sm:mb-8"
          >
            {[
              {
                icon: Maximize2,
                value: `${count.area}`,
                unit: "m²",
                label: "Superficie",
              },
              {
                icon: Layers,
                value: `${count.levels}`,
                unit: "niveles",
                label: "Permitidos",
              },
              {
                icon: Building2,
                value: count.buildable.toLocaleString(),
                unit: "m²",
                label: "Construibles",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.15 }}
                className="flex items-center gap-2.5"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                  <stat.icon size={18} className="text-gold-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-lg sm:text-xl tabular-nums">
                    {stat.value}
                    <span className="text-navy-400 text-xs font-normal ml-1">
                      {stat.unit}
                    </span>
                  </p>
                  <p className="text-navy-400 text-[10px] sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Price + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6"
          >
            <div className="text-center sm:text-left">
              <p className="text-navy-500 text-[10px] sm:text-xs uppercase tracking-wider">
                Precio de venta
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text leading-tight">
                $18,500,000
              </p>
              <p className="text-navy-400 text-[10px] sm:text-xs">
                MXN · $36,898/m²
              </p>
            </div>
            <a
              href="https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all hover:shadow-xl hover:shadow-gold-500/30 active:scale-95"
            >
              Agendar Visita
            </a>
          </motion.div>

          {/* Scroll indicator — with safe spacing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-navy-500 text-[10px] uppercase tracking-widest">
              Desliza
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
            >
              <ChevronDown size={18} className="text-gold-500/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
