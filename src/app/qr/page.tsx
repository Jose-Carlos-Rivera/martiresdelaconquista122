"use client";

import { motion } from "framer-motion";
import {
  Globe,
  ExternalLink,
  Play,
  Phone,
  MessageCircle,
  FileText,
  Camera,
  Users,
  MapPin,
  Building2,
  Sparkles,
} from "lucide-react";

const links = [
  {
    icon: Globe,
    label: "Ver Página Completa",
    desc: "Toda la información del terreno",
    href: "https://martiresdelaconquista122.com",
    color: "from-gold-500 to-gold-600",
    textColor: "text-navy-950",
    primary: true,
  },
  {
    icon: ExternalLink,
    label: "Ficha en EasyBroker",
    desc: "Portal inmobiliario",
    href: "https://www.easybroker.com/mx/listing/marisol466/terreno-en-venta-501-m-uso-de-suelo-habitacional-escandon-miguel-hidalgo",
    color: "from-blue-600 to-blue-700",
    textColor: "text-white",
  },
  {
    icon: Play,
    label: "Video con Dron",
    desc: "Vista aérea del terreno",
    href: "#",
    color: "from-red-600 to-red-700",
    textColor: "text-white",
    comingSoon: true,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    desc: "Respuesta inmediata",
    href: "https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122",
    color: "from-green-600 to-green-700",
    textColor: "text-white",
  },
  {
    icon: Phone,
    label: "Llamar Ahora",
    desc: "55 5414 8142",
    href: "tel:+525554148142",
    color: "from-navy-700 to-navy-800",
    textColor: "text-white",
  },
  {
    icon: FileText,
    label: "Ficha Técnica (PDF)",
    desc: "Especificaciones completas del terreno",
    href: "https://martiresdelaconquista122.com/FICHA_TERRENO_MARTIRES_122.pdf",
    color: "from-navy-700 to-navy-800",
    textColor: "text-white",
  },
  {
    icon: Camera,
    label: "Instagram",
    desc: "@marisolramos.look",
    href: "https://www.instagram.com/marisolramos.look/",
    color: "from-pink-600 to-purple-600",
    textColor: "text-white",
  },
  {
    icon: Users,
    label: "Facebook",
    desc: "Marisol Ramos Inmobiliaria",
    href: "https://www.facebook.com/profile.php?id=61582474410782",
    color: "from-blue-700 to-blue-800",
    textColor: "text-white",
  },
];

export default function QRPage() {
  return (
    <main className="min-h-screen bg-navy-950 flex flex-col items-center justify-start px-4 py-10 sm:py-14">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,160,23,0.06)_0%,_transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,160,23,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-gold-500/20"
          >
            <Building2 size={36} className="text-navy-950" />
          </motion.div>

          <h1 className="font-display text-3xl font-bold text-white mb-1">
            MC 122
          </h1>
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <Sparkles size={12} className="text-gold-400" />
            <p className="gradient-text font-semibold text-sm tracking-wide">
              TERRENO EN VENTA — ESCANDÓN, CDMX
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex justify-center gap-3 mt-4">
            {[
              { value: "501 m²", label: "Terreno" },
              { value: "5 Niveles", label: "Permitidos" },
              { value: "$18.5M", label: "MXN" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass px-4 py-2.5 rounded-xl text-center flex-1"
              >
                <p className="text-white font-bold text-sm">{stat.value}</p>
                <p className="text-navy-400 text-[10px]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 text-navy-400 text-xs mb-6"
        >
          <MapPin size={12} />
          <span>Escandón I Sección, Alcaldía Miguel Hidalgo, CDMX</span>
        </motion.div>

        {/* Links */}
        <div className="space-y-2.5">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.comingSoon ? undefined : link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${link.color} ${link.textColor} transition-all duration-200 active:scale-[0.98] ${
                link.primary
                  ? "ring-2 ring-gold-400/30 shadow-lg shadow-gold-500/10 hover:shadow-xl hover:shadow-gold-500/20"
                  : "hover:brightness-110"
              } ${link.comingSoon ? "opacity-40 cursor-not-allowed" : "hover:scale-[1.02]"}`}
            >
              <link.icon size={22} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">
                  {link.label}
                  {link.comingSoon && (
                    <span className="ml-2 text-xs opacity-70">
                      (Próximamente)
                    </span>
                  )}
                </p>
                <p className="text-xs opacity-75 truncate">{link.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-10"
        >
          <p className="text-navy-500 text-xs font-medium">
            Marisol Ramos Inmobiliaria
          </p>
          <p className="text-navy-600 text-[10px] mt-1">
            contacto@marisolramosinmobiliaria.com
          </p>
        </motion.div>
      </div>
    </main>
  );
}
