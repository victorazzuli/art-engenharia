"use client";
import { motion } from "motion/react";

/**
 * "Por que a Art" como um memorial descritivo de projeto: cada diferencial é um item numerado
 * com a evidência real (das avaliações do Google) na coluna da direita.
 */
const ITEMS = [
  { t: "Cuidamos de tudo, inclusive da Enel", e: "“Eles cuidaram de tudo, desde a compra dos equipamentos até a ligação com a Enel.”" },
  { t: "Atendimento direto com o Rodrigo", e: "“O Rodrigo explicou e deu todo o suporte desde o orçamento até a instalação.”" },
  { t: "Prazo cumprido", e: "Um cliente relata o processo completo em 35 dias." },
  { t: "Obra limpa e caprichada", e: "“O trabalho foi feito com capricho, tudo organizado e limpo.”" },
  { t: "Pós-venda de verdade", e: "“O Rodrigo dá o suporte necessário no pós-venda.”" },
  { t: "Atendimento também aos sábados", e: "Segunda a sábado, das 8h às 18h." },
];

export function WhyArt() {
  return (
    <section aria-labelledby="por-que-title" className="blueprint bg-paper py-20 text-ink sm:py-28">
      <div className="wrap">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label text-primary-deep">Por que a Art</p>
            <h2 id="por-que-title" className="title mt-3 max-w-[16ch] text-[clamp(2.2rem,5vw,4.2rem)]">
              Engenharia que você não precisa acompanhar de perto.
            </h2>
          </div>
          <p className="max-w-[36ch] text-[15px] leading-relaxed text-ink-muted md:pb-2">Cada item abaixo vem do que os próprios clientes escreveram no Google.</p>
        </div>

        <ol className="mt-12 border-t-2 border-ink">
          {ITEMS.map((it, i) => (
            <motion.li
              key={it.t}
              className="group grid gap-3 border-b border-ink/15 py-6 sm:grid-cols-[88px_1fr_1fr] sm:items-baseline sm:gap-8 sm:py-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.05 }}
            >
              <span className="font-mono text-sm text-ink-muted">ITEM {String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[clamp(1.4rem,2.6vw,2.1rem)] font-bold leading-tight tracking-[-0.015em] transition-colors group-hover:text-primary-deep">{it.t}</h3>
              <p className="text-[16px] leading-relaxed text-ink-muted">{it.e}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
