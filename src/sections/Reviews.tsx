"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { COMPANY } from "@/data/company";
import { TESTIMONIALS } from "@/data/testimonials";
import { IconBack, IconChevron, IconStar } from "@/components/ui/Icons";
import { cx } from "@/utils/format";

function Highlighted({ text, mark }: { text: string; mark: string }) {
  const i = text.indexOf(mark);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-transparent text-accent">{mark}</mark>
      {text.slice(i + mark.length)}
    </>
  );
}

export function Reviews() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const go = (d: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(TESTIMONIALS.length - 1, index + d));
    const card = el.children[next] as HTMLElement;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    setIndex(next);
  };

  return (
    <section id="avaliacoes" aria-labelledby="aval-title" className="relative scroll-mt-[var(--header-h)] overflow-hidden bg-bg py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="wrap grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16">
        <div>
          <p className="label text-accent">Avaliações reais</p>
          <h2 id="aval-title" className="sr-only">Avaliações no Google</h2>
          <p className="title mt-4 text-[clamp(6rem,16vw,11rem)] leading-[0.8] text-text" aria-hidden>
            4,9
          </p>
          <div className="mt-6 flex text-accent" role="img" aria-label="4,9 de 5 estrelas">
            {Array.from({ length: 5 }, (_, i) => <IconStar key={i} size={22} />)}
          </div>
          <p className="mt-3 text-lg">
            Nota {COMPANY.rating.value.toLocaleString("pt-BR")} em <strong>{COMPANY.rating.count} avaliações no Google</strong>.
          </p>
          <a href={COMPANY.reviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-8">
            Ver avaliações no Google
          </a>
        </div>

        <div>
          <ul
            ref={track}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
            aria-label="Depoimentos de clientes"
            onScroll={(e) => {
              const el = e.currentTarget;
              const w = (el.children[0] as HTMLElement)?.offsetWidth || 1;
              setIndex(Math.round(el.scrollLeft / (w + 16)));
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.li
                key={i}
                className="w-[86%] shrink-0 snap-start sm:w-[min(520px,80%)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <figure className="flex h-full flex-col justify-between rounded-[24px] border border-text/10 bg-surface p-7 sm:p-9">
                  <blockquote className="text-[clamp(1.2rem,2vw,1.5rem)] font-medium leading-snug">
                    “<Highlighted text={t.text} mark={t.highlight} />”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center justify-between font-mono text-xs uppercase tracking-[0.1em] text-muted">
                    <span>{t.author}</span>
                    <span className="flex text-accent" aria-label="5 estrelas">
                      {Array.from({ length: 5 }, (_, k) => <IconStar key={k} size={12} />)}
                    </span>
                  </figcaption>
                </figure>
              </motion.li>
            ))}
          </ul>
          <div className="mt-5 flex items-center gap-3">
            <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label="Depoimento anterior" className="grid h-12 w-12 place-items-center rounded-full border border-text/20 transition-colors hover:border-text/60 disabled:opacity-30">
              <IconBack />
            </button>
            <button type="button" onClick={() => go(1)} disabled={index >= TESTIMONIALS.length - 1} aria-label="Próximo depoimento" className="grid h-12 w-12 place-items-center rounded-full border border-text/20 transition-colors hover:border-text/60 disabled:opacity-30">
              <IconChevron />
            </button>
            <div className="ml-2 flex gap-1.5" aria-hidden>
              {TESTIMONIALS.map((_, i) => (
                <span key={i} className={cx("h-1.5 rounded-full transition-[width,background-color] duration-300", i === index ? "w-6 bg-primary" : "w-1.5 bg-text/25")} />
              ))}
            </div>
            <span className="sr-only" aria-live="polite">
              Depoimento {index + 1} de {TESTIMONIALS.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
