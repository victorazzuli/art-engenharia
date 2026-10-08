/**
 * Cena animada do hero (SVG + CSS, sem vídeo): a história da Art em ~14 s, em loop.
 * 1) a casa é desenhada como prancha de projeto; 2) o sol nasce; 3) os módulos entram no telhado
 * com um reflexo de luz; 4) a energia corre até o medidor e a Enel vira "homologado"; 5) a conta
 * cai de R$ 878,07 para R$ 59,55 (caso real publicado pela Art); 6) as cotas marcam
 * Projeto → Instalação → Enel. Estilos e tempos: classes .hs-* em globals.css.
 * O estado "padrão" de cada elemento é o FINAL — com "reduzir movimento" a cena aparece pronta.
 */
import { REAL_BILL } from "@/data/media";

const brl = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v).replace(/ /g, " ");

// Telhado: trapézio de frente (água-furtada) — topo y=250 (x 262..498), base y=382 (x 178..582)
const ROOF = { top: 250, bottom: 382, tl: 262, tr: 498, bl: 178, br: 582 };
const at = (u: number, v: number) => {
  // u: 0..1 da esquerda p/ direita; v: 0 (topo) .. 1 (base)
  const y = ROOF.top + (ROOF.bottom - ROOF.top) * v;
  const xl = ROOF.tl + (ROOF.bl - ROOF.tl) * v;
  const xr = ROOF.tr + (ROOF.br - ROOF.tr) * v;
  return [xl + (xr - xl) * u, y] as const;
};
const COLS = 5;
const ROWS = 2;
const PANELS: string[] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const u0 = 0.07 + c * 0.176, u1 = u0 + 0.158;
    const v0 = 0.14 + r * 0.38, v1 = v0 + 0.32;
    const pts = [at(u0, v0), at(u1, v0), at(u1, v1), at(u0, v1)];
    PANELS.push(pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" "));
  }

