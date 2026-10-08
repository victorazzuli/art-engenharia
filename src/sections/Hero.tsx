"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { COMPANY, WA_DEFAULT, waLink } from "@/data/company";
import { useCapable } from "@/hooks/useCapable";
import { HeroScene } from "@/components/HeroScene";
import { IconArrowDown, IconPause, IconPlay, IconStar, IconWhatsApp } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const cap = useCapable();
  const ref = useRef<HTMLElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);

  // A cena para quando sai da tela (economia de bateria)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const anim = cap.ready ? cap.motion : true;

  return (
    <section ref={ref} id="topo" aria-labelledby="hero-title" className="blueprint-dark relative isolate overflow-hidden bg-bg pb-[calc(var(--bar-h)+28px)] pt-[calc(var(--header-h)+12px)] md:pb-16 lg:flex lg:min-h-[100svh] lg:items-center">
      {/* Luz de amanhecer vinda da cena */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_78%_45%,rgb(var(--rgb-primary)/0.16),transparent_70%),radial-gradient(40%_40%_at_10%_100%,rgb(var(--rgb-secondary)/0.14),transparent_70%)]" />

      <div className="wrap grid items-center gap-4 lg:grid-cols-[1.12fr_0.88fr] lg:gap-6">
        {/* Cena animada (no celular vem primeiro, menor) */}
        <motion.div
          className="relative order-1 mx-auto aspect-[800/660] w-full max-w-[min(100%,52svh)] sm:max-w-[560px] lg:order-2 lg:max-w-none"
          initial={anim ? { opacity: 0, scale: 0.97 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
        >
          <HeroScene paused={userPaused || offscreen} />
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Reproduzir animação" : "Pausar animação"}
            className="absolute bottom-1 right-1 grid h-11 w-11 place-items-center rounded-full border border-text/25 bg-bg/60 text-text backdrop-blur-md transition-colors hover:border-text/60 motion-reduce:hidden"
          >
            {userPaused ? <IconPlay size={16} /> : <IconPause size={18} />}
          </button>
        </motion.div>

        {/* Texto */}
        <div className="order-2 lg:order-1">
          <motion.p className="label text-accent" initial={anim ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}>
            Energia solar · Santo André e ABC
          </motion.p>

          <h1 id="hero-title" className="title mt-4 text-[clamp(2.1rem,3.9vw,3.7rem)] text-text">
            {["Energia solar em Santo André.", "Do projeto à Enel,", "a gente resolve tudo."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.04em]">
                <motion.span className={i === 2 ? "block text-primary" : "block"} initial={anim ? { y: "105%" } : false} animate={{ y: 0 }} transition={{ duration: 0.95, delay: 0.3 + i * 0.1, ease }}>
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div initial={anim ? { opacity: 0, y: 14 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease }}>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-text/85 sm:text-lg">
              Você para de pagar caro na conta de luz e não precisa lidar com burocracia nenhuma.
            </p>

            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <IconWhatsApp size={19} />
                Quero meu orçamento
              </a>
              <a href="#simulador" className="btn-ghost">
                Simular economia
                <IconArrowDown size={18} />
              </a>
            </div>

            <a href={COMPANY.reviewsUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-3 rounded-full border border-text/15 bg-bg/40 py-2 pl-3 pr-4 text-sm backdrop-blur-md transition-colors hover:border-text/40">
              <span className="flex text-accent" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => <IconStar key={i} size={14} />)}
              </span>
              <span>
                <strong className="font-semibold">{COMPANY.rating.value.toLocaleString("pt-BR")}</strong> no Google · {COMPANY.rating.count} avaliações
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
