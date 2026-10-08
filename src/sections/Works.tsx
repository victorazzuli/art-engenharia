"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { COMPANY } from "@/data/company";
import { WORKS } from "@/data/media";
import { useCapable } from "@/hooks/useCapable";
import { IconBack, IconChevron, IconClose } from "@/components/ui/Icons";

/** Galeria de obras reais da Art (fotos da página oficial). Faixa horizontal + lightbox. */
export function Works() {
  const cap = useCapable();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-22%"]);
  const photos = WORKS.filter((w) => w.src);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="obras" aria-labelledby="obras-title" className="blueprint-dark overflow-hidden bg-bg py-20 sm:py-28">
      <div className="wrap flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label text-accent">Obras entregues</p>
          <h2 id="obras-title" className="title mt-3 text-[clamp(2.2rem,5vw,4.2rem)]">
            O telhado vira usina.
          </h2>
        </div>
        <p className="max-w-[44ch] text-[16px] leading-relaxed text-muted md:pb-2">
          Obras reais da Art: casas em São Bernardo do Campo, comércio em Santo André, uma fábrica e até uma pousada em Minas Gerais.
        </p>
      </div>

      <div ref={ref} className="mt-12">
        <motion.ul style={cap.motion && cap.finePointer ? { x } : undefined} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:px-6 lg:snap-none lg:overflow-visible lg:px-10" aria-label="Galeria de obras">
          {photos.map((w, i) => {
            const ratio = Math.min(Math.max((w.w ?? 4) / (w.h ?? 3), 0.75), 1.6);
            return (
              <li key={w.src} className="shrink-0 snap-center">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block h-[52vh] max-h-[520px] min-h-[320px] overflow-hidden rounded-[22px] bg-surface"
                  style={{ aspectRatio: ratio }}
                  aria-label={`Ampliar foto: ${w.alt}`}
                >
                  <Image src={w.src!} alt={w.alt} fill sizes="(max-width: 768px) 85vw, 640px" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]" />
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg/85 to-transparent" />
                  <span className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="label block text-accent">{w.caption}</span>
                    <span className="mt-1 block text-[15px] font-semibold text-text">{w.place}</span>
                  </span>
                </button>
              </li>
            );
          })}
          <li className="flex shrink-0 snap-center items-stretch pr-6">
            <a href={COMPANY.instagram.url} target="_blank" rel="noopener noreferrer" className="flex h-[52vh] max-h-[520px] min-h-[320px] w-[240px] flex-col justify-end rounded-[22px] border border-text/15 p-6 transition-colors hover:border-primary">
              <span className="label text-accent">Mais obras</span>
              <span className="title mt-3 text-[1.9rem]">{COMPANY.instagram.handle}</span>
              <span className="mt-2 text-sm text-muted">Acompanhe as entregas no Instagram e no Facebook.</span>
            </a>
          </li>
        </motion.ul>
      </div>
      <Lightbox photos={photos} index={open} onChange={setOpen} />
    </section>
  );
}

function Lightbox({ photos, index, onChange }: { photos: typeof WORKS; index: number | null; onChange: (i: number | null) => void }) {
  const go = useCallback((d: number) => index != null && onChange((index + d + photos.length) % photos.length), [index, onChange, photos.length]);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (index == null) return;
    const prev = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    return () => {
      window.removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
      prev?.focus?.();
    };
  }, [index, go, onChange]);

  const p = index != null ? photos[index] : null;
  return (
    <AnimatePresence>
      {p && (
        <motion.div role="dialog" aria-modal="true" aria-label="Foto da obra ampliada" className="fixed inset-0 z-[80] flex flex-col items-center justify-center overscroll-contain bg-black/95 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => onChange(null)}>
          <motion.figure key={p.src} className="relative flex h-full max-h-[86vh] w-full max-w-[1200px] flex-col" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.3} onDragEnd={(_, info) => (info.offset.x < -80 ? go(1) : info.offset.x > 80 ? go(-1) : null)}>
            <div className="relative flex-1">
              <Image src={p.src!} alt={p.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <figcaption className="mt-3 text-center text-sm text-muted">
              {p.caption} · {p.place}
            </figcaption>
          </motion.figure>
          <button ref={closeRef} type="button" onClick={() => onChange(null)} aria-label="Fechar" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-text/10 hover:bg-text/20">
            <IconClose />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Foto anterior" className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-text/10 hover:bg-text/20 sm:grid">
            <IconBack />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Próxima foto" className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-text/10 hover:bg-text/20 sm:grid">
            <IconChevron />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