export function HeroScene({ paused }: { paused: boolean }) {
  return (
    <svg
      viewBox="0 0 800 660"
      className={`hs h-full w-full ${paused ? "hs-paused" : ""}`}
      role="img"
      aria-label={`Animação: a casa é projetada, o sol nasce, as placas solares são instaladas, a energia chega ao medidor homologado pela Enel e a conta de luz cai de ${brl(REAL_BILL.before)} para ${brl(REAL_BILL.after)}.`}
    >
      <defs>
        <radialGradient id="hs-sky" cx="24%" cy="58%" r="52%">
          <stop offset="0" stopColor="#F68D54" stopOpacity=".55" />
          <stop offset=".35" stopColor="#FD680B" stopOpacity=".18" />
          <stop offset=".92" stopColor="#070921" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-beam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFC07A" stopOpacity=".55" />
          <stop offset="1" stopColor="#FD680B" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hs-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1B1F6E" />
          <stop offset="1" stopColor="#3B3F92" />
        </linearGradient>
        <linearGradient id="hs-glint" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="hs-roofclip">
          {PANELS.map((p) => (
            <polygon key={p} points={p} />
          ))}
        </clipPath>
      </defs>

      {/* Céu: amanhecer dourado */}
      <rect className="hs-glow" x="0" y="0" width="800" height="660" fill="url(#hs-sky)" />

      {/* Feixe de luz do sol até o telhado (atrás do sol) */}
      <polygon className="hs-beam" points="120,200 262,250 178,382 112,228" fill="url(#hs-beam)" />

      {/* Sol nascendo atrás da casa */}
      <g className="hs-sun">
        <circle cx="120" cy="210" r="70" fill="#FD680B" opacity=".14" />
        <circle cx="120" cy="210" r="44" fill="#FD680B" />
        <circle cx="120" cy="210" r="44" fill="none" stroke="#FFC07A" strokeWidth="2" opacity=".6" />
      </g>


      {/* Chão e casa em traço de projeto */}
      <g className="hs-lines" fill="none" stroke="#F7F5F0" strokeOpacity=".55" strokeWidth="2" strokeLinejoin="round">
        <path pathLength={1} d="M40 560 H760" />
        <path pathLength={1} d={`M${ROOF.bl} ${ROOF.bottom} L${ROOF.tl} ${ROOF.top} H${ROOF.tr} L${ROOF.br} ${ROOF.bottom} Z`} />
        <path pathLength={1} d="M204 382 V560 M556 382 V560" />
        <path pathLength={1} d="M250 450 h70 v60 h-70 Z M285 450 v60 M250 480 h70" />
        <path pathLength={1} d="M420 470 h50 v90 h-50 Z" />
        <path pathLength={1} d="M440 520 h4" />
      </g>

      {/* Módulos solares entrando um a um */}
      <g>
        {PANELS.map((p, i) => (
          <g key={p} className="hs-panel" style={{ ["--i" as string]: i }}>
            <polygon points={p} fill="url(#hs-panel)" stroke="#AEB2CF" strokeOpacity=".7" strokeWidth="1.2" />
          </g>
        ))}
        {/* linhas de célula sobre os módulos */}
        <g clipPath="url(#hs-roofclip)" className="hs-cells" stroke="#AEB2CF" strokeOpacity=".28" strokeWidth="1">
          {Array.from({ length: 22 }, (_, k) => {
            const [x1, y1] = at(k / 21, 0);
            const [x2, y2] = at(k / 21, 1);
            return <line key={`c${k}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
          {Array.from({ length: 8 }, (_, k) => {
            const v = k / 7;
            const [x1, y] = at(0, v);
            const [x2] = at(1, v);
            return <line key={`r${k}`} x1={x1} y1={y} x2={x2} y2={y} />;
          })}
        </g>
        {/* reflexo de luz passando pelos módulos */}
        <g clipPath="url(#hs-roofclip)">
          <rect className="hs-glint" x="-120" y="240" width="120" height="150" fill="url(#hs-glint)" transform="skewX(-20)" />
        </g>
      </g>

      {/* Fio: energia indo até o medidor */}
      <path d="M582 382 H690 V446" fill="none" stroke="#F7F5F0" strokeOpacity=".25" strokeWidth="2" />
      <path className="hs-flow" d="M582 382 H690 V446" fill="none" stroke="#F68D54" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 14" />

      {/* Medidor / Enel */}
      <g>
        <rect x="622" y="446" width="136" height="78" rx="10" fill="#151A45" stroke="#F7F5F0" strokeOpacity=".35" strokeWidth="2" />
        <rect className="hs-ok-ring" x="622" y="446" width="136" height="78" rx="10" fill="none" stroke="#2F8256" strokeWidth="3" />
        <text x="690" y="472" textAnchor="middle" className="hs-mono" fontSize="13" fill="#F7F5F0" fillOpacity=".8">ENEL</text>
        <text className="hs-wait" x="690" y="500" textAnchor="middle" fontSize="11" fill="#AEB2CF">
          <tspan className="hs-mono">AGUARDANDO</tspan>
        </text>
        <text className="hs-ok" x="690" y="502" textAnchor="middle" fontSize="13" fill="#5FD08F" fontWeight="700">
          <tspan className="hs-mono">HOMOLOGADO ✓</tspan>
        </text>
      </g>

      {/* Conta de luz caindo (caso real) */}
      <g className="hs-bill">
        <rect x="548" y="96" width="212" height="132" rx="16" fill="#F7F5F0" />
        <text x="568" y="126" className="hs-mono" fontSize="11" fill="#4A5361" letterSpacing="1">CONTA DE LUZ · CASO REAL</text>
        <text x="568" y="164" fontSize="26" fontWeight="800" fill="#4A5361">{brl(REAL_BILL.before)}</text>
        <line className="hs-strike" pathLength={1} x1="566" y1="155" x2="694" y2="155" stroke="#B04300" strokeWidth="3" />
        <text className="hs-after" x="568" y="206" fontSize="30" fontWeight="800" fill="#B04300">{brl(REAL_BILL.after)}</text>
      </g>

      {/* Cotas de projeto: Projeto → Instalação → Enel */}
      <g className="hs-mono" fontSize="12" letterSpacing="1.5">
        <g className="hs-cota hs-c1" fill="#F7F5F0" fillOpacity=".7" stroke="#F7F5F0" strokeOpacity=".5">
          <path d="M178 598 H372 M178 590 V606 M372 590 V606" strokeWidth="1.5" fill="none" />
          <text x="275" y="626" textAnchor="middle" stroke="none">PROJETO</text>
        </g>
        <g className="hs-cota hs-c2" fill="#F7F5F0" fillOpacity=".7" stroke="#F7F5F0" strokeOpacity=".5">
          <path d="M372 598 H582 M582 590 V606" strokeWidth="1.5" fill="none" />
          <text x="477" y="626" textAnchor="middle" stroke="none">INSTALAÇÃO</text>
        </g>
        <g className="hs-cota hs-c3" fill="#F68D54" stroke="#F68D54">
          <path d="M582 598 H740 M740 590 V606" strokeWidth="1.5" fill="none" />
          <text x="661" y="626" textAnchor="middle" stroke="none">ENEL ✓</text>
        </g>
      </g>
    </svg>
  );
}
