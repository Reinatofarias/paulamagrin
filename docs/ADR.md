# ADR — Architectural Decision Records | Paula Magrin Landing Page

**Projeto:** Landing Page Paula Magrin  
**Data:** 2026-08-12  
**Status:** Aceito

---

## ADR-001: Tecnologia — HTML/CSS/JS Vanilla (Sem Framework)

### Contexto

A landing page é uma página única de conversão. O tráfego virá majoritariamente de dispositivos mobile via anúncios pagos. Performance é crítica para conversão. A manutenção será feita por equipe de marketing/desenvolvimento que precisa de código acessível.

### Decisão

Utilizar **HTML semântico, CSS vanilla e JavaScript vanilla** — sem React, Vue, Next.js ou qualquer framework SPA.

### Justificativa

- **Performance**: Zero overhead de framework. Bundle mínimo. LCP otimizado.
- **SEO**: HTML estático renderizado no servidor = indexação imediata.
- **Simplicidade**: Página única, sem rotas, sem estado complexo.
- **Portabilidade**: Pode ser hospedada em qualquer servidor estático (Netlify, Vercel, S3, etc.).
- **Manutenção**: Qualquer desenvolvedor front-end pode alterar copy/design sem knowledge de framework específico.
- **Core Web Vitals**: Controle total sobre performance sem abstrações.

### Alternativas Consideradas

| Opção | Prós | Contras | Veredicto |
|---|---|---|---|
| Next.js | SSR, DX moderna | Overhead, complexidade desnecessária | Rejeitado |
| Astro | Boa performance, componentes | Dependência de build, learning curve | Rejeitado |
| WordPress + Elementor | Fácil edição para não-devs | Performance ruim, bloat | Rejeitado |
| HTML/CSS/JS Vanilla | Performance máxima, controle total | Sem componentes reutilizáveis | **Aceito** |

### Consequências

- (+) Performance excepcional
- (+) Deploy simples
- (+) Sem dependências de build
- (-) Repetição de markup em componentes similares
- (-) Sem hot reload nativo (mitigado com Live Server)

---

## ADR-002: Estratégia de Estilização — CSS Custom Properties + BEM

### Contexto

O design da landing page é premium e editorial. Precisa de consistência visual, responsividade mobile-first e manutenibilidade. Não há necessidade de um design system complexo.

### Decisão

- **CSS Custom Properties** para design tokens (cores, tipografia, espaçamento)
- **Metodologia BEM** para naming de classes
- **CSS nativo** com `@media` queries para responsividade
- **Mobile-first** como abordagem base

### Justificativa

- Custom Properties permitem theming centralizado e fácil manutenção
- BEM evita conflitos de especificidade e torna o CSS autodocumentado
- CSS nativo evita overhead de pré-processadores para um projeto single-page
- Mobile-first alinha com a realidade de tráfego (85%+ mobile)

### Design Tokens Definidos

```css
/* Cores */
--color-cream: #F5F0EB;
--color-sand: #E8DFD5;
--color-offwhite: #FAF8F5;
--color-olive: #5C6B4F;
--color-sage: #8B9D7D;
--color-deep-blue: #2C3E50;
--color-gold-matte: #B8976A;
--color-terracotta: #C67D5B; /* uso restrito */
--color-text-primary: #2D2926;
--color-text-secondary: #5A524C;

/* Tipografia */
--font-display: 'Cormorant Garamond', serif;
--font-body: 'Manrope', sans-serif;

/* Espaçamento */
--space-xs a --space-4xl (escala 4px)
```

---

## ADR-003: Tipografia — Cormorant Garamond + Manrope

### Contexto

A tipografia precisa comunicar: premium, editorial, feminino maduro, acolhedor mas profissional. O público (40–60 anos) exige alta legibilidade.

### Decisão

- **Display/Títulos**: Cormorant Garamond (serif editorial com personalidade)
- **Corpo/UI**: Manrope (sans-serif geométrica, altamente legível)

### Justificativa

- **Cormorant Garamond**: Elegância editorial sem ser fria. Caracteres refinados. Bom contraste com sans-serif. Comunica sofisticação sem ostentação. Excelente peso visual em tamanhos grandes.
- **Manrope**: Legibilidade excepcional em telas. Formas geométricas mas humanistas. Pesos variados. Boa performance em mobile. x-height generoso = legibilidade para público 40+.

### Alternativas Consideradas

| Opção Display | Veredicto | Razão |
|---|---|---|
| Cormorant Garamond | **Aceito** | Editorial, elegante, personalidade madura |
| Lora | Rejeitado | Boa mas muito comum, menos personalidade |
| Fraunces | Rejeitado | Muito estilizada, pode comprometer legibilidade |
| Playfair Display | Rejeitado | Overused em landing pages femininas |

