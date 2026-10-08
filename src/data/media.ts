/**
 * Mídias do site.
 * HERO: vídeo provisório de banco gratuito (Mixkit #46623, "Aerial view of solar panels in a field
 * at sunset", Mixkit License — uso comercial permitido). É uma usina, não uma obra da Art:
 * SUBSTITUIR por um vídeo real de drone de uma instalação da Art assim que houver.
 */
export const HERO_VIDEO_SRC = { mp4: "/video/hero-1280.mp4", webm: "/video/hero-1280.webm", mobile: "/video/hero-mobile.mp4" };
export const HERO_VIDEO_POSTER = { desktop: "/video/hero-poster.webp", mobile: "/video/hero-poster-mobile.webp" };
export const HERO_VIDEO_CREDIT = "Vídeo ilustrativo (Mixkit)";

/**
 * Galeria de obras: SOMENTE fotos reais da Art. Enquanto não houver, ficam placeholders
 * marcados como "Foto da obra em breve". Para adicionar: coloque o arquivo em
 * public/img/obras/ e preencha src + legenda (tipo de imóvel + bairro/cidade, se informados).
 */
export type WorkPhoto = { src: string | null; alt: string; caption?: string; w?: number; h?: number };

export const WORKS: WorkPhoto[] = [
  { src: null, alt: "Espaço reservado para foto de obra residencial da Art" },
  { src: null, alt: "Espaço reservado para foto de obra comercial da Art" },
  { src: null, alt: "Espaço reservado para foto de detalhe da instalação" },
  { src: null, alt: "Espaço reservado para foto do inversor e quadro elétrico" },
  { src: null, alt: "Espaço reservado para foto aérea de telhado" },
];
