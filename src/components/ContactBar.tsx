"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WA_DEFAULT, waLink } from "@/data/company";
import { IconCalc, IconWhatsApp } from "@/components/ui/Icons";

/** Celular: barra fixa [Simular | WhatsApp]. Desktop: botão flutuante de WhatsApp depois do hero. */
export function ContactBar() {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const on = () => setPast(window.scrollY > window.innerHeight * 0.7);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <div className="safe-b fixed inset-x-0 bottom-0 z-40 border-t border-text/10 bg-bg/90 px-3 pt-2.5 backdrop-blur-xl md:hidden">
        <div className="flex gap-2">
          <a href="#simulador" className="btn-ghost min-h-[52px] flex-1 px-3">
            <IconCalc size={18} /> Simular
          </a>
          <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="btn-wa min-h-[52px] flex-[1.4] px-3">
            <IconWhatsApp size={20} /> WhatsApp
          </a>
        </div>
      </div>
      <AnimatePresence>
        {past && (
          <motion.a
            href={waLink(WA_DEFAULT)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chamar a Art no WhatsApp"
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            className="fixed bottom-7 right-7 z-40 hidden h-16 items-center gap-3 rounded-full bg-whatsapp pl-5 pr-6 font-semibold text-ink shadow-[0_16px_40px_-10px_rgb(var(--rgb-whatsapp)/0.7)] transition-transform hover:scale-105 md:flex"
          >
            <IconWhatsApp size={26} /> Falar com o Rodrigo
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
