"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { waLink, WA_DEFAULT } from "@/data/company";
import { IconWhatsApp } from "@/components/ui/Icons";
import { cx } from "@/utils/format";

const STEPS = [
  { n: "01", t: "Visita e orçamento", d: "Analisamos sua conta e o seu telhado e explicamos tudo, sem pressa e sem jargão." },
  { n: "02", t: "Projeto", d: "Dimensionamos o sistema ideal para o seu consumo. Nem a mais, nem a menos." },
  { n: "03", t: "Instalação", d: "Equipe pontual, obra limpa e organizada. Você acompanha cada passo." },
  { n: "04", t: "Homologação na Enel", d: "Cuidamos de toda a burocracia com a Enel, do pedido até a troca do medidor. Você não precisa ligar, protocolar nem esperar em fila.", key: true },
  { n: "05", t: "Pós-venda", d: "Continuamos com você depois da instalação, inclusive se precisar de algo com a Enel." },
];

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const glowTop = useTransform(fill, (v) => `${v * 100}%`);

  return (
    <section id="como-funciona" aria-labelledby="como-title" className="blueprint-dark relative scroll-mt-[var(--header-h)] bg-bg py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:self-start">
          <p className="label text-accent">Como funciona</p>
          <h2 id="como-title" className="title mt-3 text-[clamp(2.2rem,5vw,4.2rem)]">
            Você não precisa se preocupar com nada.
          </h2>
          <p className="mt-5 max-w-[42ch] text-[17px] leading-relaxed text-muted">
            Da primeira visita até a conta chegar mais barata, é a Art que conduz. O Rodrigo acompanha pessoalmente e mantém você informado em cada etapa.
          </p>
          <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
            <IconWhatsApp size={19} /> Agendar visita técnica
          </a>
        </div>

        <ol ref={ref} className="relative space-y-4 pl-12 sm:pl-16">
          {/* Linha de energia: trilho + preenchimento que acende com a rolagem */}
          <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-[2px] bg-text/10 sm:left-[27px]" />
          <motion.span aria-hidden style={{ scaleY: fill }} className="absolute bottom-6 left-[19px] top-6 w-[2px] origin-top bg-gradient-to-b from-secondary to-primary sm:left-[27px]" />
          <motion.span aria-hidden style={{ top: glowTop }} className="absolute left-[14px] h-3 w-3 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_20px_6px_rgb(var(--rgb-primary)/0.6)] sm:left-[22px]" />

          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={cx("relative rounded-[22px] border p-6 sm:p-7", s.key ? "border-primary/60 bg-primary/[0.07]" : "border-text/10 bg-surface/60")}
            >
              <span aria-hidden className={cx("absolute -left-12 top-6 grid h-10 w-10 place-items-center rounded-full border-2 bg-bg font-mono text-xs sm:-left-16 sm:h-14 sm:w-14 sm:text-sm", s.key ? "border-primary text-primary" : "border-text/25 text-text/80")}>
                {s.n}
              </span>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-[46ch]">
                  <h3 className="text-xl font-bold sm:text-2xl">
                    <span className="sr-only">Etapa {i + 1}: </span>
                    {s.t}
                  </h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">{s.d}</p>
                </div>
                {s.key && <EnelStamp />}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Selo "homologação concluída" — o momento que o cliente mais teme, resolvido. */
function EnelStamp() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.4, rotate: -24 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -9 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.35 }}
      className="grid h-[104px] w-[104px] shrink-0 place-items-center rounded-full border-[3px] border-dashed border-primary text-center text-primary"
      role="img"
      aria-label="Selo: homologação na Enel concluída"
    >
      <div className="font-mono text-[10px] font-medium uppercase leading-tight tracking-[0.08em]">
        Enel
        <br />
        <span className="text-[13px] font-bold">Homologado</span>
        <br />✓ concluído
      </div>
    </motion.div>
  );
}
