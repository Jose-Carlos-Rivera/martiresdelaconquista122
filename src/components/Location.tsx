"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Train,
  Bus,
  Car,
  MapPin,
} from "lucide-react";

const metro = [
  { name: "Patriotismo", line: "Línea 9", dist: "600 m", time: "8 min" },
  { name: "Chilpancingo", line: "Línea 9", dist: "900 m", time: "12 min" },
  { name: "Juanacatlán", line: "Línea 1", dist: "1 km", time: "14 min" },
  {
    name: "Tacubaya",
    line: "Líneas 1, 7, 9",
    dist: "1.2 km",
    time: "15 min",
  },
];

const metrobus = [
  { name: "Escandón", line: "Línea 2", note: "3 cuadras" },
  { name: "Patriotismo", line: "Línea 2", note: "5 min" },
  { name: "Chilpancingo", line: "Línea 1", note: "12 min" },
];

const vialidades = [
  { name: "Av. Patriotismo", dist: "3 cuadras" },
  { name: "Viaducto Miguel Alemán", dist: "5 min en auto" },
  { name: "Circuito Interior (Av. Revolución)", dist: "8 min en auto" },
  { name: "Eje 4 Sur Benjamín Franklin", dist: "5 min en auto" },
];

export default function Location() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ubicacion" className="py-24 px-4 sm:px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">
            Conectividad
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Ubicación Privilegiada
          </h2>
          <p className="text-navy-300 max-w-2xl mx-auto">
            Escandón I Sección, Alcaldía Miguel Hidalgo. Conectividad
            excepcional con metro, metrobús y vialidades principales.
          </p>
        </motion.div>

        {/* Map embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-2xl overflow-hidden mb-12 border border-gold-500/10"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1882.5!2d-99.17670!3d19.39830!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff5b4b9c4e7f%3A0x0!2sMartires+de+la+Conquista+122%2C+Escandon+I+Secc%2C+Miguel+Hidalgo%2C+11800+Ciudad+de+Mexico!5e0!3m2!1ses!2smx!4v1"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
            title="Ubicación del terreno - Mártires de la Conquista 122, Escandón"
          />
        </motion.div>

        {/* Transport grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Metro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Train size={20} className="text-orange-400" />
              </div>
              <h3 className="text-white font-bold text-lg">Metro</h3>
            </div>
            <div className="space-y-3">
              {metro.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-navy-900/50"
                >
                  <div>
                    <p className="text-white font-medium text-sm">{m.name}</p>
                    <p className="text-navy-400 text-xs">{m.line}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold-400 font-semibold text-sm">
                      {m.time}
                    </p>
                    <p className="text-navy-400 text-xs">{m.dist}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Metrobus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Bus size={20} className="text-red-400" />
              </div>
              <h3 className="text-white font-bold text-lg">Metrobús</h3>
            </div>
            <div className="space-y-3">
              {metrobus.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-navy-900/50"
                >
                  <div>
                    <p className="text-white font-medium text-sm">{m.name}</p>
                    <p className="text-navy-400 text-xs">{m.line}</p>
                  </div>
                  <p className="text-gold-400 font-semibold text-sm">
                    {m.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <MapPin size={20} className="text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-lg">Dirección</h3>
            </div>
            <p className="text-navy-300 text-sm">
              Mártires de la Conquista 122, Escandón I Sección, Alcaldía Miguel
              Hidalgo, 11800 CDMX
            </p>
          </motion.div>

          {/* Vialidades */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Car size={20} className="text-green-400" />
              </div>
              <h3 className="text-white font-bold text-lg">Vialidades</h3>
            </div>
            <div className="space-y-3">
              {vialidades.map((v) => (
                <div
                  key={v.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-navy-900/50"
                >
                  <p className="text-white font-medium text-sm">{v.name}</p>
                  <p className="text-gold-400 font-semibold text-sm">
                    {v.dist}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
