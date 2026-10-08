"use client";
import { useState } from "react";
import { COMPANY, WA_DEFAULT, waLink } from "@/data/company";
import { IconPin, IconWhatsApp } from "@/components/ui/Icons";

export function Contact() {
  const [map, setMap] = useState(false);
  return (
    <section id="contato" aria-labelledby="contato-title" className="scroll-mt-[var(--header-h)] bg-bg py-20 sm:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="label text-accent">Onde estamos</p>
          <h2 id="contato-title" className="title mt-3 text-[clamp(2.2rem,5vw,4rem)]">
            Art Engenharia Elétrica
          </h2>
          <address className="mt-6 not-italic">
            <p className="text-xl leading-snug">
              {COMPANY.address.street} - {COMPANY.address.district}
              <br />
              {COMPANY.address.city} - {COMPANY.address.state}
            </p>
            <p className="mt-1 font-mono text-sm text-muted">CEP {COMPANY.address.postalCode}</p>
          </address>
          <dl className="mt-8 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-2xl border border-text/10 bg-text/10">
            <div className="bg-bg p-5">
              <dt className="label text-muted">Seg a sáb</dt>
              <dd className="mt-1 text-lg font-semibold">8h às 18h</dd>
            </div>
            <div className="bg-bg p-5">
              <dt className="label text-muted">Domingo</dt>
              <dd className="mt-1 text-lg font-semibold">Fechado</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <a href={COMPANY.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <IconPin size={18} /> Como chegar
            </a>
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <IconWhatsApp size={19} /> Chamar no WhatsApp
            </a>
          </div>
          <p className="mt-4 font-mono text-sm text-muted">{COMPANY.phoneDisplay}</p>
        </div>

        {/* Mapa só carrega sob demanda (não pesa a página) */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-text/10 bg-surface">
          {map ? (
            <iframe title="Mapa: Art Engenharia Elétrica em Santo André" src={COMPANY.mapsEmbed} className="absolute inset-0 h-full w-full [filter:invert(.9)_hue-rotate(180deg)_saturate(.5)]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <button type="button" onClick={() => setMap(true)} className="group absolute inset-0 flex flex-col items-center justify-end gap-3 pb-8">
              <AbcSketch />
              <span className="btn-ghost relative min-h-[44px] bg-bg/70 px-5 text-sm backdrop-blur-md group-hover:border-primary">Carregar mapa</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/** Esboço estilizado do ABC (decorativo) com Santo André em destaque. */
function AbcSketch() {
  const cities = [
    { n: "Santo André", x: 200, y: 120, main: true },
    { n: "São Bernardo", x: 150, y: 190 },
    { n: "São Caetano", x: 120, y: 80 },
    { n: "Mauá", x: 300, y: 140 },
    { n: "Diadema", x: 80, y: 200 },
  ];
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <g stroke="rgb(var(--rgb-text) / 0.07)" strokeWidth="1">
        {Array.from({ length: 12 }, (_, i) => <path key={`v${i}`} d={`M${i * 36} 0V300`} />)}
        {Array.from({ length: 9 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 36}H400`} />)}
      </g>
      <path d="M40 60 C 120 40, 260 50, 350 90 S 380 230, 300 260 S 80 270, 40 220 Z" fill="rgb(var(--rgb-text) / 0.03)" stroke="rgb(var(--rgb-text) / 0.18)" strokeDasharray="4 6" />
      {cities.map((c) => (
        <g key={c.n}>
          <circle cx={c.x} cy={c.y} r={c.main ? 7 : 3.5} fill={c.main ? "rgb(var(--rgb-primary))" : "rgb(var(--rgb-text) / 0.4)"} />
          {c.main && <circle cx={c.x} cy={c.y} r="20" fill="none" stroke="rgb(var(--rgb-primary) / 0.45)" />}
          <text x={c.x + 12} y={c.y + 4} fontSize="11" fontFamily="monospace" fill={c.main ? "rgb(var(--rgb-accent))" : "rgb(var(--rgb-text) / 0.45)"}>{c.n}</text>
        </g>
      ))}
    </svg>
  );
}
