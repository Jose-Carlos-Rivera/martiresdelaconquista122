"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ChevronDown,
  Building2,
  Maximize2,
  Layers,
  Play,
  Sparkles,
} from "lucide-react";

const visions = [
  {
    id: 1,
    name: "Residencial",
    fullName: "Residencial Moderno",
    desc: "~15 departamentos en 5 niveles con diseño minimalista contemporáneo, roof garden y áreas verdes",
    color: "from-blue-500 to-cyan-400",
    bgGlow: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: 2,
    name: "Uso Mixto",
    fullName: "Uso Mixto",
    desc: "Planta baja comercial + 4 niveles residenciales, ~12 departamentos con doble flujo de ingreso",
    color: "from-emerald-500 to-teal-400",
    bgGlow: "rgba(16, 185, 129, 0.15)",
  },
  {
    id: 3,
    name: "Boutique",
    fullName: "Boutique Premium",
    desc: "8-10 unidades amplias con amenidades en azotea, acabados de lujo y menor densidad",
    color: "from-purple-500 to-pink-400",
    bgGlow: "rgba(168, 85, 247, 0.15)",
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeVision, setActiveVision] = useState(0);
  const [count, setCount] = useState({ area: 0, levels: 0, buildable: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 0.8]);

  // Animated counters on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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
    <section id="inicio" ref={ref} className="relative min-h-[180vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background layers */}
        <motion.div style={{ y, scale }} className="absolute inset-0">
          {/* Aerial terrain placeholder — will be replaced with drone photo */}
          <div className="absolute inset-0 bg-navy-950">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(212,160,23,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.3) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
            {/* Radial glow that changes with vision */}
            <motion.div
              key={activeVision}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 40%, ${visions[activeVision].bgGlow} 0%, transparent 60%)`,
              }}
            />
            {/* Top vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-transparent to-navy-950/90" />
          </div>
        </motion.div>

        {/* Dark overlay on scroll */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-navy-950 pointer-events-none"
        />

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative h-full flex flex-col justify-center items-center text-center px-4"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass px-5 py-2.5 rounded-full mb-8 flex items-center gap-2"
          >
            <Sparkles size={14} className="text-gold-400" />
            <span className="text-gold-400 text-sm font-medium tracking-wider">
              OPORTUNIDAD DE INVERSIÓN — ESCANDÓN, CDMX
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-[0.95]"
          >
            <span className="text-white">Mártires de la</span>
            <br />
            <span className="gradient-text">Conquista 122</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-navy-300 text-base sm:text-lg max-w-lg mb-10"
          >
            501 m² de terreno con potencial para construir hasta 1,794 m² en el
            corazón de Escandón
          </motion.p>

          {/* Animated stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-10"
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
                className="flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                  <stat.icon size={20} className="text-gold-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-xl tabular-nums">
                    {stat.value}
                    <span className="text-navy-400 text-sm font-normal ml-1">
                      {stat.unit}
                    </span>
                  </p>
                  <p className="text-navy-400 text-xs">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Vision Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-4"
          >
            <p className="text-navy-400 text-xs uppercase tracking-widest mb-3">
              Explora el potencial
            </p>
            <div className="glass rounded-2xl p-1.5 flex gap-1">
              {visions.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVision(i)}
                  className={`relative px-5 py-3 rounded-xl text-sm transition-all duration-300 ${
                    activeVision === i
                      ? "text-navy-950 font-bold shadow-lg"
                      : "text-navy-300 hover:text-white"
                  }`}
                >
                  {activeVision === i && (
                    <motion.div
                      layoutId="activeVision"
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${v.color}`}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{v.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Vision description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeVision}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-navy-300 text-sm max-w-md mb-8"
            >
              <span className="text-white font-semibold">
                {visions[activeVision].fullName}:
              </span>{" "}
              {visions[activeVision].desc}
            </motion.p>
          </AnimatePresence>

          {/* Price + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="text-center sm:text-left">
              <p className="text-navy-500 text-xs uppercase tracking-wider">
                Precio de venta
              </p>
              <p className="text-3xl sm:text-4xl font-bold gradient-text leading-tight">
                $18,500,000
              </p>
              <p className="text-navy-400 text-xs">MXN · $36,898/m²</p>
            </div>
            <a
              href="https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-8 py-4 rounded-full text-lg transition-all hover:shadow-xl hover:shadow-gold-500/30 active:scale-95"
            >
              <span className="relative z-10">Agendar Visita</span>
              <div className="absolute inset-0 rounded-full bg-gold-400 animate-pulse-gold opacity-50" />
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 flex flex-col items-center gap-2"
          >
            <span className="text-navy-500 text-[10px] uppercase tracking-widest">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ChevronDown size={20} className="text-gold-500/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
