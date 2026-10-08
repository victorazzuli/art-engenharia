/**
 * Perguntas frequentes. As respostas só usam o que é verdadeiro e conhecido.
 * `confirm` = a resposta depende de dado da empresa que ainda não temos (A CONFIRMAR).
 */
export type Faq = { q: string; a: string; confirm?: string };

export const FAQ: Faq[] = [
  {
    q: "Quanto tempo leva todo o processo?",
    a: "Depende do tamanho do sistema e do prazo da Enel para aprovar a conexão. Um cliente relata no Google que todo o processo, do orçamento à ligação, levou 35 dias. O Rodrigo passa a previsão do seu caso já no orçamento.",
    confirm: "Prazo médio típico da Art",
  },
  {
    q: "Vocês cuidam da parte com a Enel?",
    a: "Sim. A Art faz toda a homologação junto à Enel, do pedido de acesso até a troca do medidor, e continua ajudando com a Enel depois da instalação.",
  },
  {
    q: "Meu telhado serve para energia solar?",
    a: "A maioria dos telhados serve, mas a resposta certa vem da visita técnica: avaliamos estrutura, inclinação, orientação e sombreamento antes de fazer o projeto.",
  },
  {
    q: "Funciona em dia nublado?",
    a: "Funciona, com geração menor. O sistema é dimensionado pela média do ano, e o que sobra nos dias de sol vira crédito na Enel para compensar os dias de menor geração.",
  },
  {
    q: "Atendem fora do horário comercial?",
    a: "O atendimento é de segunda a sábado, das 8h às 18h, e a Art ajusta os atendimentos conforme a necessidade do cliente. Combine o melhor horário com o Rodrigo.",
  },
  {
    q: "Precisa de manutenção?",
    a: "É pouca. Basicamente limpeza das placas de tempos em tempos e uma checagem do sistema. Depois da instalação, a Art continua disponível para o que você precisar.",
  },
  {
    q: "Vocês atendem quais cidades?",
    a: "Estamos em Santo André, no ABC. Já entregamos sistemas em Santo André, São Bernardo do Campo, na capital (Bosque da Saúde) e até em Córrego do Bom Jesus, em Minas Gerais. Para confirmar a sua cidade, chame o Rodrigo no WhatsApp.",
    confirm: "Raio de atendimento oficial",
  },
  {
    q: "Tem garantia e dá para financiar?",
    a: "Garantias e formas de pagamento são apresentadas no orçamento, de acordo com o projeto. Pergunte ao Rodrigo pelo WhatsApp.",
    confirm: "Garantias (equipamentos e instalação) e opções de pagamento/financiamento",
  },
];
