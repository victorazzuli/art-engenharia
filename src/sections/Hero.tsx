"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { COMPANY, WA_DEFAULT, waLink } from "@/data/company";
import { HERO_VIDEO_CREDIT, HERO_VIDEO_POSTER, HERO_VIDEO_SRC } from "@/data/media";
import { useCapable } from "@/hooks/useCapable";
import { IconArrowDown, IconPause, IconPlay, IconStar, IconWhatsApp } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;
const STAGES = ["Projeto", "Instalação", "Enel"];

export function Hero() {
  const cap = useCapable();
  const ref = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [src, setSrc] = useState<{ type: string; url: string }[] | null>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // Escolhe a fonte só no cliente: vertical e leve no celular; nada em conexão lenta/economia/reduzir movimento
  useEffect(() => {
    if (!cap.ready || !cap.video) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setSrc(mobile ? [{ type: "video/mp4", url: HERO_VIDEO_SRC.mobile }] : [{ type: "video/webm", url: HERO_VIDEO_SRC.webm }, { type: "video/mp4", url: HERO_VIDEO_SRC.mp4 }]);
  }, [cap]);

  // Pausa fora da tela (economiza bateria e CPU)
  useEffect(() => {
    const v = ref.current;
    const s = sectionRef.current;
    if (!v || !s) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(s);
    return () => io.disconnect();
  }, [src, userPaused]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      setUserPaused(false);
      v.play().catch(() => {});
    } else {
      setUserPaused(true);
      v.pause();
    }
  };

  const anim = cap.ready ? cap.motion : true;

  return (
    <section ref={sectionRef} id="topo" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-[calc(var(--bar-h)+28px)] pt-[calc(var(--header-h)+24px)] md:justify-center md:pb-16">
      {/* Mídia: pôster imediato (LCP) + vídeo progressivo por cima */}
      <div className="absolute inset-0 -z-20">
        <picture>
          <source media="(max-width: 767px)" srcSet={HERO_VIDEO_POSTER.mobile} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_VIDEO_POSTER.desktop} alt="" width={1280} height={720} className="h-full w-full object-cover" fetchPriority="high" />
        </picture>
        {src && (
          <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000 [&.on]:opacity-100"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            poster={HERO_VIDEO_POSTER.desktop}
            aria-hidden
            onPlaying={(e) => {
              e.currentTarget.classList.add("on");
              setPlaying(true);
            }}
            onPause={() => setPlaying(false)}
          >
            {src.map((s) => (
              <source key={s.url} src={s.url} type={s.type} />
            ))}
          </video>
        )}
      </div>
      {/* Overlay: escurece embaixo/esquerda onde fica o texto; mantém o dourado do sol no alto */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(var(--rgb-bg)/0.7)_0%,rgb(var(--rgb-bg)/0.62)_22%,rgb(var(--rgb-bg)/0.86)_45%,rgb(var(--rgb-bg)/0.94)_75%,rgb(var(--rgb-bg))_100%)] md:bg-[linear-gradient(90deg,rgb(var(--rgb-bg)/0.92)_0%,rgb(var(--rgb-bg)/0.6)_45%,rgb(var(--rgb-bg)/0.1)_80%),linear-gradient(180deg,rgb(var(--rgb-bg)/0.5)_0%,transparent_30%,transparent_70%,rgb(var(--rgb-bg))_100%)]" />

      <div className="wrap">
        <div className="max-w-[920px]">
          <motion.p className="label text-accent" initial={anim ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}>
            Energia solar · Santo André e ABC
          </motion.p>

          <h1 id="hero-title" className="title mt-4 text-[clamp(2.3rem,4.9vw,4.4rem)] text-text">
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

            {/* Cota de projeto: a jornada inteira numa linha, com um pulso de energia percorrendo */}
            <div className="mt-7 max-w-[520px]" aria-label="Etapas: projeto, instalação e homologação na Enel, tudo com a Art">
              <div className="relative flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-text/70">
                {STAGES.map((s, i) => (
                  <span key={s} className={i === 2 ? "text-accent" : ""}>
                    {s}
                    {i === 2 && " ✓"}
                  </span>
                ))}
              </div>
              <div className="relative mt-2 h-3" aria-hidden>
                <span className="absolute inset-x-0 top-1/2 h-px bg-text/30" />
                <span className="absolute left-0 top-0 h-3 w-px bg-text/50" />
                <span className="absolute left-1/2 top-0 h-3 w-px bg-text/50" />
                <span className="absolute right-0 top-0 h-3 w-px bg-accent" />
                <span className="absolute inset-y-0 left-0 w-full overflow-hidden">
                  <span className="absolute top-1/2 h-[2px] w-1/4 -translate-y-1/2 animate-pulseLine bg-gradient-to-r from-transparent via-accent to-transparent" />
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <IconWhatsApp size={19} />
                Quero meu orçamento
              </a>
              <a href="#simulador" className="btn-ghost bg-bg/30 backdrop-blur-md">
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

      {src && (
        <div className="absolute bottom-[calc(var(--bar-h)+16px)] right-4 flex items-center gap-3 md:bottom-6 md:right-6">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-text/50 sm:inline">{HERO_VIDEO_CREDIT}</span>
          <button type="button" onClick={toggle} aria-label={playing ? "Pausar vídeo de fundo" : "Reproduzir vídeo de fundo"} className="grid h-11 w-11 place-items-center rounded-full border border-text/25 bg-bg/40 text-text backdrop-blur-md transition-colors hover:border-text/60">
            {playing ? <IconPause size={18} /> : <IconPlay size={16} />}
          </button>
        </div>
      )}
    </section>
  );
}
