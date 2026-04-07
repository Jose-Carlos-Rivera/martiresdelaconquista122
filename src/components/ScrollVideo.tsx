"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const DESKTOP_FRAMES = 120;
const MOBILE_FRAMES = 64;

export default function ScrollVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const currentFrameRef = useRef(0);
  const totalFramesRef = useRef(DESKTOP_FRAMES);
  const introInView = useInView(introRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Detect mobile/portrait — run once on mount
  useEffect(() => {
    const mobile =
      window.innerWidth < 768 || window.innerHeight > window.innerWidth;
    setIsMobile(mobile);
    totalFramesRef.current = mobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
  }, []);

  // Load ALL frames sequentially — simple and reliable
  useEffect(() => {
    const total = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
    const basePath = isMobile ? "/video/mobile/f_" : "/video/desktop/f_";
    totalFramesRef.current = total;

    const images: (HTMLImageElement | null)[] = new Array(total).fill(null);
    imagesRef.current = images;
    let loadedCount = 0;

    const loadFrame = (index: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        const num = String(index + 1).padStart(4, "0");
        img.src = `${basePath}${num}.jpg`;
        img.onload = () => {
          images[index] = img;
          loadedCount++;
          const pct = Math.round((loadedCount / total) * 100);
          setLoadProgress(pct);

          // Show canvas as soon as first frame loads
          if (index === 0) {
            setReady(true);
            drawFrame(0);
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    // Load frames in sequential batches of 6
    // This ensures frames load IN ORDER so the fallback always works
    const loadAll = async () => {
      const batchSize = 6;
      for (let i = 0; i < total; i += batchSize) {
        const batch = [];
        for (let j = i; j < Math.min(i + batchSize, total); j++) {
          batch.push(loadFrame(j));
        }
        await Promise.all(batch);
      }
    };

    loadAll();
  }, [isMobile]);

  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      // Find the requested frame, or the nearest PREVIOUS loaded frame
      let img: HTMLImageElement | null = null;
      for (let i = frameIndex; i >= 0; i--) {
        if (imagesRef.current[i]) {
          img = imagesRef.current[i];
          break;
        }
      }
      // If nothing before, try first available
      if (!img) {
        for (let i = 0; i < imagesRef.current.length; i++) {
          if (imagesRef.current[i]) {
            img = imagesRef.current[i];
            break;
          }
        }
      }
      if (!img) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.round(rect.width * dpr);
      const ch = Math.round(rect.height * dpr);

      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }

      // Object-fit: cover
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;
      let sx = 0,
        sy = 0,
        sw = img.naturalWidth,
        sh = img.naturalHeight;

      if (imgRatio > canvasRatio) {
        sw = img.naturalHeight * canvasRatio;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / canvasRatio;
        sy = (img.naturalHeight - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    },
    [isMobile]
  );

  // Sync to scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const total = totalFramesRef.current;
      const frameIndex = Math.min(total - 1, Math.floor(v * total));
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
      if (ready) drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ready, drawFrame]);

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Intro text BEFORE the video */}
      <section ref={introRef} className="py-16 sm:py-28 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={introInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-gold-400 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase">
            Imagina el potencial
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-5 leading-tight">
            De terreno vacío a{" "}
            <span className="gradient-text">desarrollo premium</span>
          </h2>
          <p className="text-navy-300 text-sm sm:text-base max-w-xl mx-auto mb-3">
            Desliza hacia abajo para explorar una visualización conceptual de lo
            que podría construirse en este terreno.
          </p>
          <p className="text-navy-500 text-xs max-w-lg mx-auto italic">
            * Esta visualización es solo ilustrativa y no representa un proyecto
            real. Lo que se vende es el terreno, no un desarrollo construido.
          </p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="mt-6 sm:mt-8"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gold-500/50 mx-auto"
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
      </section>

      {/* Scroll-driven video */}
      <section ref={sectionRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-navy-950">
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Loading — only before first frame */}
          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center bg-navy-950 z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                <p className="text-white text-sm font-medium">
                  Cargando experiencia
                </p>
                <div className="w-48 h-1 bg-navy-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all duration-300"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Background loading indicator */}
          {ready && loadProgress < 100 && (
            <div className="absolute top-16 right-4 z-20 pointer-events-none">
              <div className="glass rounded-full px-3 py-1.5 flex items-center gap-2">
                <div className="w-3 h-3 border border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                <span className="text-navy-400 text-[10px]">
                  {loadProgress}%
                </span>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="absolute bottom-4 left-0 right-0 text-center z-20 pointer-events-none">
            <p className="text-white/30 text-[10px] sm:text-xs">
              Visualización conceptual · Se vende el terreno, no el desarrollo
            </p>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-navy-800/50 z-20">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
            />
          </div>
        </div>
      </section>
    </>
  );
}
