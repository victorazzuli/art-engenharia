/**
 * Parâmetros do simulador de economia. TODOS são aproximações editáveis — A CONFIRMAR com o
 * Rodrigo antes de publicar no domínio oficial. O site sempre exibe o resultado como estimativa.
 */
export const SIMULATOR = {
  bill: { min: 150, max: 5000, step: 10, initial: 450 },

  /**
   * Fração da conta que deixa de ser paga. Não é 100%: continua existindo o custo mínimo de
   * disponibilidade e a parcela do "fio B" (Lei 14.300). 0.80 = conservador.
   */
  savingsRate: 0.8,

  /** Tarifa média com impostos na área da Enel SP (R$/kWh). Usada só para estimar o nº de placas. */
  tariffPerKwh: 1.0,

  /** Potência de referência por placa (Wp). Não indica marca nem modelo. */
  panelWatts: 550,

  /** Geração média mensal por kWp instalado no ABC (kWh/kWp/mês). */
  kwhPerKwpMonth: 115,

  /** Horizonte da economia de longo prazo (anos), sem reajuste de tarifa (conservador). */
  longTermYears: 25,
};

export const PROPERTY_TYPES = ["Casa", "Comércio", "Empresa", "Condomínio"] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export function estimate(bill: number) {
  const monthly = bill * SIMULATOR.savingsRate;
  const kwh = bill / SIMULATOR.tariffPerKwh;
  const kwp = kwh / SIMULATOR.kwhPerKwpMonth;
  const panels = Math.max(1, Math.ceil((kwp * 1000) / SIMULATOR.panelWatts));
  return { monthly, yearly: monthly * 12, longTerm: monthly * 12 * SIMULATOR.longTermYears, panels };
}
