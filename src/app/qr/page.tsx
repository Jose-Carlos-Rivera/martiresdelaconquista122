"use client";

import { motion } from "framer-motion";
import { Building2, Phone, ExternalLink } from "lucide-react";

// App-style grid buttons (3 per row)
const gridLinks = [
  {
    label: "Página Web",
    href: "https://martiresdelaconquista122.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    bg: "bg-gradient-to-br from-gold-500/20 to-gold-600/10",
    iconColor: "text-gold-400",
  },
  {
    label: "Video Dron",
    href: "#",
    comingSoon: true,
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-red-500" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    bg: "bg-gradient-to-br from-red-500/15 to-red-600/5",
    iconColor: "text-red-500",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-500" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
    bg: "bg-gradient-to-br from-green-500/15 to-green-600/5",
    iconColor: "text-green-500",
  },
  {
    label: "Ficha PDF",
    href: "https://martiresdelaconquista122.com/FICHA_TERRENO_MARTIRES_122.pdf",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    bg: "bg-gradient-to-br from-blue-400/15 to-blue-500/5",
    iconColor: "text-blue-400",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/marisolramos.look/",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="url(#ig-gradient)">
        <defs>
          <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#feda75" />
            <stop offset="25%" stopColor="#fa7e1e" />
            <stop offset="50%" stopColor="#d62976" />
            <stop offset="75%" stopColor="#962fbf" />
            <stop offset="100%" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
    bg: "bg-gradient-to-br from-pink-500/15 to-purple-500/10",
    iconColor: "text-pink-500",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61582474410782",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-600" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    bg: "bg-gradient-to-br from-blue-600/15 to-blue-700/5",
    iconColor: "text-blue-600",
  },
];

export default function QRPage() {
  return (
    <main className="h-screen bg-navy-950 flex flex-col items-center justify-center px-4 py-6 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,160,23,0.06)_0%,_transparent_50%)]" />
      </div>

      <div className="relative w-full max-w-sm flex flex-col items-center gap-4 sm:gap-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-gold-500/20">
            <Building2 size={28} className="text-navy-950" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">
            MC 122
          </h1>
          <p className="gradient-text text-xs font-semibold tracking-wide mt-0.5">
            TERRENO EN VENTA
          </p>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-2 w-full"
        >
          {[
            { value: "501 m²", label: "Terreno" },
            { value: "H/5/30", label: "Uso habitacional" },
            { value: "$18,500,000", label: "MXN" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl px-2 py-2.5 text-center"
            >
              <p className="text-white font-bold text-xs sm:text-sm leading-tight">
                {stat.value}
              </p>
              <p className="text-navy-400 text-[9px] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Address */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-navy-400 text-[11px] text-center leading-snug"
        >
          Mártires de la Conquista 122, Escandón I Sección,
          <br />
          Alcaldía Miguel Hidalgo, C.P. 11800, CDMX
        </motion.p>

        {/* Two priority buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-2 gap-2.5 w-full"
        >
          <a
            href="tel:+525554148142"
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm transition-all active:scale-95 shadow-lg shadow-gold-500/20"
          >
            <Phone size={18} />
            Llamar
          </a>
          <a
            href="https://www.easybroker.com/mx/listing/marisol466/terreno-en-venta-501-m-uso-de-suelo-habitacional-escandon-miguel-hidalgo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-navy-800 hover:bg-navy-700 border border-navy-700 text-white font-bold text-sm transition-all active:scale-95"
          >
            <ExternalLink size={16} />
            EasyBroker
          </a>
        </motion.div>

        {/* App-style grid buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-2.5 w-full"
        >
          {gridLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.comingSoon ? undefined : link.href}
              target={link.href?.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href?.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border border-navy-800/60 hover:border-navy-700 transition-all active:scale-95 ${link.bg} ${
                link.comingSoon ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              {link.icon}
              <span className="text-white text-[10px] sm:text-xs font-medium text-center leading-tight">
                {link.label}
                {link.comingSoon && (
                  <span className="block text-[8px] text-navy-400 mt-0.5">
                    Próximamente
                  </span>
                )}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-navy-500 text-[10px] font-medium">
            Marisol Ramos Inmobiliaria
          </p>
          <p className="text-navy-600 text-[9px] mt-0.5">
            contacto@marisolramosinmobiliaria.com
          </p>
        </motion.div>
      </div>
    </main>
  );
}
