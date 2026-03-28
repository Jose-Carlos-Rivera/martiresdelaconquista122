"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Heart,
  GraduationCap,
  TreePine,
  ShoppingCart,
  Coffee,
  Building,
} from "lucide-react";

const categories = [
  {
    icon: Heart,
    title: "Salud",
    color: "text-red-400",
    bg: "bg-red-500/10",
    items: [
      {
        name: "Hospital Ángeles México",
        detail: "800 m — Hospital privado completo, urgencias 24/7",
      },
      {
        name: "Centro Médico Quirúrgico Escandón",
        detail: "600 m — Centro quirúrgico especializado",
      },
      {
        name: "Hospital Gral. Dr. Fernando Quiroz",
        detail: "1.5 km — Hospital público multiespecialidades",
      },
    ],
  },
  {
    icon: GraduationCap,
    title: "Educación",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    items: [
      {
        name: "Escuelas primarias y secundarias",
        detail: "En la colonia",
      },
      { name: "Universidad CENTRO", detail: "2 km — Diseño y cine" },
      { name: "UNITEC Marina", detail: "3 km" },
      {
        name: "IPN (Escuela Superior de Medicina, ESCA)",
        detail: "3 km",
      },
    ],
  },
  {
    icon: TreePine,
    title: "Parques",
    color: "text-green-400",
    bg: "bg-green-500/10",
    items: [
      {
        name: "Jardín Morelos (Parque Escandón)",
        detail: "400 m — 7,200 m², recién remodelado",
      },
      {
        name: "Bosque de Chapultepec",
        detail: "1.5 km — 686 hectáreas",
      },
      { name: "Parque México", detail: "1.5 km — Condesa" },
      { name: "Parque España", detail: "1.5 km — Condesa" },
    ],
  },
  {
    icon: ShoppingCart,
    title: "Comercio",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    items: [
      { name: "Mercado Escandón", detail: "500 m" },
      { name: "Metrópoli Patriotismo", detail: "1 km — Plaza comercial" },
      {
        name: "Corredor gastronómico Condesa/Roma",
        detail: "1.5 km",
      },
    ],
  },
];

export default function Neighborhood() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="zona"
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
            Entorno
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            ¿Qué hay cerca?
          </h2>
          <p className="text-navy-300 max-w-2xl mx-auto">
            Escandón es una colonia residencial de clase media en Miguel Hidalgo,
            considerada la siguiente frontera para quienes buscan la vida urbana
            de Condesa y Roma a mejor precio.
          </p>
        </motion.div>

        {/* About Escandon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Coffee size={22} className="text-gold-400" />
            <h3 className="font-display text-xl font-bold text-white">
              Sobre la Colonia Escandón
            </h3>
          </div>
          <p className="text-navy-300 leading-relaxed mb-6">
            Zona auténtica con mercados tradicionales, cantinas históricas y un
            creciente corredor gastronómico propio. Su ubicación estratégica
            entre Tacubaya, Condesa y Chapultepec la convierte en una de las
            colonias con mayor potencial de plusvalía en CDMX.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Precio/m² zona", value: "~$49,000" },
              { label: "Plusvalía anual", value: "4-8%" },
              { label: "Rendimiento renta", value: "7.18%" },
              { label: "Copa del Mundo", value: "2026" },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center p-3 rounded-xl bg-navy-900/50"
              >
                <p className="text-gold-400 font-bold text-lg">{item.value}</p>
                <p className="text-navy-400 text-xs">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center`}
                >
                  <cat.icon size={20} className={cat.color} />
                </div>
                <h3 className="text-white font-bold text-lg">{cat.title}</h3>
              </div>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-3 rounded-xl bg-navy-900/50"
                  >
                    <p className="text-white font-medium text-sm">
                      {item.name}
                    </p>
                    <p className="text-navy-400 text-xs mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
