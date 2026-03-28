"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TOTAL_FRAMES = 121;
const FRAME_PATH = "/video/frames/frame_";

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(4, "0");
      img.src = `${FRAME_PATH}${num}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
          // Draw first frame
          drawFrame(0);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img) return;

    // Set canvas size to match container
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    // Draw image to cover canvas (like object-fit: cover)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;

    let sx = 0,
      sy = 0,
      sw = img.naturalWidth,
      sh = img.naturalHeight;

    if (imgRatio > canvasRatio) {
      // Image is wider — crop sides
      sw = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      // Image is taller — crop top/bottom
      sh = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  }, []);

  // Sync frame to scroll using requestAnimationFrame for smoothness
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(v * TOTAL_FRAMES)
      );
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        requestAnimationFrame(() => drawFrame(frameIndex));
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, drawFrame]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        drawFrame(currentFrameRef.current);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, drawFrame]);

  const titleOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.12], [0, -50]);
  const endTitleOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const endTitleY = useTransform(scrollYProgress, [0.82, 0.95], [30, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-navy-950">
        {/* Canvas for frame rendering */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-950 z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
              <div className="text-center">
                <p className="text-white text-sm font-medium">
                  Cargando experiencia
                </p>
                <p className="text-navy-400 text-xs mt-1">
                  {loadProgress}% completado
                </p>
              </div>
              {/* Progress bar */}
              <div className="w-48 h-1 bg-navy-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Gradient overlays for text */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-transparent to-navy-950/60 pointer-events-none" />

        {/* Start text */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-20"
        >
          <span className="text-gold-400 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Imagina el potencial
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            De terreno vacío
          </h2>
          <p className="text-white/70 text-sm sm:text-base mt-3 max-w-md drop-shadow">
            Desliza hacia abajo para ver la transformación
          </p>
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

        {/* End text */}
        <motion.div
          style={{ opacity: endTitleOpacity, y: endTitleY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-20"
        >
          <span className="text-gold-400 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-4">
            501 m² de oportunidad
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            A desarrollo premium
          </h2>
          <a
            href="https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto mt-6 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-8 py-4 rounded-full text-lg transition-all hover:shadow-xl hover:shadow-gold-500/30 active:scale-95 drop-shadow-lg"
          >
            Quiero saber más
          </a>
        </motion.div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-navy-800/50 z-20">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
          />
        </div>

        {/* Stage indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
          {["Terreno", "Transformación", "Desarrollo"].map((label, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-2"
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [
                    Math.max(0, i * 0.33 - 0.1),
                    i * 0.33,
                    Math.min(1, i * 0.33 + 0.3),
                  ],
                  [0.3, 1, i === 2 ? 1 : 0.3]
                ),
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="text-[10px] text-white/60 uppercase tracking-wider hidden sm:block drop-shadow">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
