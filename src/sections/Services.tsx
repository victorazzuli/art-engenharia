"use client";
import { motion } from "motion/react";
import { SERVICES } from "@/data/services";
import { waLink } from "@/data/company";
import { IconWhatsApp } from "@/components/ui/Icons";

export function Services() {
  const main = SERVICES.filter((s) => s.primary);
  const more = SERVICES.filter((s) => !s.primary);
  return (
    <section aria-labelledby="serv-title" className="bg-paper-2 py-20 text-ink sm:py-24">
      <div className="wrap">
        <p className="label text-primary-deep">Serviços</p>
        <h2 id="serv-title" className="title mt-3 max-w-[18ch] text-[clamp(2rem,4.4vw,3.6rem)]">
          Para a sua casa ou para o seu negócio.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {main.map((s, i) => (
            <motion.article
              key={s.id}
              className="group relative overflow-hidden rounded-[24px] bg-bg p-7 text-text sm:p-9"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <span aria-hidden className="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{s.tag}</span>
              {/* Linha de corrente que acende no hover */}
              <span aria-hidden className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-700 group-hover:scale-x-100" />
              <h3 className="mt-10 max-w-[18ch] text-[clamp(1.6rem,3vw,2.3rem)] font-bold leading-[1.05] tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-4 max-w-[42ch] text-[16px] leading-relaxed text-muted">{s.text}</p>
              <a href={waLink(`Olá, Rodrigo! Vim pelo site da Art Engenharia. Quero um orçamento de ${s.title.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-primary underline-offset-4 hover:underline">
                <IconWhatsApp size={17} /> Pedir orçamento
              </a>
            </motion.article>
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {more.map((s) => (
            <article key={s.id} className="rounded-[20px] border border-ink/15 bg-paper p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">Também atendemos · {s.tag}</p>
              <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
              <p className="mt-1 text-[15px] text-ink-muted">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
