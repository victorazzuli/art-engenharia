/**
 * Mídias do site — fotos REAIS da página oficial da Art no Facebook (facebook.com/artengeletrica).
 * O hero não usa vídeo: é uma cena animada em código (src/components/HeroScene.tsx).
 */

/** Galeria de obras: fotos publicadas pela Art. Legenda = tipo + local, como nos posts da empresa. */
export type WorkPhoto = { src: string | null; alt: string; caption?: string; place?: string; w?: number; h?: number };

export const WORKS: WorkPhoto[] = [
  {
    src: "/img/obras/comercial-ideal-aerea.jpg",
    alt: "Vista aérea da fábrica Ideal Portas e Janelas com o sistema solar instalado no telhado",
    caption: "Comercial",
    place: "Fábrica Ideal Portas e Janelas",
    w: 900,
    h: 506,
  },
  {
    src: "/img/obras/residencial-sao-bernardo-represa.jpg",
    alt: "Placas solares em telhado residencial com a represa ao fundo, em São Bernardo do Campo",
    caption: "Residencial",
    place: "São Bernardo do Campo",
    w: 900,
    h: 506,
  },
  {
    src: "/img/obras/comercial-santa-terezinha.jpg",
    alt: "Vista aérea de comércio com placas solares no bairro Santa Terezinha, em Santo André",
    caption: "Comercial",
    place: "Santa Terezinha, Santo André",
    w: 900,
    h: 506,
  },
  {
    src: "/img/obras/pousada-corrego-do-bom-jesus.jpg",
    alt: "Vista aérea de pousada no campo com placas solares em um dos telhados",
    caption: "Pousada",
    place: "Córrego do Bom Jesus, MG",
    w: 1440,
    h: 1795,
  },
  {
    src: "/img/obras/residencial-bosque-da-saude.jpg",
    alt: "Módulos solares instalados em telhado residencial no Bosque da Saúde, São Paulo",
    caption: "Residencial",
    place: "Bosque da Saúde, São Paulo",
    w: 1440,
    h: 1080,
  },
  {
    src: "/img/obras/residencial-sao-bernardo-condominio.jpg",
    alt: "Casa em condomínio com sistema solar no telhado, vista de cima",
    caption: "Residencial",
    place: "São Bernardo do Campo",
    w: 1200,
    h: 900,
  },
  {
    src: "/img/obras/comercial-ideal-telhado.jpg",
    alt: "Telhado da fábrica coberto por fileiras de módulos solares",
    caption: "Comercial",
    place: "Fábrica Ideal Portas e Janelas",
    w: 900,
    h: 506,
  },
  {
    src: "/img/obras/residencial-sao-bernardo-modulos.jpg",
    alt: "Detalhe dos módulos solares instalados sobre telhas, com palmeiras ao fundo",
    caption: "Residencial",
    place: "São Bernardo do Campo",
    w: 1440,
    h: 1080,
  },
];

/**
 * Caso real publicado pela Art (Facebook, 16/07/2024): "Após 1 mês de instalação do sistema
 * solar, este foi o resultado da conta de energia dele!" — contas Enel de 02/2024 e 06/2024.
 */
export const REAL_BILL = { before: 878.07, after: 59.55, beforeMonth: "fev/2024", afterMonth: "jun/2024", source: "Post da Art no Facebook, jul/2024" };
