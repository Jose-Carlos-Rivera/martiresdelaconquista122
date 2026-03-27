"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Ruler,
  Building,
  TreePine,
  Home,
  DollarSign,
  Compass,
} from "lucide-react";

const specs = [
  {
    icon: Ruler,
    label: "Superficie Total",
    value: "501.38 m²",
    detail: "Frente: 13.55 m · Fondo: 37 m",
  },
  {
    icon: Building,
    label: "Niveles Permitidos",
    value: "Hasta 5",
    detail: "Uso de suelo H/5/30/A",
  },
  {
    icon: TreePine,
    label: "Área Libre",
    value: "30%",
    detail: "150.41 m² mínimo",
  },
  {
    icon: Home,
    label: "Densidad",
    value: "1 viv / 33 m²",
    detail: "~15 viviendas posibles",
  },
  {
    icon: Compass,
    label: "Superficie Construible",
    value: "1,794 m²",
    detail: "~350 m² por nivel",
  },
  {
    icon: DollarSign,
    label: "Precio por m²",
    value: "$36,898",
    detail: "vs $49,000 promedio zona",
  },
];

const colindancias = [
  { dir: "Norte", medida: "13.55 m", con: "Calle Mártires de la Conquista" },
  { dir: "Sur", medida: "13.95 m", con: "Predio de la misma fracción" },
  { dir: "Oriente", medida: "37.00 m", con: "Predio de la misma fracción" },
  { dir: "Poniente", medida: "36.90 m", con: "Cremería Americana" },
];

export default function TerrainData() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="terreno" className="py-24 px-4 sm:px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">
            Especificaciones
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Datos del Terreno
          </h2>
          <p className="text-navy-300 max-w-2xl mx-auto">
            Ubicado en Mártires de la Conquista 122, Escandón I Sección,
            Alcaldía Miguel Hidalgo, 11800 CDMX
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 hover:border-gold-500/30 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <spec.icon size={22} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-navy-400 text-sm">{spec.label}</p>
                  <p className="text-white text-2xl font-bold mt-1">
                    {spec.value}
                  </p>
                  <p className="text-navy-400 text-xs mt-1">{spec.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="glass rounded-2xl p-8"
        >
          <h3 className="font-display text-2xl font-bold text-white mb-6">
            Colindancias
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {colindancias.map((c) => (
              <div
                key={c.dir}
                className="flex items-center gap-4 p-4 rounded-xl bg-navy-900/50"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                  <Compass size={18} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-gold-400 font-semibold text-sm">
                    {c.dir} — {c.medida}
                  </p>
                  <p className="text-navy-300 text-sm">{c.con}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
