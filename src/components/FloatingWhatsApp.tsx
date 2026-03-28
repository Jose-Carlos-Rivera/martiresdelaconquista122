"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  const [tooltip, setTooltip] = useState(true);
  const { scrollYProgress } = useScroll();

  // Show after scrolling past hero
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setShow(v > 0.1);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Hide tooltip after 5s
  useEffect(() => {
    const timer = setTimeout(() => setTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50 flex items-end gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="glass rounded-2xl px-4 py-3 max-w-[200px] relative"
              >
                <button
                  onClick={() => setTooltip(false)}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-navy-800 flex items-center justify-center"
                >
                  <X size={10} className="text-navy-400" />
                </button>
                <p className="text-white text-xs font-medium">
                  ¿Te interesa el terreno?
                </p>
                <p className="text-navy-400 text-[10px] mt-0.5">
                  Respuesta inmediata por WhatsApp
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href="https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-110 active:scale-95"
          >
            <MessageCircle size={26} className="text-white" fill="white" />
            {/* Ping animation */}
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
