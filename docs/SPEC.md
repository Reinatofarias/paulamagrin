# SPEC DRIVEN — Especificação Técnica Detalhada | Paula Magrin Landing Page

**Versão:** 1.0  
**Data:** 2026-08-12  
**Status:** Draft

---

## 1. Arquitetura de Arquivos

```
paula-magrin-terapeuta/
├── index.html                  # Página principal (landing page)
├── obrigado.html               # Página de confirmação pós-lead
├── css/
│   ├── reset.css               # Reset/Normalize
│   ├── tokens.css              # Design tokens (Custom Properties)
│   ├── base.css                # Estilos base (tipografia, body)
│   ├── components.css          # Componentes reutilizáveis
│   ├── sections.css            # Estilos por seção
│   ├── utilities.css           # Classes utilitárias
│   ├── animations.css          # Keyframes e transitions
│   └── responsive.css          # Media queries
├── js/
│   ├── main.js                 # Orquestrador principal
│   ├── form.js                 # Lógica do formulário + validação
│   ├── tracking.js             # DataLayer + eventos
│   ├── animations.js           # Intersection Observer + scroll
│   └── utils.js                # Utilidades (UTM, masks, etc.)
├── images/
│   ├── hero/                   # Imagens da seção hero
│   ├── about/                  # Fotos da Paula
│   ├── icons/                  # Ícones SVG inline
│   └── og-image.jpg            # Open Graph image
├── fonts/                      # Fontes locais (se não CDN)
├── docs/
│   ├── PRD.md
│   ├── ADR.md
│   └── SPEC.md
├── favicon.ico
├── robots.txt
└── sitemap.xml
```

---

## 2. Design Tokens

### 2.1 Paleta de Cores

```css
:root {
  /* ─── Background ─── */
  --color-bg-primary: #FAF8F5;        /* Off-white quente */
  --color-bg-secondary: #F5F0EB;      /* Creme */
  --color-bg-tertiary: #E8DFD5;       /* Areia */
  --color-bg-accent: #EDE8E1;         /* Areia clara */
  --color-bg-dark: #2C3E50;           /* Azul profundo */
  --color-bg-olive: #5C6B4F;          /* Verde oliva */

  /* ─── Text ─── */
  --color-text-primary: #2D2926;      /* Quase preto quente */
  --color-text-secondary: #5A524C;    /* Cinza quente */
  --color-text-tertiary: #8A7F76;     /* Cinza médio */
  --color-text-inverse: #FAF8F5;      /* Texto sobre fundo escuro */
  --color-text-accent: #5C6B4F;       /* Verde oliva */

  /* ─── Brand ─── */
  --color-olive: #5C6B4F;             /* Verde oliva principal */
  --color-olive-light: #6E7D60;       /* Verde oliva claro */
  --color-sage: #8B9D7D;             /* Verde sálvia */
  --color-sage-light: #A3B396;        /* Sálvia claro */
  --color-deep-blue: #2C3E50;         /* Azul profundo */
  --color-gold: #B8976A;              /* Dourado fosco */
  --color-terracotta: #C67D5B;        /* Terracota (uso restrito) */

  /* ─── UI ─── */
  --color-border: #D5CCC3;            /* Bordas sutis */
  --color-border-light: #E8E2DB;      /* Bordas extra sutis */
  --color-focus: #5C6B4F;             /* Focus ring */
  --color-error: #B85450;             /* Erro no formulário */
  --color-success: #5C6B4F;           /* Sucesso */
  --color-overlay: rgba(45, 41, 38, 0.6); /* Modal overlay */
}
```

### 2.2 Tipografia

