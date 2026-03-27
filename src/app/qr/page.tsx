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
    label: "Documentación",
    desc: "Ficha técnica y documentos legales",
    href: "https://martiresdelaconquista122.com#documentos",
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
    <main className="min-h-screen bg-navy-950 flex flex-col items-center justify-center px-4 py-12">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,160,23,0.08)_0%,_transparent_50%)]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          {/* Logo/Icon */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-gold-500/20">
            <Building2 size={36} className="text-navy-950" />
          </div>

          <h1 className="font-display text-3xl font-bold text-white mb-2">
            MC 122
          </h1>
          <p className="gradient-text font-semibold text-sm">
            TERRENO EN VENTA — ESCANDÓN, CDMX
          </p>

          {/* Quick stats */}
          <div className="flex justify-center gap-4 mt-4">
            {[
              { value: "501 m²", label: "Terreno" },
              { value: "5 Niveles", label: "Permitidos" },
              { value: "$18.5M", label: "MXN" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass px-3 py-2 rounded-xl text-center"
              >
                <p className="text-white font-bold text-sm">{stat.value}</p>
                <p className="text-navy-400 text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-2 text-navy-400 text-xs mb-6"
        >
          <MapPin size={12} />
          <span>Mártires de la Conquista 122, Escandón I, Miguel Hidalgo</span>
        </motion.div>

        {/* Links */}
        <div className="space-y-3">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.comingSoon ? undefined : link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${link.color} ${link.textColor} transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                link.primary ? "ring-2 ring-gold-400/30 shadow-lg shadow-gold-500/10" : ""
              } ${link.comingSoon ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <link.icon size={22} />
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  {link.label}
                  {link.comingSoon && (
                    <span className="ml-2 text-xs opacity-70">
                      (Próximamente)
                    </span>
                  )}
                </p>
                <p className="text-xs opacity-75">{link.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-navy-500 text-xs">
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
