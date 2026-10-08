/** Serviços. `confirm: true` = A CONFIRMAR com o cliente (aparece no Google como eletricista). */
export type Service = { id: string; title: string; text: string; tag: string; primary: boolean; confirm?: boolean };

export const SERVICES: Service[] = [
  {
    id: "residencial",
    title: "Energia solar para casas",
    text: "Sistema dimensionado pela sua conta de luz, instalado no seu telhado e homologado na Enel.",
    tag: "Residencial",
    primary: true,
  },
  {
    id: "comercial",
    title: "Energia solar para comércio e empresas",
    text: "Para quem tem conta alta e não pode parar a operação: projeto, instalação e toda a parte com a Enel.",
    tag: "Comercial",
    primary: true,
  },
  {
    id: "engenharia",
    title: "Projetos e serviços de engenharia elétrica",
    text: "Projetos e adequações elétricas. Fale com o Rodrigo para entender o seu caso.",
    tag: "Engenharia",
    primary: false,
    confirm: true,
  },
  {
    id: "eletrica",
    title: "Outros serviços elétricos",
    text: "Serviços elétricos em geral. Consulte disponibilidade pelo WhatsApp.",
    tag: "Elétrica",
    primary: false,
    confirm: true,
  },
];
