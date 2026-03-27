"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Home, Building2, ShoppingBag } from "lucide-react";

const developments = [
  {
    icon: Home,
    title: "Residencial Moderno",
    units: "~15 departamentos",
    levels: "5 niveles",
    features: [
      "Departamentos de 80-120 m²",
      "Diseño minimalista contemporáneo",
      "Estacionamiento subterráneo",
      "Roof garden con amenidades",
      "Áreas verdes en planta baja",
    ],
    accent: "from-blue-500 to-blue-700",
    accentBg: "bg-blue-500/10",
    accentText: "text-blue-400",
  },
  {
    icon: ShoppingBag,
    title: "Uso Mixto",
    units: "~12 departamentos + locales",
    levels: "5 niveles",
    features: [
      "Planta baja comercial (café, boutique)",
      "4 niveles residenciales",
      "Departamentos de 90-110 m²",
      "Flujo de ingreso doble",
      "Mayor retorno de inversión",
    ],
    accent: "from-emerald-500 to-emerald-700",
    accentBg: "bg-emerald-500/10",
    accentText: "text-emerald-400",
  },
  {
    icon: Building2,
    title: "Boutique Premium",
    units: "8-10 unidades",
    levels: "5 niveles",
    features: [
      "Departamentos amplios de 150-180 m²",
      "Acabados de lujo",
      "Amenidades: gym, terraza, lounge",
      "Menor densidad, mayor exclusividad",
      "Precio por unidad más alto",
    ],
    accent: "from-purple-500 to-purple-700",
    accentBg: "bg-purple-500/10",
    accentText: "text-purple-400",
  },
];

const investmentReasons = [
  {
    stat: "$36,898/m²",
    detail: "vs $49,000 promedio en la zona",
    label: "Precio por debajo del mercado",
  },
  {
    stat: "4-8%",
    detail: "Plusvalía anual proyectada",
    label: "Crecimiento sostenido",
  },
  {
    stat: "7.18%",
    detail: "Rendimiento anual por renta",
    label: "Retorno atractivo",
  },
  {
    stat: "2026",
    detail: "Copa del Mundo FIFA",
    label: "Catalizador de demanda",
  },
];

export default function DevelopmentPotential() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="potencial"
      className="py-24 px-4 sm:px-6 bg-navy-950/50"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">
            Potencial
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            ¿Qué se puede construir?
          </h2>
          <p className="text-navy-300 max-w-2xl mx-auto">
            Con 1,794 m² construibles y uso de suelo H/5/30/A, estas son tres
            visiones realistas de desarrollo apegadas a la normativa.
          </p>
        </motion.div>

        {/* Development cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {developments.map((dev, i) => (
            <motion.div
              key={dev.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass rounded-2xl overflow-hidden group hover:border-gold-500/30 transition-all"
            >
              {/* Header gradient */}
              <div
                className={`h-2 bg-gradient-to-r ${dev.accent}`}
              />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${dev.accentBg} flex items-center justify-center`}
                  >
                    <dev.icon size={20} className={dev.accentText} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {dev.title}
                    </h3>
                    <p className="text-navy-400 text-xs">
                      {dev.units} · {dev.levels}
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {dev.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-navy-300 text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Investment reasons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={24} className="text-gold-400" />
            <h3 className="font-display text-2xl font-bold text-white">
              ¿Por qué invertir en Escandón?
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {investmentReasons.map((reason, i) => (
              <motion.div
                key={reason.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <p className="text-3xl font-bold gradient-text mb-1">
                  {reason.stat}
                </p>
                <p className="text-white text-sm font-semibold mb-1">
                  {reason.label}
                </p>
                <p className="text-navy-400 text-xs">{reason.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
