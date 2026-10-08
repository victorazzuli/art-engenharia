"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV, WA_DEFAULT, waLink } from "@/data/company";
import { IconClose, IconMenu, IconWhatsApp } from "@/components/ui/Icons";
import { cx } from "@/utils/format";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    if (!menu) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [menu]);

  return (
    <>
      <header className={cx("fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-colors duration-500", scrolled || menu ? "border-b border-text/10 bg-bg/85 backdrop-blur-xl" : "border-b border-transparent")}>
        <div className="wrap flex h-full items-center justify-between gap-6">
          <motion.a href="#topo" aria-label="Art Engenharia Elétrica, voltar ao início" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} onClick={() => setMenu(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.svg" alt="" width={150} height={38} className="h-9 w-auto sm:h-10" />
          </motion.a>
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="rounded-lg px-3.5 py-2 text-[15px] text-text/80 transition-colors hover:text-text">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="btn-wa hidden min-h-[44px] px-4 text-sm sm:inline-flex">
              <IconWhatsApp size={17} /> WhatsApp
            </a>
            <button type="button" className="grid h-11 w-11 place-items-center rounded-xl border border-text/15 lg:hidden" aria-label={menu ? "Fechar menu" : "Abrir menu"} aria-expanded={menu} aria-controls="menu-mobile" onClick={() => setMenu((m) => !m)}>
              {menu ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menu && (
          <motion.nav id="menu-mobile" aria-label="Menu" className="fixed inset-0 z-40 overscroll-contain bg-bg px-4 pt-[calc(var(--header-h)+24px)] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ul>
              {NAV.map((n, i) => (
                <motion.li key={n.href} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}>
                  <a href={n.href} onClick={() => setMenu(false)} className="title block border-b border-text/10 py-4 text-[2rem]">
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