```css
:root {
  /* ─── Font Families ─── */
  --font-display: 'Cormorant Garamond', 'Georgia', serif;
  --font-body: 'Manrope', 'Segoe UI', sans-serif;

  /* ─── Font Sizes (Fluid) ─── */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.8rem);       /* 12-13px */
  --text-sm: clamp(0.8rem, 0.75rem + 0.25vw, 0.875rem);      /* 13-14px */
  --text-base: clamp(0.9rem, 0.85rem + 0.3vw, 1.0625rem);    /* 14-17px */
  --text-lg: clamp(1.05rem, 0.95rem + 0.5vw, 1.25rem);       /* 17-20px */
  --text-xl: clamp(1.2rem, 1.05rem + 0.75vw, 1.5rem);        /* 19-24px */
  --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);         /* 24-32px */
  --text-3xl: clamp(1.8rem, 1.4rem + 2vw, 2.75rem);          /* 29-44px */
  --text-4xl: clamp(2.2rem, 1.6rem + 3vw, 3.5rem);           /* 35-56px */
  --text-5xl: clamp(2.5rem, 1.8rem + 3.5vw, 4.25rem);        /* 40-68px */

  /* ─── Line Heights ─── */
  --leading-tight: 1.15;
  --leading-snug: 1.3;
  --leading-normal: 1.6;
  --leading-relaxed: 1.8;

  /* ─── Font Weights ─── */
  --weight-light: 300;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* ─── Letter Spacing ─── */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
  --tracking-widest: 0.2em;
}
```

### 2.3 Espaçamento

```css
:root {
  --space-2xs: 0.25rem;   /* 4px */
  --space-xs: 0.5rem;     /* 8px */
  --space-sm: 0.75rem;    /* 12px */
  --space-md: 1rem;       /* 16px */
  --space-lg: 1.5rem;     /* 24px */
  --space-xl: 2rem;       /* 32px */
  --space-2xl: 3rem;      /* 48px */
  --space-3xl: 4rem;      /* 64px */
  --space-4xl: 6rem;      /* 96px */
  --space-5xl: 8rem;      /* 128px */

  /* Section Padding (responsive) */
  --section-py: clamp(4rem, 8vw, 8rem);
  --section-px: clamp(1.25rem, 5vw, 2rem);

  /* Container */
  --container-max: 1200px;
  --container-narrow: 800px;
  --container-text: 680px;
}
```

### 2.4 Efeitos

```css
:root {
  /* ─── Shadows ─── */
  --shadow-sm: 0 1px 3px rgba(45, 41, 38, 0.06);
  --shadow-md: 0 4px 12px rgba(45, 41, 38, 0.08);
  --shadow-lg: 0 8px 30px rgba(45, 41, 38, 0.1);
  --shadow-xl: 0 16px 50px rgba(45, 41, 38, 0.12);

  /* ─── Border Radius ─── */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  /* ─── Transitions ─── */
  --ease-gentle: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 200ms;
  --duration-base: 400ms;
  --duration-slow: 600ms;
  --duration-slower: 800ms;
  --duration-slowest: 1200ms;
}
```

---

## 3. Especificação de Componentes

### 3.1 Botão CTA Principal

```
Componente: .btn-cta
Estados: default, hover, focus, active, disabled

Especificações:
- Background: var(--color-olive)
- Color: var(--color-text-inverse)
- Font: var(--font-body), var(--weight-semibold), var(--text-base)
- Padding: var(--space-md) var(--space-2xl)
- Border-radius: var(--radius-full)
- Letter-spacing: var(--tracking-wide)
- Text-transform: none
- Min-height: 56px (mobile touch target)
- Transition: all var(--duration-base) var(--ease-gentle)

Hover:
- Background: var(--color-olive-light)
- Transform: translateY(-1px)
- Box-shadow: var(--shadow-md)

Focus:
- Outline: 2px solid var(--color-focus)
- Outline-offset: 3px

Active:
- Transform: translateY(0)
```

### 3.2 CTA Flutuante Mobile

