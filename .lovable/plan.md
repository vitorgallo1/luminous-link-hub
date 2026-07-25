## Objetivo
Incorporar elementos visuais relacionados ao autismo (mascote "88" de peças de quebra-cabeça enviado + padrão de peças coloridas do espectro) como marca d'água sutil no fundo, sem alterar layout, conteúdo ou tipografia existentes.

## Onde aparece (conforme respostas)
1. **Fundo global da página** — padrão CSS repetitivo de peças de quebra-cabeça em opacidade muito baixa (~4%), fixo atrás de todo o conteúdo.
2. **Seção Causas / TEA** — mascote 88 posicionado em um canto como marca d'água (~10% de opacidade), com peças coloridas decorativas nas bordas.
3. **Seção Frente Parlamentar pelo TEA (Timeline + Projetos de Lei relacionados a TEA)** — pequenas peças de quebra-cabeça decorativas nos cantos dos cards/marcos ligados ao TEA, opacidade sutil.

Intensidade geral: **2/5** (muito sutil, marca d'água).

## Passos técnicos

1. **Upload do mascote 88** via `lovable-assets` a partir de `/mnt/user-uploads/ChatGPT_Image_25_de_jul._de_2026_14_18_03.png` → `src/assets/mascote-88.png.asset.json`.

2. **Criar padrão SVG de peças de quebra-cabeça** inline (data URI ou componente) usando as cores do espectro (azul, amarelo, vermelho, verde) — leve, sem asset externo.

3. **Fundo global** — em `src/routes/__root.tsx` ou no wrapper de `src/routes/index.tsx`:
   - Adicionar um `<div>` `fixed inset-0 -z-10 pointer-events-none` com `background-image` do padrão SVG de peças, `opacity: 0.04`, `background-size` ~120px.

4. **Seção Causas / TEA** (em `src/routes/index.tsx`, componente da seção Causas):
   - Adicionar `<img src={mascote88.url}>` posicionado `absolute` (bottom-right ou top-right), `opacity-10`, `pointer-events-none`, `max-w-[220px]`, com leve animação `animate-float` (usando animação existente ou keyframe simples adicionado em `src/styles.css`).
   - Peças decorativas SVG nas bordas com opacidade ~15%.

5. **Frente Parlamentar pelo TEA** (marcos da timeline e cards de projetos de lei ligados a TEA em `src/components/mandate-sections.tsx`):
   - Adicionar peças de quebra-cabeça SVG decorativas absolute nos cantos dos cards TEA (opacidade ~10%).
   - Não alterar conteúdo textual nem estrutura dos cards.

6. **CSS** (em `src/styles.css`):
   - Adicionar `@keyframes float` para o mascote (translateY sutil, 6s ease-in-out infinite).
   - Não redefinir tokens de cor existentes.

## Arquivos a editar
- `src/assets/mascote-88.png.asset.json` (novo, via CLI)
- `src/styles.css` (adicionar keyframe `float` e utilidade `.bg-puzzle-pattern`)
- `src/routes/__root.tsx` **ou** wrapper em `src/routes/index.tsx` (fundo global)
- `src/routes/index.tsx` (mascote na seção Causas)
- `src/components/mandate-sections.tsx` (peças decorativas nos cards TEA)

## Garantias
- Zero remoção/substituição de seções, textos ou fotos existentes.
- Elementos são `pointer-events-none` e opacidade baixa — não interferem em leitura nem cliques.
- Paleta navy/gold/green preservada; peças usam cores do espectro apenas como acento decorativo.
