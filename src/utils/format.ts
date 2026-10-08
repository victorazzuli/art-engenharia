const brlFmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
export const brl = (v: number) => brlFmt.format(Math.round(v)).replace(/\u00a0/g, " ");
export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
