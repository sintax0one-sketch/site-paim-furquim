# Site — Paim & Furquim Contabilidade

Site institucional zero-build (HTML/CSS/JS puro). Abre direto clicando em `index.html` — não precisa
instalar nada.

## Como publicar (escolha uma)

1. **Netlify Drop** (mais fácil): acesse app.netlify.com/drop e arraste a pasta inteira `site-paim-furquim`
   pra dentro do site. Gera um link público na hora, sem precisar criar conta.
2. **GitHub Pages**: suba o conteúdo desta pasta pra um repositório com `index.html` na raiz, ative em
   Settings → Pages.
3. **Vercel**: importe o repositório do GitHub (recomendado) ou arraste a pasta.
4. **Simples**: zipe a pasta e mande pro cliente ou pra hospedagem dele.

Em qualquer uma, o `index.html` precisa estar na raiz da pasta publicada.

## Checklist do que trocar (TROCAR)

O site foi reconstruído com o conteúdo REAL que o cliente mandou (texto de todas as páginas do site
antigo + o endereço). Quase tudo já é real. O que ainda falta:

1. ~~Endereço completo~~ — **já preenchido**: Av. José Loureiro da Silva, 1792, Sala 401, Centro,
   Gravataí/RS, CEP 94010-000 (rodapé de todas as páginas, Contato e JSON-LD).
2. ~~Telefones~~ — **já preenchidos**: (51) 8292-0684 e (51) 8954-7541, além do WhatsApp (51) 98292-0684.
3. ~~Serviços, história, bios dos sócios~~ — **já são o texto real** do site antigo (não são mais
   estrutura genérica).
4. **Horário de funcionamento** — ainda não veio; falta no rodapé e em Contato.
5. **CNPJ** e **número de registro no CRC** — ainda não vieram; faltam no rodapé de todas as páginas.
6. **Mapa** — em `contato.html` o mapa já busca pelo endereço de texto (aproximado); troque pelo embed
   oficial (Google Maps → pesquise o endereço → Compartilhar → Incorporar um mapa → copiar o `src` do
   iframe) pra cravar o pino exato, incluindo a sala 401.
7. **Fotos.** O código já está pronto pra usar as fotos reais do escritório — só falta salvar os
   arquivos em `/img` com estes nomes exatos (o HTML já aponta pra eles):
   - `hero-reuniao.jpg` — Flaviana e Washington trabalhando no escritório (usada no topo do site)
   - `socia-flaviana.jpg` — headshot solo da Flaviana
   - `socio-washington.jpg` — headshot solo do Washington
   - `socios-juntos.jpg` — retrato dos dois juntos
   - `historico-claudio-cleni.jpg` — foto histórica do fundador, Set/1999
   - `equipe-2022.jpg` — foto da equipe, Dez/2022
   Ainda faltam (mantidas com placeholder do Pexels por enquanto): uma foto real da fachada do prédio.

## Estrutura

```text
index.html              → página inicial
servicos.html           → "Atuação": 5 áreas (contabilidade, dep. pessoal, societário, fiscal, PF)
precisa.html            → "O Que Você Precisa": 6 situações (assessoria mensal, abrir/encerrar empresa...)
sobre.html              → história completa (desde 1973), missão, bios dos sócios
contato.html            → formulário (abre WhatsApp), mapa, dados de contato
politica-de-privacidade.html
404.html
assets/css/styles.css   → todo o visual do site
assets/js/main.js       → menu, animações, formulário, banner de cookies
img/                    → fotos (placeholders Pexels — ver item 7 acima)
```

## Rodar de novo

Peça pra rodar a skill `/site-institucional` de novo quando: quiser trocar a paleta de cores, adicionar
uma página nova, ou o negócio mudar de endereço/serviços. Quando tiver as fotos reais, é só pedir pra
trocar — não precisa reconstruir o site inteiro.
