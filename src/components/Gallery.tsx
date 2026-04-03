"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";

const galleryItems = [
  {
    src: "/images/gallery/terreno-aereo-cenital.jpg",
    label: "Vista aérea cenital del terreno",
    span: "col-span-2 lg:col-span-2",
    aspect: "aspect-[2/1]",
  },
  {
    src: "/images/gallery/terreno-delimitado.jpg",
    label: "Terreno delimitado — 501 m²",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/images/gallery/fachada-frente.jpg",
    label: "Fachada sobre Mártires de la Conquista",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/images/gallery/terreno-aereo-diagonal.jpg",
    label: "Vista aérea diagonal del terreno",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/images/gallery/terreno-detalle-aereo.jpg",
    label: "Detalle aéreo del terreno",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/images/gallery/terreno-aereo-contexto.jpg",
    label: "Vista aérea — contexto urbano",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/images/gallery/panoramica-cdmx-sur.jpg",
    label: "Panorámica CDMX hacia el sur",
    span: "col-span-2 lg:col-span-2",
    aspect: "aspect-[2/1]",
  },
  {
    src: "/images/gallery/panoramica-cdmx-norte.jpg",
    label: "Panorámica CDMX hacia el norte",
    span: "col-span-2 lg:col-span-1",
    aspect: "aspect-[2/1] lg:aspect-square",
  },
  {
    type: "video" as const,
    src: "",
    label: "Video con dron",
    span: "",
    aspect: "aspect-square",
    comingSoon: true,
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photoItems = galleryItems.filter((item) => !("type" in item));

  const openLightbox = (index: number) => {
    if ("comingSoon" in galleryItems[index]) return;
    setLightbox(index);
  };

  const closeLightbox = () => setLightbox(null);

  const navigate = (dir: number) => {
    if (lightbox === null) return;
    let next = lightbox + dir;
    // Skip video placeholder
    while (
      next >= 0 &&
      next < galleryItems.length &&
      "comingSoon" in galleryItems[next]
    ) {
      next += dir;
    }
    if (next >= 0 && next < galleryItems.length) setLightbox(next);
  };

  return (
    <>
      <section id="galeria" className="py-20 sm:py-24 px-4 sm:px-6" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">
              Visual
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Galería
            </h2>
            <p className="text-navy-300 max-w-2xl mx-auto text-sm sm:text-base">
              Imágenes aéreas y recorrido visual del terreno y su entorno en
              Escandón.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {galleryItems.map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                onClick={() => openLightbox(i)}
                className={`relative group overflow-hidden rounded-xl sm:rounded-2xl border border-navy-800/50 hover:border-gold-500/30 transition-all ${item.span} ${item.aspect}`}
              >
                {"comingSoon" in item ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900/90 to-navy-800 flex flex-col items-center justify-center gap-3 p-4">
                    <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center">
                      <Play
                        size={20}
                        className="text-gold-400 ml-0.5"
                        fill="currentColor"
                      />
                    </div>
                    <p className="text-navy-400 text-xs font-medium">
                      Video con dron
                    </p>
                    <p className="text-navy-600 text-[10px]">Próximamente</p>
                  </div>
                ) : (
                  <>
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/30 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-navy-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-[10px] sm:text-xs">
                        {item.label}
                      </p>
                    </div>
                  </>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && !("comingSoon" in galleryItems[lightbox]) && (
        <div
          className="fixed inset-0 bg-navy-950/95 z-[100] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            className="absolute left-4 text-white/40 hover:text-white z-10"
          >
            <ChevronLeft size={36} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
            className="absolute right-4 text-white/40 hover:text-white z-10"
          >
            <ChevronRight size={36} />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryItems[lightbox].src}
              alt={galleryItems[lightbox].label}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <p className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
              {galleryItems[lightbox].label}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