| Opção Corpo | Veredicto | Razão |
|---|---|---|
| Manrope | **Aceito** | Legível, moderna, boa em mobile |
| Montserrat | Rejeitado | Muito usada, menos personalidade |
| Inter | Rejeitado | Boa mas fria demais para o contexto |

### Consequências

- (+) Identidade tipográfica forte e diferenciada
- (+) Excelente legibilidade cross-device
- (+) Carregamento via Google Fonts (CDN otimizado)
- (-) Duas famílias = mais peso de fontes (~100KB)
- Mitigação: `font-display: swap`, preload dos pesos essenciais

---

## ADR-004: Estratégia de Imagens — Generated Placeholders + Real Photo Slots

### Contexto

Fotografias profissionais de Paula não foram fornecidas. A página precisa de imagens para hero, seção sobre, e elementos visuais. Imagens stock genéricas são proibidas pelo brief.

### Decisão

1. **Gerar imagens editoriais** via IA para demonstrar o conceito visual
2. **Criar slots claramente marcados** para substituição por fotos reais
3. **Elementos gráficos abstratos** (linhas orgânicas, formas) criados em CSS/SVG

### Consequências

- (+) Landing page funcional e demonstrável desde v1
- (+) Direção visual clara para sessão fotográfica
- (-) Imagens geradas precisarão ser substituídas antes do go-live

---

## ADR-005: Formulário — Modal Overlay com Validação Client-Side

### Contexto

O formulário de captura é componente crítico de conversão. Precisa ser leve, rápido e não intimidador. O público-alvo não é tech-savvy.

### Decisão

- Formulário em **modal overlay** acionado pelo CTA
- **3 campos apenas**: Nome, WhatsApp, Pergunta de qualificação
- Validação **client-side** em JavaScript vanilla
- Máscara automática para WhatsApp
- Campos ocultos para UTMs
- Envio via **fetch API** (endpoint a configurar)

### Justificativa

- Modal mantém contexto da página (sem navegação)
- 3 campos = baixa fricção = maior taxa de conversão
- Validação client-side = feedback imediato
- Máscara de telefone guia o preenchimento correto

### Alternativas Consideradas

| Opção | Veredicto | Razão |
|---|---|---|
| Modal overlay | **Aceito** | Baixa fricção, mantém contexto |
| Inline na página | Rejeitado | Quebra fluxo de leitura |
| Página separada | Rejeitado | Drop-off na navegação |
| Typeform embed | Rejeitado | Dependência externa, lento |

---

## ADR-006: Tracking — GTM como Camada de Abstração

### Contexto

Múltiplas plataformas de tracking (GA4, Meta Pixel) precisam receber eventos. A configuração pode mudar sem deploy de código.

### Decisão

- **Google Tag Manager** como camada única de gerenciamento
- DataLayer pushes no JavaScript para todos os eventos
- GTM distribui para GA4 e Meta Pixel
- UTMs capturadas e persistidas em sessionStorage

### Justificativa

- Centralização: uma implementação no código, múltiplos destinos
- Flexibilidade: equipe de marketing pode ajustar tags sem deploy
- Debugging: GTM Preview mode para validação
- Padronização: dataLayer como contrato entre dev e marketing

---

## ADR-007: Animações — CSS-only com Intersection Observer

### Contexto

Microinterações premium são requisito do brief. Devem ser elegantes, lentas e sutis. Nenhuma dependência de biblioteca de animação.

### Decisão

- **CSS transitions e animations** para todas as microinterações
- **Intersection Observer API** para trigger de animações on-scroll
- **`prefers-reduced-motion`** respeitado globalmente
- Durações base: 400ms–800ms com easing `cubic-bezier`

### Justificativa

- Zero dependências (sem GSAP, AOS, Framer Motion)
- Performance nativa do browser
- Controle total sobre timing e easing
- Respeito à acessibilidade com reduced-motion

---

## ADR-008: Hospedagem e Deploy — Estático (Agnóstico)

### Contexto

A landing page é 100% estática (HTML/CSS/JS). Não há backend. A escolha de hospedagem será feita posteriormente.

### Decisão

Construir de forma **agnóstica a hospedagem**. A estrutura de arquivos será compatível com qualquer serviço de hosting estático.

### Estrutura de Deploy

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   └── (fotos, ícones, og-image)
├── fonts/ (se não usar CDN)
└── favicon.ico
```

### Opções de Deploy Recomendadas

| Plataforma | Custo | SSL | CDN | Facilidade |
|---|---|---|---|---|
| Netlify | Grátis | ✅ | ✅ | ⭐⭐⭐ |
| Vercel | Grátis | ✅ | ✅ | ⭐⭐⭐ |
| Cloudflare Pages | Grátis | ✅ | ✅ | ⭐⭐⭐ |
| AWS S3 + CloudFront | ~$1/mês | ✅ | ✅ | ⭐⭐ |
