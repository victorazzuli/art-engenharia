"use client";
import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "motion/react";
import { brl } from "@/utils/format";

/** Número em reais com contagem animada (respeita reduzir movimento). */
export function AnimatedBRL({ value, className = "" }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = brl(value);
      prev.current = value;
      return;
    }
    const c = animate(prev.current, value, {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = brl(v)),
    });
    prev.current = value;
    return () => c.stop();
  }, [value, reduce]);
  return (
    <span ref={ref} className={`tabular ${className}`}>
      {brl(value)}
    </span>
  );
}
