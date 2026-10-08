"use client";
import { useId, useMemo, useState } from "react";
import { motion } from "motion/react";
import { PROPERTY_TYPES, SIMULATOR, estimate, type PropertyType } from "@/data/simulator.config";
import { waLink } from "@/data/company";
import { AnimatedBRL } from "@/components/ui/AnimatedNumber";
import { IconWhatsApp } from "@/components/ui/Icons";
import { brl, cx } from "@/utils/format";

const ease = [0.16, 1, 0.3, 1] as const;

export function buildSimulatorMessage(bill: number, type: PropertyType, monthly: number) {
  return [
    "Olá, Rodrigo! Vim pelo site da Art Engenharia.",
    "",
    "Quero um orçamento de energia solar.",
    "",
    `Conta de luz: ${brl(bill)}/mês`,
    `Tipo de imóvel: ${type}`,
    `Economia estimada no site: ${brl(monthly)}/mês`,
    "",
    "Nome:",
    "Bairro / Cidade:",
  ].join("\n");
}

export function Simulator() {
  const { min, max, step, initial } = SIMULATOR.bill;
  const [bill, setBill] = useState(initial);
  const [draft, setDraft] = useState(String(initial));
  const [type, setType] = useState<PropertyType>("Casa");
  const r = useMemo(() => estimate(bill), [bill]);
  const ids = { bill: useId(), billNum: useId(), type: useId(), help: useId() };
  const pct = ((bill - min) / (max - min)) * 100;
  const after = bill - r.monthly;

  const commit = (raw: string) => {
    const n = Math.round(Number(raw.replace(/\D/g, "")) || 0);
    const clamped = Math.min(max, Math.max(min, n));
    setBill(clamped);
    setDraft(String(clamped));
  };

  return (
    <section id="simulador" aria-labelledby="sim-title" className="blueprint relative scroll-mt-[var(--header-h)] bg-paper py-20 text-ink sm:py-28">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Entradas */}
          <div>
            <p className="label text-primary-deep">Simulador de economia</p>
            <h2 id="sim-title" className="title mt-3 text-[clamp(2.1rem,4.6vw,3.8rem)]">
              Quanto da sua conta de luz está indo embora todo mês?
            </h2>
            <p className="mt-4 max-w-[48ch] text-[17px] leading-relaxed text-ink-muted">Dois dados e você vê uma estimativa na hora. Sem cadastro.</p>

            <div className="mt-10 space-y-10">
              <div>
                <label htmlFor={ids.billNum} className="block text-[17px] font-semibold">
                  1. Quanto você paga de luz por mês?
                </label>
                <div className="mt-4 flex items-end gap-3">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-lg text-ink-muted">R$</span>
                    <input
                      id={ids.billNum}
                      name="conta-de-luz"
                      autoComplete="off"
                      inputMode="numeric"
                      value={draft}
                      onChange={(e) => {
                        setDraft(e.target.value.replace(/\D/g, "").slice(0, 5));
                        const n = Number(e.target.value.replace(/\D/g, ""));
                        if (n >= min && n <= max) setBill(n);
                      }}
                      onBlur={(e) => commit(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && commit((e.target as HTMLInputElement).value)}
                      aria-describedby={ids.help}
                      className="tabular h-16 w-[210px] rounded-2xl border-2 border-ink/15 bg-white pl-12 pr-4 font-mono text-[28px] font-medium text-ink focus:border-ink focus:outline-none"
                    />
                  </div>
                  <span className="pb-4 text-ink-muted">/mês</span>
                </div>
                <input
                  id={ids.bill}
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={bill}
                  onChange={(e) => {
                    setBill(+e.target.value);
                    setDraft(e.target.value);
                  }}
                  aria-label="Valor da conta de luz por mês"
                  aria-valuetext={`${brl(bill)} por mês`}
                  className="range mt-6 w-full"
                  style={{ ["--p" as string]: `${pct}%` }}
                />
                <div id={ids.help} className="mt-2 flex justify-between font-mono text-xs text-ink-muted">
                  <span>{brl(min)}</span>
                  <span>{brl(max)}</span>
                </div>
              </div>

              <fieldset>
                <legend className="text-[17px] font-semibold">2. Onde vai instalar?</legend>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {PROPERTY_TYPES.map((t) => (
                    <label
                      key={t}
                      className={cx(
                        "flex min-h-[52px] cursor-pointer items-center justify-center rounded-xl border-2 px-3 text-[15px] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                        type === t ? "border-ink bg-ink text-paper" : "border-ink/15 bg-white hover:border-ink/40",
                      )}
                    >
                      <input type="radio" name={ids.type} value={t} checked={type === t} onChange={() => setType(t)} className="sr-only" />
                      {t}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          {/* Resultado */}
          <motion.div
            className="relative self-start overflow-hidden rounded-[28px] bg-bg p-6 text-text shadow-[0_40px_80px_-30px_rgb(var(--rgb-ink)/0.5)] sm:p-9 lg:sticky lg:top-[calc(var(--header-h)+24px)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            aria-live="polite"
          >
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-[90px]" />
            <p className="label text-muted">Economia estimada · {type.toLowerCase()}</p>
            <p className="mt-3 flex items-baseline gap-2">
              <AnimatedBRL value={r.monthly} className="title text-[clamp(3rem,7vw,4.6rem)] text-primary" />
              <span className="text-muted">/mês</span>
            </p>

            {/* A conta caindo: antes x depois */}
            <div className="mt-7 space-y-3" aria-label={`Conta hoje ${brl(bill)}, estimativa depois ${brl(after)}`}>
              <BillBar label="Conta hoje" value={bill} ratio={1} tone="text-text/80 bg-text/15" />
              <BillBar label="Com energia solar (estimativa)" value={after} ratio={after / bill} tone="text-ink bg-primary" />
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-text/10 bg-text/10">
              {[
                ["Em 1 ano", <AnimatedBRL key="y" value={r.yearly} />],
                [`Em ${SIMULATOR.longTermYears} anos`, <AnimatedBRL key="l" value={r.longTerm} />],
                ["Placas (aprox.)", <span key="p" className="tabular">{r.panels}</span>],
              ].map(([k, v]) => (
                <div key={k as string} className="bg-bg p-3 sm:p-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{k}</dt>
                  <dd className="mt-1.5 whitespace-nowrap text-[15px] font-bold xs:text-lg sm:text-xl">{v}</dd>
                </div>
              ))}
            </dl>

            <a href={waLink(buildSimulatorMessage(bill, type, r.monthly))} target="_blank" rel="noopener noreferrer" className="btn-wa mt-7 w-full">
              <IconWhatsApp size={20} />
              Receber orçamento com esses dados
            </a>
            <p className="mt-4 text-[13px] leading-relaxed text-muted">
              Valores aproximados, sem reajuste de tarifa. O orçamento real é feito após visita técnica, com base no seu consumo e no seu telhado.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BillBar({ label, value, ratio, tone }: { label: string; value: number; ratio: number; tone: string }) {
  return (
    <div>
      <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
        <span>{label}</span>
        <AnimatedBRL value={value} className="text-text" />
      </div>
      <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-text/[0.06]">
        <motion.div className={cx("h-full rounded-full", tone)} animate={{ width: `${Math.max(4, ratio * 100)}%` }} transition={{ duration: 0.7, ease }} />
      </div>
    </div>
  );
}
