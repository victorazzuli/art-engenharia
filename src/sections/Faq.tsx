"use client";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FAQ } from "@/data/faq";
import { IconPlus } from "@/components/ui/Icons";
import { cx } from "@/utils/format";

/** Accordion acessível (mesmo padrão ARIA do shadcn/Radix, sem dependência). */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <section id="duvidas" aria-labelledby="faq-title" className="scroll-mt-[var(--header-h)] bg-paper py-20 text-ink sm:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="label text-primary-deep">Dúvidas</p>
          <h2 id="faq-title" className="title mt-3 text-[clamp(2.2rem,5vw,4rem)]">
            Perguntas que todo mundo faz.
          </h2>
          <p className="mt-4 max-w-[36ch] text-[16px] leading-relaxed text-ink-muted">Não achou a sua? Pergunte direto ao Rodrigo no WhatsApp.</p>
        </div>
        <div className="border-t-2 border-ink">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            const bid = `${base}-b${i}`;
            const pid = `${base}-p${i}`;
            return (
              <div key={f.q} className="border-b border-ink/15">
                <h3>
                  <button
                    id={bid}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={pid}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-[64px] w-full items-center justify-between gap-6 py-5 text-left text-[clamp(1.05rem,1.6vw,1.3rem)] font-semibold"
                  >
                    {f.q}
                    <span className={cx("grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/20 transition-transform duration-300", isOpen && "rotate-45 border-ink bg-ink text-paper")}>
                      <IconPlus size={16} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={pid}
                      role="region"
                      aria-labelledby={bid}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-6 text-[16px] leading-relaxed text-ink-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
