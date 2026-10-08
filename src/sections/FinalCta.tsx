"use client";
import { motion } from "motion/react";
import { waLink, WA_DEFAULT } from "@/data/company";
import { IconWhatsApp } from "@/components/ui/Icons";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-bg py-24 sm:py-32">
      {/* Luz dourada de fim de tarde subindo do horizonte */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[90%] bg-[radial-gradient(70%_80%_at_50%_100%,rgb(var(--rgb-primary)/0.45),rgb(var(--rgb-primary)/0.08)_45%,transparent_70%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-[18%] -z-10 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      <div className="wrap text-center">
        <motion.h2
          id="cta-title"
          className="title mx-auto max-w-[17ch] text-[clamp(2.4rem,6.4vw,5.6rem)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Sua conta de luz do próximo mês pode ser a última cara.
        </motion.h2>
        <p className="mx-auto mt-6 max-w-[44ch] text-lg text-text/80">Mande uma mensagem. O Rodrigo responde, entende o seu caso e agenda a visita.</p>
        <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="btn-wa mt-10 min-h-[60px] px-8 text-base">
          <IconWhatsApp size={22} /> Falar com o Rodrigo no WhatsApp
        </a>
      </div>
    </section>
  );
}
