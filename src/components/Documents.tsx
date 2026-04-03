"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Download, Eye, Shield } from "lucide-react";

const documents = [
  {
    name: "Escrituras de Propiedad",
    desc: "Documento legal que acredita la titularidad del terreno",
    icon: FileText,
    available: false,
  },
  {
    name: "Certificado de Uso de Suelo",
    desc: "H/5/30/A — Habitacional, 5 niveles, 30% área libre",
    icon: Shield,
    available: false,
  },
  {
    name: "Constancia de Alineamiento y Número Oficial",
    desc: "Mártires de la Conquista 122, Escandón I Sección",
    icon: FileText,
    available: false,
  },
  {
    name: "Predial al Corriente",
    desc: "Comprobante de pagos al día ante la tesorería",
    icon: FileText,
    available: false,
  },
  {
    name: "Boleta de Agua",
    desc: "Al corriente con el Sistema de Aguas de la CDMX",
    icon: FileText,
    available: false,
  },
  {
    name: "Ficha Técnica del Terreno",
    desc: "Especificaciones, medidas, colindancias y potencial",
    icon: Eye,
    available: false,
  },
];

export default function Documents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="documentos" className="py-24 px-4 sm:px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">
            Transparencia
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Documentación
          </h2>
          <p className="text-navy-300 max-w-2xl mx-auto">
            Toda la documentación legal del terreno está disponible para
            revisión. Operación 100% transparente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 hover:border-gold-500/30 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <doc.icon size={22} className="text-gold-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {doc.name}
                  </h3>
                  <p className="text-navy-400 text-xs mb-3">{doc.desc}</p>
                  {doc.available ? (
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 text-xs font-medium"
                    >
                      <Download size={14} />
                      Descargar PDF
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-navy-500 text-xs">
                      <Eye size={14} />
                      Disponible bajo solicitud
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-navy-400 text-sm mt-8"
        >
          Para solicitar acceso a documentos adicionales, contáctanos por
          WhatsApp o correo electrónico.
        </motion.p>
      </div>
    </section>
  );
}
