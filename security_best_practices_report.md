# Relatório de segurança — site Art Engenharia Elétrica

**Resumo:** site estático em Next.js 15, sem login, banco de dados, Server Actions nem envio de dados ao servidor (o simulador só monta um link `wa.me`). Superfície de ataque mínima. Nenhum achado crítico ou alto. Dois achados médios/baixos foram corrigidos.

Referência: `javascript-typescript-nextjs-web-server-security.md` (skill security-best-practices).

## Corrigidos

**#1 — Médio — Cabeçalhos de segurança ausentes (NEXT-HEADERS-001)**
`next.config.mjs`: adicionados `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, CSP com `frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'`, `Referrer-Policy` e `Permissions-Policy`.

**#2 — Baixo — JSON-LD via `dangerouslySetInnerHTML` (NEXT-XSS-001)**
`src/app/layout.tsx:69`: os dados são fixos (não vêm do usuário), mas agora `<` é escapado como `<` para impedir que algum texto futuro feche a tag `<script>`.

## Aceitos / observações

**#3 — Info — CSP sem `script-src` com nonce (NEXT-CSP-001)**
Nonce exige renderização dinâmica e o site não exibe conteúdo de usuário. Reavaliar se o site ganhar formulários, área logada ou conteúdo vindo de CMS.

**#4 — Info — Segredos (NEXT-SECRETS-001)**
Só existem `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_PREVIEW`, todos públicos por natureza. `.env*` está no `.gitignore`.

**#5 — Info — Links externos**
Todos os `target="_blank"` usam `rel="noopener noreferrer"`. O iframe do mapa só carrega por clique do usuário.

**#6 — Info — Dependências (NEXT-SUPPLY-001)**
Next 15.5.27 / React 19.1.9, versões fixadas. `npm audit` aponta `postcss <=8.5.22` empacotado dentro do Next (GHSA-qx2v-qp2m-jg93 e relacionados). Ele só roda no build, sobre o CSS do próprio projeto, então não é explorável no site publicado. A correção exige Next 16 (mudança de versão maior): planejar a atualização junto com os outros projetos.