```
Componente: .floating-cta
Visibilidade: Aparece após scroll > 100vh
Posição: fixed, bottom: 0, width: 100%, z-index: 100

Especificações:
- Background: rgba(92, 107, 79, 0.95)
- Backdrop-filter: blur(10px)
- Padding: var(--space-sm) var(--section-px)
- Box-shadow: 0 -2px 20px rgba(0,0,0,0.08)
- Transição de entrada: translateY(100%) → translateY(0)
- Duração: var(--duration-slow)

Botão interno:
- Width: 100%
- Max-width: 400px
- Centrado
- Texto: "Conversar com Paula"

Desktop: hidden (display: none acima de 768px)
```

### 3.3 Modal de Formulário

```
Componente: .modal-form
Trigger: Clique em qualquer CTA
Animação: fade-in + slide-up

Overlay:
- Background: var(--color-overlay)
- Transition: opacity var(--duration-base)

Container:
- Background: var(--color-bg-primary)
- Max-width: 520px
- Border-radius: var(--radius-xl)
- Padding: var(--space-2xl)
- Box-shadow: var(--shadow-xl)
- Animation: slideUp var(--duration-slow) var(--ease-premium)

Campos:
- Input height: 52px
- Border: 1px solid var(--color-border)
- Border-radius: var(--radius-md)
- Font: var(--font-body), var(--text-base)
- Focus: border-color var(--color-olive), shadow suave

Select/Radio:
- Custom styled (sem default do browser)
- Options como cards selecionáveis

Close button:
- Top-right corner
- Icon X (SVG inline)
- 44x44px touch target
```

### 3.4 Card de Identificação

```
Componente: .identification-card
Usado na: Seção 02 (Identificação)

Estrutura:
- Ícone/marcador lateral (linha vertical verde oliva)
- Texto em itálico editorial
- Fundo: var(--color-bg-secondary)
- Padding: var(--space-lg) var(--space-xl)
- Border-left: 3px solid var(--color-sage)
- Border-radius: 0 var(--radius-md) var(--radius-md) 0

Animação:
- Fade-in + slide-right on scroll
- Stagger: 150ms entre cards
```

### 3.5 Card de Etapa (Reconstrução)

```
Componente: .step-card
Usado na: Seção 04 (Conceito) e Seção 07 (Diferencial)

Estrutura:
- Número grande (display font, dourado fosco)
- Título
- Descrição
- Linha conectora entre cards (vertical)

Animação:
- Fade-in sequencial on scroll
- Número: scale(0.8) → scale(1)
```

### 3.6 Accordion FAQ

```
Componente: .faq-item
Usado na: Seção 10 (FAQ)

Estrutura:
- Pergunta (clickable, font-weight semibold)
- Indicador +/- (rotação suave)
- Resposta (collapse/expand)
- Border-bottom sutil entre items

Animação:
- Height: 0 → auto (max-height trick)
- Indicador: rotate(0) → rotate(45deg)
- Duration: var(--duration-base)
```

---

## 4. Especificação de Seções

### 4.1 Hero (Seção 01)

```
Layout Desktop:
- Grid 2 colunas: 55% texto | 45% imagem
- Altura mínima: 90vh
- Background: var(--color-bg-primary)

Layout Mobile:
- Stack: texto → imagem → CTA
- Padding top: var(--space-3xl) (clearance from top)

Conteúdo:
- Label superior (caps, tracked): "PAULA MAGRIN · TERAPEUTA"
- Headline (h1): font-display, text-4xl/text-5xl
- Subheadline: font-body, text-lg, color-text-secondary
- CTA button
- Microcopy abaixo do CTA: text-sm, color-text-tertiary
- Trust badge: ícone + texto pequeno

Imagem:
- Retrato editorial de Paula
- Aspect ratio: 3:4 ou 4:5
- Border-radius: var(--radius-lg)
- Sombra sutil
```

### 4.2 Identificação (Seção 02)

```
Layout:
- Container narrow (800px)
- Background: gradiente sutil cream → sand

Conteúdo:
- Headline (h2)
- 5-6 identification cards (stacked)
- Transição textual ao final

Animação:
- Cards entram sequencialmente no scroll
```

### 4.3 Reframe (Seção 03)

