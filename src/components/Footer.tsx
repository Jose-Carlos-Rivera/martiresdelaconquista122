"use client";

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-navy-800/50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-display text-lg gradient-text font-bold">
            MC 122
          </span>
          <p className="text-navy-500 text-xs mt-1">
            Mártires de la Conquista 122, Escandón, CDMX
          </p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-navy-500 text-xs">
            Marisol Ramos Inmobiliaria
          </p>
          <p className="text-navy-600 text-xs mt-0.5">
            contacto@marisolramosinmobiliaria.com · 55 5414 8142
          </p>
        </div>
      </div>
    </footer>
  );
}
