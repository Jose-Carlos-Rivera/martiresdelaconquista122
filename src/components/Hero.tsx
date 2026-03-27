"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, Building2, Maximize2, Layers } from "lucide-react";

const visions = [
  {
    id: 1,
    name: "Residencial Moderno",
    desc: "~15 departamentos en 5 niveles, diseño minimalista contemporáneo",
    gradient: "from-blue-600/20 via-navy-950 to-navy-950",
  },
  {
    id: 2,
    name: "Uso Mixto",
    desc: "Planta baja comercial + 4 niveles residenciales, ~12 departamentos",
    gradient: "from-emerald-600/20 via-navy-950 to-navy-950",
  },
  {
    id: 3,
    name: "Boutique Premium",
    desc: "8-10 unidades amplias con amenidades en azotea, acabados de lujo",
    gradient: "from-purple-600/20 via-navy-950 to-navy-950",
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeVision, setActiveVision] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section id="inicio" ref={ref} className="relative min-h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ y, scale }}
          className={`absolute inset-0 bg-gradient-to-b ${visions[activeVision].gradient} transition-all duration-1000`}
        >
          <div className="absolute inset-0 opacity-20">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(212,160,23,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,160,23,0.08)_0%,_transparent_70%)]" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative h-full flex flex-col justify-center items-center text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass px-4 py-2 rounded-full mb-8"
          >
            <span className="text-gold-400 text-sm font-medium tracking-wide">
              OPORTUNIDAD DE INVERSIÓN — ESCANDÓN, CDMX
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-white">Mártires de la</span>
            <br />
            <span className="gradient-text">Conquista 122</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10"
          >
            {[
              { icon: Maximize2, value: "501 m²", label: "Terreno" },
              { icon: Layers, value: "5 Niveles", label: "Permitidos" },
              { icon: Building2, value: "1,794 m²", label: "Construibles" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <stat.icon size={20} className="text-gold-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-lg">{stat.value}</p>
                  <p className="text-navy-300 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="glass rounded-2xl p-2 flex flex-col sm:flex-row gap-2 mb-8"
          >
            {visions.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setActiveVision(i)}
                className={`px-5 py-3 rounded-xl text-sm transition-all ${
                  activeVision === i
                    ? "bg-gold-500 text-navy-950 font-semibold shadow-lg shadow-gold-500/20"
                    : "text-navy-200 hover:text-white hover:bg-white/5"
                }`}
              >
                Visión {v.id}: {v.name}
              </button>
            ))}
          </motion.div>

          <motion.p
            key={activeVision}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-navy-300 text-sm max-w-md mb-8"
          >
            {visions[activeVision].desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="text-center sm:text-left">
              <p className="text-navy-400 text-sm">Precio de venta</p>
              <p className="text-3xl sm:text-4xl font-bold gradient-text">
                $18,500,000
              </p>
              <p className="text-navy-400 text-xs">MXN · $36,898/m²</p>
            </div>
            <a
              href="https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-8 py-4 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-gold-500/30 animate-pulse-gold"
            >
              Agendar Visita
            </a>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10"
          >
            <ChevronDown size={28} className="text-gold-400/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
