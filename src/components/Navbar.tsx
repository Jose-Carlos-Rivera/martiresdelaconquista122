"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#terreno", label: "Terreno" },
  { href: "#potencial", label: "Potencial" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#zona", label: "La Zona" },
  { href: "#documentos", label: "Documentos" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="font-display text-xl sm:text-2xl gradient-text font-bold">
            MC 122
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-navy-200 hover:text-gold-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            <Phone size={14} />
            Contactar
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-navy-200 hover:text-gold-400"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-navy-200 hover:text-gold-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 px-4 py-3 rounded-full font-semibold transition-colors"
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