```
Layout:
- Container text (680px) centrado
- Background: var(--color-bg-primary)
- Grande espaço negativo

Conteúdo:
- Headline provocativa
- Texto explicativo em parágrafos curtos
- Destaque visual da frase central (quote styling)

Tipografia:
- Quote: font-display, text-2xl, italic
- Bordas laterais ou aspas decorativas
```

### 4.4 Conceito da Reconstrução (Seção 04)

```
Layout:
- Background: var(--color-bg-dark) ou var(--color-bg-olive)
- Texto claro sobre fundo escuro
- Container narrow

Conteúdo:
- Headline "Reconstrução de Identidade"
- Texto explicativo
- Fluxo visual: HISTÓRIA → CONSCIÊNCIA → ESCOLHAS → RECONSTRUÇÃO
- Step cards conectados por linhas

Elementos visuais:
- Linha vertical orgânica conectando etapas
- Cada etapa com ícone abstrato (SVG)
```

### 4.5 O Que Muda na Prática (Seção 05)

```
Layout:
- Grid 2x5 ou lista de items
- Background: var(--color-bg-secondary)

Conteúdo:
- Headline
- 8-10 items com ícone + texto
- CTA secundário ao final
```

### 4.6 Sobre Paula (Seção 06)

```
Layout Desktop:
- Grid 2 colunas: 40% foto | 60% texto
- Background: var(--color-bg-primary)

Layout Mobile:
- Foto (fullwidth com crop elegante)
- Texto abaixo

Conteúdo:
- Foto editorial (diferente do hero)
- Nome + título "Terapeuta"
- Texto biográfico (não currículo)
- Formações como lista discreta abaixo
- CTA
```

### 4.7 Diferencial (Seção 07)

```
Layout:
- 4 step cards horizontais (desktop) / verticais (mobile)
- Linha conectora entre eles
- Background: var(--color-bg-primary)

Conteúdo:
- Headline
- 4 etapas: Compreender → Tornar Consciente → Reposicionar → Autonomia
- Texto de encerramento sobre autonomia
```

### 4.8 Para Quem É (Seção 08)

```
Layout:
- 2 colunas: "É para você se..." | "Não é para você se..."
- Background: var(--color-bg-secondary)

Conteúdo:
- Items com ✓ (verde) para "é para você"
- Items com ✕ (neutro) para "não é para você"

Mobile:
- Stack vertical: primeiro "é para você", depois "não é para você"
```

### 4.9 Prova Social (Seção 09)

```
Layout:
- Cards de depoimento (quando disponíveis)
- Background: var(--color-bg-primary)

Placeholder:
- 3 cards com "[INSERIR DEPOIMENTO REAL]"
- Espaço para nome e contexto
- Design pronto para preenchimento
```

### 4.10 FAQ (Seção 10)

```
Layout:
- Accordion (max-width: 800px, centrado)
- Background: var(--color-bg-primary)

Conteúdo:
- 5-6 perguntas com respostas expandíveis
- Design de accordion elegante
```

### 4.11 CTA Final (Seção 11)

```
Layout:
- Centrado, grande espaço negativo
- Background: gradiente sutil ou fundo accent

Conteúdo:
- Headline emocional
- Subheadline
- CTA button (grande)
- Microcopy
```

---

## 5. Especificação de Animações

### 5.1 Entrance Animations (Intersection Observer)

```javascript
/* Threshold: 0.15 (15% visível) */
/* rootMargin: "0px 0px -50px 0px" */

.animate-fade-up {
  opacity: 0 → 1;
  transform: translateY(24px) → translateY(0);
  duration: var(--duration-slow);
  easing: var(--ease-premium);
}

.animate-fade-in {
  opacity: 0 → 1;
  duration: var(--duration-slow);
}

.animate-slide-right {
  opacity: 0 → 1;
  transform: translateX(-20px) → translateX(0);
  duration: var(--duration-slow);
}

/* Stagger */
[data-stagger] > * {
  transition-delay: calc(var(--stagger-index, 0) * 120ms);
}
```

