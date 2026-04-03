"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Camera,
  Users,
  ExternalLink,
} from "lucide-react";

const contactMethods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "55 5414 8142",
    href: "https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122",
    color: "bg-green-500/10",
    iconColor: "text-green-400",
    primary: true,
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "55 5414 8142",
    href: "tel:+525554148142",
    color: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Mail,
    label: "Correo",
    value: "contacto@marisolramosinmobiliaria.com",
    href: "mailto:contacto@marisolramosinmobiliaria.com?subject=Terreno%20M%C3%A1rtires%20de%20la%20Conquista%20122",
    color: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
];

const socialLinks = [
  {
    icon: ExternalLink,
    label: "Ficha Técnica",
    href: "https://www.easybroker.com/mx/listing/marisol466/terreno-en-venta-501-m-uso-de-suelo-habitacional-escandon-miguel-hidalgo",
  },
  {
    icon: Camera,
    label: "Instagram",
    href: "https://www.instagram.com/marisolramos.look/",
  },
  {
    icon: Users,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61582474410782",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contacto"
      className="py-24 px-4 sm:px-6 bg-navy-950/50"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">
            Conversemos
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            ¿Te interesa este terreno?
          </h2>
          <p className="text-navy-300 max-w-xl mx-auto">
            Agenda una visita al terreno o solicita más información. Respuesta
            inmediata por WhatsApp.
          </p>
        </motion.div>

        {/* Contact methods */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {contactMethods.map((method, i) => (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.label === "WhatsApp" ? "_blank" : undefined}
              rel={
                method.label === "WhatsApp"
                  ? "noopener noreferrer"
                  : undefined
              }
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl p-6 text-center hover:border-gold-500/30 transition-all ${
                method.primary ? "ring-2 ring-gold-500/30" : ""
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl ${method.color} flex items-center justify-center mx-auto mb-4`}
              >
                <method.icon size={26} className={method.iconColor} />
              </div>
              <h3 className="text-white font-bold mb-1">{method.label}</h3>
              <p className="text-navy-300 text-sm break-all">{method.value}</p>
            </motion.a>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <a
            href="https://wa.me/525554148142?text=Hola%2C%20me%20interesa%20el%20terreno%20en%20M%C3%A1rtires%20de%20la%20Conquista%20122"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold px-10 py-4 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-green-500/30"
          >
            <MessageCircle size={22} />
            Escribir por WhatsApp
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 glass px-4 py-2 rounded-full text-navy-300 hover:text-gold-400 text-sm transition-colors"
            >
              <link.icon size={16} />
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
