# Art Engenharia Elétrica — site oficial (energia solar, Santo André)

Next.js 15 · React 19 · TypeScript · Tailwind 3 · Motion. Sem outras dependências.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Onde mudar cada coisa

| O quê | Arquivo |
|---|---|
| Nome, endereço, WhatsApp, horário, nota, links | `src/data/company.ts` |
| Parâmetros do simulador (economia, tarifa, placa, geração) | `src/data/simulator.config.ts` |
| Serviços | `src/data/services.ts` |
| Depoimentos | `src/data/testimonials.ts` |
| Dúvidas (FAQ) | `src/data/faq.ts` |
| Vídeo do hero e fotos de obras | `src/data/media.ts` (`HERO_VIDEO_SRC`, `HERO_VIDEO_POSTER`, `WORKS`) |
| Cores e tokens | `assets/design-tokens.json` → `node <skills>/design-system/scripts/generate-tokens.cjs --config assets/design-tokens.json -o src/styles/tokens.css` |
| Voz da marca e mensagens | `docs/brand-guidelines.md` |

## A CONFIRMAR COM O CLIENTE

1. **Logo**: o atual é **provisório** (tipográfico: "A" em forma de telhado com o sol). Trocar pelo oficial em `public/brand/`.
2. **Vídeo do hero**: provisório, de banco gratuito (Mixkit #46623, licença comercial permitida). É uma usina em campo, não uma obra da Art. Ideal: vídeo real de drone de uma instalação da Art.
3. **Fotos de obras**: a galeria mostra 5 espaços marcados "foto da obra em breve". Usar **somente** fotos reais (legenda: tipo de imóvel + bairro/cidade).
4. **Parâmetros do simulador** (`simulator.config.ts`): economia de 80% da conta, tarifa de R$ 1,00/kWh, placa de referência de 550 Wp e geração de 115 kWh/kWp/mês. Validar com o Rodrigo.
5. **Serviços elétricos** (engenharia elétrica e outros serviços): aparecem porque o Google cadastra a empresa como "eletricista". Confirmar o que é oferecido.
6. **Cidades atendidas** além de Santo André.
7. **Prazo médio** do processo (hoje o site cita o relato de 35 dias de um cliente).
8. **Garantias** (equipamentos e instalação) e **formas de pagamento/financiamento**.
9. **Instagram, e-mail e CNPJ**: campos `null` em `company.ts`. Não aparecem até serem preenchidos.
10. **Nomes nos depoimentos**: hoje "Cliente via Google". Se os clientes autorizarem, usar nome ou iniciais.
11. **Domínio**: definir `NEXT_PUBLIC_SITE_URL` e publicar sem `NEXT_PUBLIC_PREVIEW`.

## Segurança

Ver `security_best_practices_report.md`.
