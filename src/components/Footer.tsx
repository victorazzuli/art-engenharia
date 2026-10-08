import { COMPANY, NAV, WA_DEFAULT, waLink } from "@/data/company";

export function Footer() {
  return (
    <footer className="border-t border-text/10 bg-bg pb-[calc(var(--bar-h)+28px)] pt-14 md:pb-12">
      <div className="wrap grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.svg" alt="Art Engenharia Elétrica" width={170} height={43} className="h-10 w-auto" />
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted">Energia solar em Santo André e no ABC. Projeto, instalação e homologação na Enel.</p>
        </div>
        <div className="text-sm">
          <h2 className="label text-text">Contato</h2>
          <address className="mt-3 not-italic leading-relaxed text-muted">
            {COMPANY.address.street} - {COMPANY.address.district}
            <br />
            {COMPANY.address.city} - {COMPANY.address.state}, {COMPANY.address.postalCode}
          </address>
          <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-text hover:text-primary">
            {COMPANY.phoneDisplay}
          </a>
          <p className="mt-2 text-muted">{COMPANY.hoursLabel}</p>
        </div>
        <nav aria-label="Rodapé" className="text-sm">
          <h2 className="label text-text">Navegação</h2>
          <ul className="mt-3 space-y-2 text-muted">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-text">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="wrap mt-12 flex flex-col gap-2 border-t border-text/10 pt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-muted sm:flex-row sm:justify-between md:pr-[280px]">
        <span>© {new Date().getFullYear()} {COMPANY.name}</span>
        <span>Energia solar · Santo André · ABC</span>
      </div>
    </footer>
  );
}