### 5.2 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. Especificação de Tracking (DataLayer)

### 6.1 Estrutura do DataLayer

```javascript
// PageView (automático)
window.dataLayer.push({
  event: 'page_view',
  page_title: document.title,
  page_location: window.location.href,
  utm_source: getUTM('utm_source'),
  utm_medium: getUTM('utm_medium'),
  utm_campaign: getUTM('utm_campaign'),
  utm_content: getUTM('utm_content'),
  utm_term: getUTM('utm_term')
});

// CTA Click
window.dataLayer.push({
  event: 'cta_click',
  cta_text: 'Quero conversar com a Paula',
  cta_location: 'hero' | 'floating' | 'final' | 'section_X'
});

// Form Start
window.dataLayer.push({
  event: 'form_start',
  form_name: 'lead_capture'
});

// Form Submit
window.dataLayer.push({
  event: 'form_submit',
  form_name: 'lead_capture',
  qualification_answer: 'selected_option'
});

// Lead (after successful submission)
window.dataLayer.push({
  event: 'generate_lead',
  lead_source: utm_source,
  lead_qualification: 'selected_option'
});

// Scroll Depth
window.dataLayer.push({
  event: 'scroll_depth',
  scroll_percentage: 25 | 50 | 75 | 100
});
```

### 6.2 UTM Persistence

```javascript
// On page load: capture UTMs from URL and save to sessionStorage
// On form submit: attach UTMs from sessionStorage to hidden fields
// Fallback: direct (no UTMs)
```

---

## 7. Especificação SEO

### 7.1 Meta Tags

```html
<title>Paula Magrin | Terapeuta — Reconstrução de Identidade e Desenvolvimento Humano</title>
<meta name="description" content="Processo terapêutico para mulheres que reconhecem padrões repetitivos e buscam reconstruir sua identidade com consciência e autonomia. Agende uma conversa com Paula Magrin.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="[URL_CANONICAL]">
```

### 7.2 Open Graph

```html
<meta property="og:type" content="website">
<meta property="og:title" content="Paula Magrin | Terapeuta — Reconstrução de Identidade">
<meta property="og:description" content="Processo terapêutico para mulheres que buscam compreender seus padrões e reconstruir sua identidade com consciência.">
<meta property="og:image" content="[URL_OG_IMAGE]">
<meta property="og:url" content="[URL_PAGE]">
<meta property="og:locale" content="pt_BR">
```

### 7.3 Schema.org

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Paula Magrin",
  "jobTitle": "Terapeuta",
  "description": "Terapeuta especializada em reconstrução de identidade e desenvolvimento humano.",
  "url": "[URL]",
  "image": "[URL_PHOTO]"
}
```

---

## 8. Performance Budget

| Recurso | Budget |
|---|---|
| HTML | ≤ 30KB (gzipped) |
| CSS Total | ≤ 25KB (gzipped) |
| JS Total | ≤ 15KB (gzipped) |
| Fontes | ≤ 100KB |
| Hero Image | ≤ 150KB (WebP) |
| Outras imagens | ≤ 80KB cada |
| Total Page Weight | ≤ 800KB |
| Requests | ≤ 20 |
| LCP | ≤ 2.5s |

---

## 9. Acessibilidade Checklist

- [ ] Skip navigation link
- [ ] Heading hierarchy (único h1)
- [ ] Alt text em todas as imagens
- [ ] Focus states visíveis em todos os interativos
- [ ] Contraste ≥ 4.5:1 para texto normal
- [ ] Contraste ≥ 3:1 para texto grande
- [ ] Formulário com labels associadas
- [ ] ARIA attributes no modal
- [ ] ARIA attributes no accordion
- [ ] `prefers-reduced-motion` respeitado
- [ ] Landmarks (header, main, footer, nav)
- [ ] Language attribute `lang="pt-BR"`
- [ ] Touch targets ≥ 44x44px
