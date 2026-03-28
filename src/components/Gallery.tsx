"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Camera, Play, ChevronLeft, ChevronRight, X } from "lucide-react";

const galleryItems = [
  {
    type: "photo" as const,
    label: "Vista aérea del terreno",
    placeholder: "Foto de dron — vista superior",
  },
  {
    type: "photo" as const,
    label: "Frente sobre Mártires de la Conquista",
    placeholder: "Foto de dron — frente 13.55 m",
  },
  {
    type: "photo" as const,
    label: "Vista del entorno",
    placeholder: "Foto de dron — contexto urbano",
  },
  {
    type: "photo" as const,
    label: "Fondo del terreno",
    placeholder: "Foto de dron — profundidad 37 m",
  },
  {
    type: "video" as const,
    label: "Video con dron",
    placeholder: "Video completo del terreno",
  },
  {
    type: "photo" as const,
    label: "Panorámica de Escandón",
    placeholder: "Foto de dron — la zona",
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="galeria" className="py-24 px-4 sm:px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">
            Visual
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Galería
          </h2>
          <p className="text-navy-300 max-w-2xl mx-auto">
            Imágenes aéreas y recorrido visual del terreno y su entorno
            privilegiado en Escandón.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {galleryItems.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => setSelected(i)}
              className={`relative group overflow-hidden rounded-2xl border border-navy-800/50 hover:border-gold-500/30 transition-all ${
                i === 0 ? "col-span-2 lg:col-span-2 aspect-[2/1]" : "aspect-square"
              }`}
            >
              {/* Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900/90 to-navy-800 flex flex-col items-center justify-center gap-3 p-4">
                {item.type === "video" ? (
                  <div className="w-14 h-14 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center group-hover:bg-gold-500/30 transition-colors">
                    <Play
                      size={24}
                      className="text-gold-400 ml-1"
                      fill="currentColor"
                    />
                  </div>
                ) : (
                  <Camera
                    size={28}
                    className="text-navy-600 group-hover:text-navy-500 transition-colors"
                  />
                )}
                <div className="text-center">
                  <p className="text-navy-400 text-xs sm:text-sm font-medium">
                    {item.placeholder}
                  </p>
                  <p className="text-navy-600 text-[10px] mt-1">
                    Próximamente
                  </p>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-navy-500 text-xs mt-6"
        >
          Las fotografías con dron se agregarán próximamente
        </motion.p>
      </div>
    </section>
  );
}
