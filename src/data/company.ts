/**
 * Dados reais da empresa — perfil do Google Maps "Energia Solar - Art Engenharia Elétrica"
 * (informados pelo Victor em 08/10/2026). Não inventar nada além disto.
 * Campos com `null` = A CONFIRMAR com o cliente (não aparecem no site enquanto vazios).
 */
const env = (v?: string) => (v && v.trim() ? v.trim() : null);

/** Número que recebe os pedidos de orçamento (só dígitos, com DDI). */
export const WHATSAPP_NUMBER = (env(process.env.NEXT_PUBLIC_WHATSAPP) || "5511982635120").replace(/\D/g, "");

const address = {
  street: "R. dos Bambus, 594",
  district: "Vila Junqueira",
  city: "Santo André",
  state: "SP",
  postalCode: "09175-170",
};
const mapsQuery = `Energia Solar - Art Engenharia Elétrica, ${address.street} - ${address.district}, ${address.city} - ${address.state}`;

export const COMPANY = {
  name: "Art Engenharia Elétrica",
  googleName: "Energia Solar - Art Engenharia Elétrica",
  url: (env(process.env.NEXT_PUBLIC_SITE_URL) || "https://art-engenharia.vercel.app").replace(/\/$/, ""),
  contactName: "Rodrigo",
  phoneDisplay: "(11) 98263-5120",
  address,
  fullAddress: `${address.street} - ${address.district}, ${address.city} - ${address.state}, ${address.postalCode}`,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
  /** Abre o perfil para ler/deixar avaliações (busca pelo nome exato do perfil). */
  reviewsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`,
  mapsEmbed: `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=15&output=embed`,
  rating: { value: 4.9, count: 42 },
  /** Seg–sáb 8h–18h, domingo fechado. 0 = domingo. */
  hours: { 0: null, 1: ["08:00", "18:00"], 2: ["08:00", "18:00"], 3: ["08:00", "18:00"], 4: ["08:00", "18:00"], 5: ["08:00", "18:00"], 6: ["08:00", "18:00"] } as Record<number, [string, string] | null>,
  hoursLabel: "Segunda a sábado, 8h às 18h",

  // ——— A CONFIRMAR com o cliente (null = não exibe)
  instagram: null as string | null,
  cnpj: null as string | null,
  email: null as string | null,
  /** Cidades atendidas além de Santo André */
  serviceArea: null as string | null,

  preview: process.env.NEXT_PUBLIC_PREVIEW === "1",
};

export const waLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const WA_DEFAULT = "Olá, Rodrigo! Vim pelo site da Art Engenharia e quero um orçamento de energia solar.";

export const NAV = [
  { href: "#simulador", label: "Simulador" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];
