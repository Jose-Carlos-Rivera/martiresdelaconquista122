"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#terreno", label: "Terreno" },
  { href: "#potencial", label: "Potencial" },
  { href: "#galeria", label: "Galería" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#zona", label: "La Zona" },
  { href: "#documentos", label: "Documentos" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll spy
      const sections = navLinks
        .map((l) => ({
          id: l.href,
          el: document.querySelector(l.href),
        }))
        .filter((s) => s.el);

      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].el!.getBoundingClientRect();
        if (rect.top <= 200) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass py-2.5 shadow-lg shadow-navy-950/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2 group">
          <span className="font-display text-xl sm:text-2xl gradient-text font-bold group-hover:opacity-80 transition-opacity">
            MC 122
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-3 py-1.5 text-sm rounded-lg transition-all duration-300 ${
                activeSection === link.href
                  ? "text-gold-400"
                  : "text-navy-300 hover:text-white"
              }`}
            >
              {link.label}
              {activeSection === link.href && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-gold-400 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a
            href="https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 ml-4 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-gold-500/20 active:scale-95"
          >
            <Phone size={14} />
            Contactar
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-navy-200 hover:text-gold-400 transition-colors"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden shadow-xl shadow-navy-950/50"
          >
            <div className="p-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-xl transition-all text-sm ${
                    activeSection === link.href
                      ? "text-gold-400 bg-gold-500/10 font-medium"
                      : "text-navy-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 px-4 py-3 rounded-xl font-semibold transition-colors mt-2"
              >
                <Phone size={16} />
                Contactar por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
