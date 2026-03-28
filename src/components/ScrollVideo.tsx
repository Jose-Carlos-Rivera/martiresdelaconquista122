"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Detect mobile
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Sync video playback to scroll position
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      setIsLoaded(true);
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", handleLoaded);

    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (video.duration) {
        video.currentTime = v * video.duration;
      }
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      unsubscribe();
    };
  }, [scrollYProgress]);

  // Fade text based on scroll
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const endTitleOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  const endTitleY = useTransform(scrollYProgress, [0.8, 0.95], [40, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[500vh]">
      {/* Sticky video container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-navy-950">
        {/* Video */}
        <video
          ref={videoRef}
          src="/video/transform.mp4"
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-950">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
              <p className="text-navy-400 text-sm">Cargando experiencia...</p>
            </div>
          </div>
        )}

        {/* Dark gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-transparent to-navy-950/70 pointer-events-none" />

        {/* Start text overlay */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
          <span className="text-gold-400 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Imagina el potencial
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            De terreno vacío
          </h2>
          <p className="text-navy-300 text-sm sm:text-base mt-3 max-w-md">
            Desliza hacia abajo para ver la transformación
          </p>
          {/* Scroll hint arrow */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="mt-6"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gold-500/60"
            >
              <path
                d="M12 4v16m0 0l-6-6m6 6l6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* End text overlay */}
        <motion.div
          style={{ opacity: endTitleOpacity, y: endTitleY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
          <span className="text-gold-400 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-4">
            501 m² de oportunidad
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            A desarrollo premium
          </h2>
          <a
            href="https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto mt-6 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-8 py-4 rounded-full text-lg transition-all hover:shadow-xl hover:shadow-gold-500/30 active:scale-95"
          >
            Quiero saber más
          </a>
        </motion.div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-navy-800/50">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
          />
        </div>

        {/* Progress indicator dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {["Terreno", "Transformación", "Desarrollo"].map((label, i) => {
            const thresholds = [0, 0.5, 1];
            return (
              <motion.div
                key={label}
                className="flex items-center gap-2"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [
                      Math.max(0, thresholds[i] - 0.1),
                      thresholds[i],
                      Math.min(1, thresholds[i] + 0.3),
                    ],
                    [0.3, 1, i === 2 ? 1 : 0.3]
                  ),
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span className="text-[10px] text-navy-300 uppercase tracking-wider hidden sm:block">
                  {label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
