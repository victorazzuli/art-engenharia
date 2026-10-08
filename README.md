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

## Fontes

- **Google Maps** (dados passados pelo Victor): endereço, WhatsApp, horário, nota 4,9 (42 avaliações), depoimentos.
- **Facebook oficial** (facebook.com/artengeletrica): logo, fotos das obras, caso real da conta (R$ 878,07 → R$ 59,55), Instagram @artengeletrica, e-mail, locais de obras.
- **Logo**: reconstruído em vetor a partir do arquivo enviado pelo cliente (`docs/logo-original-cliente.jpg`). Letras em Montserrat e legenda em Oswald SemiBold, convertidas em curvas. Versões em `public/brand/`.
- **Vídeo do hero**: montado a partir das fotos de drone das obras (fábrica Ideal Portas e Janelas, casas em São Bernardo, pousada em MG).

## A CONFIRMAR COM O CLIENTE

1. **Telefone e bairro em conflito**: Google = (11) 98263-5120 e "Vila Junqueira"; Facebook = (11) 98775-1806 e "Vila Linda". O site usa o Google.
2. **Vídeo de drone original**: o hero hoje é uma montagem das fotos. Um vídeo de drone real de uma obra deixaria a abertura ainda mais forte.
3. **Fotos em alta resolução**: as do Facebook têm 900–1440 px. Os originais do celular/drone melhorariam a galeria.
4. **Parâmetros do simulador** (`simulator.config.ts`): 80% de economia, R$ 1,00/kWh, placa de 550 Wp, 115 kWh/kWp/mês. Validar com o Rodrigo.
5. **Serviços elétricos** (engenharia elétrica e outros): confirmar o que é oferecido.
6. **Raio de atendimento oficial** (o site cita os locais das obras publicadas: Santo André, São Bernardo, São Paulo e Córrego do Bom Jesus-MG).
7. **Garantias** e **formas de pagamento/financiamento**.
8. **CNPJ** (campo `null` em `company.ts`).
9. **Nomes nos depoimentos**: hoje "Cliente via Google".
10. **Domínio**: definir `NEXT_PUBLIC_SITE_URL` e publicar sem `NEXT_PUBLIC_PREVIEW`.

## Segurança

Ver `security_best_practices_report.md`.
