"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const TOTAL_FRAMES = 192;

export default function ScrollVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const currentFrameRef = useRef(0);
  const loadedCountRef = useRef(0);
  const introInView = useInView(introRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Detect mobile/portrait
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || window.innerHeight > window.innerWidth
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Progressive frame loading
  useEffect(() => {
    const basePath = isMobile ? "/video/mobile/f_" : "/video/desktop/f_";
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
    loadedCountRef.current = 0;
    setFirstFrameReady(false);
    setLoadProgress(0);

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        const num = String(index + 1).padStart(4, "0");
        img.src = `${basePath}${num}.jpg`;
        img.onload = () => {
          imagesRef.current[index] = img;
          loadedCountRef.current++;
          setLoadProgress(
            Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100)
          );
          if (index === 0) {
            setFirstFrameReady(true);
            drawFrame(0);
          }
          resolve();
        };
        img.onerror = () => resolve(); // Skip broken frames
      });
    };

    // Phase 1: Load critical frames FIRST (frame 0, middle, last)
    const criticalFrames = [0, Math.floor(TOTAL_FRAMES / 2), TOTAL_FRAMES - 1];

    Promise.all(criticalFrames.map((i) => loadFrame(i))).then(() => {
      // Phase 2: Load every 8th frame for rough coverage
      const sparseFrames: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i += 8) {
        if (!criticalFrames.includes(i)) sparseFrames.push(i);
      }

      const loadBatch = async (indices: number[]) => {
        // Load in small batches to not overwhelm the browser
        const batchSize = 4;
        for (let i = 0; i < indices.length; i += batchSize) {
          const batch = indices.slice(i, i + batchSize);
          await Promise.all(batch.map((idx) => loadFrame(idx)));
        }
      };

      loadBatch(sparseFrames).then(() => {
        // Phase 3: Fill in ALL remaining frames
        const remaining: number[] = [];
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          if (!imagesRef.current[i]) remaining.push(i);
        }
        loadBatch(remaining);
      });
    });
  }, [isMobile]);

  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      // Find nearest loaded frame
      let img = imagesRef.current[frameIndex];
      if (!img) {
        // Search nearest loaded frame
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          if (imagesRef.current[frameIndex - offset]) {
            img = imagesRef.current[frameIndex - offset];
            break;
          }
          if (imagesRef.current[frameIndex + offset]) {
            img = imagesRef.current[frameIndex + offset];
            break;
          }
        }
      }
      if (!img) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = rect.width * dpr;
      const ch = rect.height * dpr;

      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
        ctx.scale(dpr, dpr);
      }

      const displayW = rect.width;
      const displayH = rect.height;

      // Object-fit: cover
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = displayW / displayH;
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

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, displayW, displayH);
    },
    [isMobile]
  );

  // Sync to scroll
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
      if (firstFrameReady) drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [firstFrameReady, drawFrame]);

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
              firstFrameReady ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Loading — only show if first frame not ready yet */}
          {!firstFrameReady && (
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

          {/* Background loading indicator — subtle, after first frame loads */}
          {firstFrameReady && loadProgress < 100 && (
            <div className="absolute top-16 right-4 z-20 pointer-events-none">
              <div className="glass rounded-full px-3 py-1.5 flex items-center gap-2">
                <div className="w-3 h-3 border border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                <span className="text-navy-400 text-[10px]">
                  {loadProgress}%
                </span>
              </div>
            </div>
          )}

          {/* Disclaimer at bottom */}
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
