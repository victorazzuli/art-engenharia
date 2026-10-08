"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { WORKS } from "@/data/media";
import { useCapable } from "@/hooks/useCapable";

/**
 * Galeria de obras. Só fotos reais da Art (media.ts). Enquanto não chegam, mostra
 * placeholders desenhados como prancha técnica, marcados como "foto em breve".
 */
export function Works() {
  const cap = useCapable();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-14%"]);
  const hasReal = WORKS.some((w) => w.src);

  return (
    <section id="obras" aria-labelledby="obras-title" className="blueprint-dark overflow-hidden bg-bg py-20 sm:py-28">
      <div className="wrap flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label text-accent">Obras</p>
          <h2 id="obras-title" className="title mt-3 text-[clamp(2.2rem,5vw,4.2rem)]">
            O telhado vira usina.
          </h2>
        </div>
        {!hasReal && <p className="max-w-[40ch] text-[15px] text-muted md:pb-2">Em breve, fotos reais das instalações da Art em Santo André e no ABC.</p>}
      </div>
      <div ref={ref} className="mt-12">
        <motion.ul style={cap.motion && cap.finePointer ? { x } : undefined} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:px-6 lg:snap-none lg:overflow-visible lg:px-10" aria-label="Galeria de obras">
          {WORKS.map((w, i) => (
            <li key={i} className="relative aspect-[4/5] w-[78vw] max-w-[380px] shrink-0 snap-center overflow-hidden rounded-[24px] border border-text/10 bg-surface sm:w-[340px]">
              {w.src ? (
                <>
                  <Image src={w.src} alt={w.alt} fill sizes="380px" className="object-cover" />
                  {w.caption && <span className="absolute inset-x-3 bottom-3 rounded-full bg-bg/75 px-4 py-2 text-sm backdrop-blur-md">{w.caption}</span>}
                </>
              ) : (
                <Placeholder i={i} alt={w.alt} />
              )}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/** Prancha técnica: telhado em corte com módulos e cotas. Claramente marcada como substituível. */
function Placeholder({ i, alt }: { i: number; alt: string }) {
  const panels = 3 + (i % 3);
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-6" role="img" aria-label={alt}>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Obra {String(i + 1).padStart(2, "0")}</span>
      <svg viewBox="0 0 200 160" className="w-full text-text/35" aria-hidden>
        <path d="M20 120 L100 50 L180 120" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {Array.from({ length: panels }, (_, k) => {
          const t = (k + 0.5) / panels;
          const x = 100 + 80 * t * 0.92 - 6;
          const y = 50 + 70 * t * 0.92 - 6;
          return <rect key={k} x={x} y={y} width="18" height="10" transform={`rotate(41 ${x + 9} ${y + 5})`} fill="rgb(var(--rgb-primary) / 0.5)" />;
        })}
        <path d="M20 140 H180 M20 135 V145 M180 135 V145" stroke="currentColor" strokeWidth="1" />
        <text x="100" y="155" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="monospace">FOTO DA OBRA EM BREVE</text>
      </svg>
      <span className="text-sm text-muted">Foto real da instalação</span>
    </div>
  );
}
